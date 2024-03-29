
#import "BonjourViewController.h"
#import "WebViewController.h"
#import "BonjourTableViewCell.h"
#import "RXMLElement.h"
#import <arpa/inet.h>

#import "Constants.h"


@interface BonjourViewController ()

@property (weak, nonatomic) IBOutlet UILabel *versionLabel;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UITextField *textField;
@property (weak, nonatomic) IBOutlet UIButton *refreshButton;
@property (weak, nonatomic) IBOutlet UIButton *connectButton;
@property (strong, nonatomic) IBOutlet UIScrollView *scrollView;
@property (strong, nonatomic) IBOutlet UIView *satFinderView;

@end

@implementation BonjourViewController

@synthesize versionLabel = _versionLabel;
@synthesize tableView = _tableView;
@synthesize textField = _textField;
@synthesize refreshButton = _refreshButton;
@synthesize connectButton = _connectButton;
@synthesize scrollView = _scrollView;
@synthesize satFinderView = _satFinderView;

#pragma mark - UIViewController methods

- (id)init
{
  if (IS_IPAD)
      self = [super initWithNibName:@"BonjourViewiPadLandscape" bundle:nil];
  else
      self = [super initWithNibName:@"BonjourView" bundle:nil];
  return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.view.frame = [[UIScreen mainScreen] bounds];
	netServiceBrowser = [[NSNetServiceBrowser alloc] init];
	[netServiceBrowser setDelegate:self];
	
	netServices = [[NSMutableArray alloc] init];
    
	
	[self.textField setReturnKeyType:UIReturnKeyDone];
	[self.textField setDelegate:self];

	[self.tableView setDelegate:self];
	[self.tableView setDataSource:self];
    [self.tableView registerNib:[UINib nibWithNibName:@"BonjourTableViewCell" bundle:nil] forCellReuseIdentifier:@"BonjourTableCell"];

  //[self registerForKeyboardNotifications];

  cellBGImageDark  =  [UIImage imageNamed:@"tableCellBGDark.png"];
  cellBGImageLight =  [UIImage imageNamed:@"tableCellBGLight.png"];

  [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];

  NSString* appVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  [self.versionLabel setText:[NSString stringWithFormat:@"Version %@", appVersion]];

  if ([SatelliteFinderViewController available])
  { // Work in only iPhone and iPad
    if (IS_IPAD)
    {
      [self.satFinderView setHidden:FALSE];
    }
    else
    {
      //[self.satFinderView setFrame:CGRectMake(0, 698, self.satFinderView.frame.size.width, self.satFinderView.frame.size.height)];
        [self.satFinderView setFrame:CGRectMake(0, 698,self.view.frame.size.width, 232)];
	    [self.scrollView addSubview:self.satFinderView];
      [self.scrollView setContentSize:CGSizeMake(self.scrollView.contentSize.width, self.scrollView.contentSize.height - 65 + self.satFinderView.frame.size.height)];
    }
  }
}

- (void)registerForKeyboardNotifications
{
  //	add notification observers for keyboard appearing/hiding
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWasShown:) name:UIKeyboardDidShowNotification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillBeHidden:) name:UIKeyboardWillHideNotification object:nil];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:YES];
    //get the default host name (Either tvhub or the last host name that the user connected to)
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if ([defaults objectForKey:@"default-host"] != nil)
    {
        [self.textField setText:[defaults objectForKey:@"default-host"]];
    }
    [self resetBonjourHostList];
}

- (BOOL)prefersStatusBarHidden
{
	return 0;
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleLightContent;
}


- (void)didReceiveMemoryWarning
{
  [super didReceiveMemoryWarning];
}

- (BOOL)shouldAutorotate
{
  return YES;
}

#if __IPHONE_OS_VERSION_MAX_ALLOWED < 90000
- (NSUInteger)supportedInterfaceOrientations
#else
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
#endif
{
  if (IS_IPAD)
      return UIInterfaceOrientationMaskLandscape;
  else
      return UIInterfaceOrientationMaskPortrait;
}

- (void)resetBonjourHostList
{
    [netServiceBrowser stop];
	[netServiceBrowser searchForServicesOfType:kBonjourServiceType inDomain:@""];
}

#pragma mark - NSNetServiceBrowserDelegate protocol methods

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didFindService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing
{
  //NSLog(@"netServiceBrowser didFindService:%@ moreComing:%d", netService, moreServicesComing);
  [netService setDelegate:self];
  [netService resolveWithTimeout:5];
  [netServices addObject:netService];
  [self.tableView reloadData];
}

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didRemoveService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing
{
	//NSLog(@"netServiceBrowser didRemoveService:%@ moreComing:%d", netService, moreServicesComing);
	[netServices removeObject:netService];
	[self.tableView reloadData];
}

- (void)netServiceBrowserWillSearch:(NSNetServiceBrowser *)netServiceBrowser
{
	//NSLog(@"netServiceBrowserWillSearch");
	[netServices removeAllObjects];
}

#pragma mark - NSNetServiceDelegate protocol methods

- (void)netServiceDidResolveAddress:(NSNetService *)netService
{
	//NSLog(@"netServiceDidResolveAddress:%@", netService);
	[self.tableView reloadData];
}

- (void)netService:(NSNetService *)netService didNotResolve:(NSDictionary *)errorDict
{
	//NSLog(@"netService:%@ didNotResolve:%@", netService, errorDict);
}

- (void)netServiceDidStop:(NSNetService *)netService
{
	//NSLog(@"netServiceDidStop:%@", netService);
}

#pragma mark - UITableViewDelegate protocol methods
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
	return 50.0;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
	[netServiceBrowser stop];
    
	NSInteger row = [indexPath row];

	if (row >= [netServices count])
    {
		[self.tableView setHidden:YES];
	}
    else
    {
        NSNetService* netService = [netServices objectAtIndex:row];
        WebViewController* webViewController = [[WebViewController alloc] initWithHostName:netService.hostName];
        [UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
	}
}

#pragma mark - UITableViewDataSource protocol methods

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  NSString *CellIdentifier = @"BonjourTableCell";
  BonjourTableViewCell *cell = (BonjourTableViewCell*)[self.tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
	
	if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"BonjourTableViewCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
	}
	
  //	alternating row colors
	NSInteger row = [indexPath row];
	
  if (row % 2 == 0)
      [cell setUnselectedBackgroundImage: cellBGImageLight];
  else
      [cell setUnselectedBackgroundImage: cellBGImageDark];
	
    
  NSNetService* netService = [netServices objectAtIndex:row];
  NSString* hubName = netService.name;
  NSArray *parseList = [netService.name componentsSeparatedByString:@" "];
  if ([[[parseList objectAtIndex:4] substringToIndex:6] isEqualToString:@"tvhub-"])
  {
    hubName = [[parseList objectAtIndex:4] substringFromIndex:6];
  }
	
  [cell setHubName:[NSString stringWithFormat:@"S/N: %@", hubName]];

  //	extract the ip address from NSNetService
  //	http://stackoverflow.com/questions/938521/iphone-bonjour-nsnetservice-ip-address-and-port
  char addressBuffer[INET6_ADDRSTRLEN];
  memset(addressBuffer, 0, INET6_ADDRSTRLEN);
      
  typedef union
    {
        struct sockaddr sa;
        struct sockaddr_in ipv4;
        struct sockaddr_in6 ipv6;
  } ip_socket_address;
  
  if ([netService.addresses count] == 0)
    return cell;

  ip_socket_address *socketAddress = (ip_socket_address *)[[netService.addresses objectAtIndex: 0] bytes];
  if (socketAddress && (socketAddress->sa.sa_family == AF_INET || socketAddress->sa.sa_family == AF_INET6))
  {
        const char *addressStr = inet_ntop(socketAddress->sa.sa_family,
                                          (socketAddress->sa.sa_family == AF_INET ? (void *)&(socketAddress->ipv4.sin_addr) : (void *)&(socketAddress->ipv6.sin6_addr)),
                                           addressBuffer,
                                           sizeof(addressBuffer));
        [cell setIPLabel:[[NSString alloc] initWithUTF8String:addressStr]];
  }
  
  return cell;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
	return [netServices count];
}

#pragma mark - UITextFieldDelegate protocol methods

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [self.scrollView setContentOffset:scrollViewOffset animated:YES];
    [textField resignFirstResponder];
	[textField endEditing:YES];
	return NO;
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)textField
{
	return YES;
}

-(void)textFieldDidBeginEditing:(UITextField *)textField
{
    [self animateTextField:textField up:YES];
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    [self animateTextField:textField up:NO];
}

-(void)animateTextField:(UITextField*)textField up:(BOOL)up
{
    int movementDistance = 0;
    if (IS_IPAD)
        movementDistance = MovementDistance;
    else
    {
        if (ApplicationDelegate.screenSize.height > 480.0f)
        {
            // Use for Above 4.0 inch
            movementDistance = MovementDistance;
        }
        else
        {
            // Use for Below 4.0 inch
            movementDistance = IPhone_MovementDistance;
        }
    }
    
    int movement = (up ? movementDistance : -movementDistance);
    [UIView beginAnimations: @"animateTextField" context: nil];
    [UIView setAnimationBeginsFromCurrentState: YES];
    [UIView setAnimationDuration: kAnimationDuration];
    self.view.frame = CGRectOffset(self.view.frame, 0, movement);
    [UIView commitAnimations];
}

#pragma mark - UIButton actions

- (IBAction)refreshButtonPressed:(id)sender
{
    [self resetBonjourHostList];
}

- (IBAction)connectButtonPressed:(id)sender
{
    if ([self.textField.text length] == 0)
    {
        UIAlertView *alertError = [[UIAlertView alloc] initWithTitle:@"Error" message:[NSString stringWithFormat:@"Please enter IP Address or Hostname."] delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
        [alertError show];
        return;
    }
    WebViewController* webViewController = [[WebViewController alloc] initWithHostName:self.textField.text];
    [UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

- (IBAction)viewUpdatesButtonPressed:(id)sender
{
    //Connect to the Updates website
    ApplicationDelegate.isNavigateToUpdateScreen = YES;
    WebViewController* webViewController = [[WebViewController alloc] initWithHostName:kWebSvcPortal];
    [UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

- (IBAction)satFinderButtonPressed:(id)sender
{
    SatelliteFinderViewController* satFinderViewController = [[SatelliteFinderViewController alloc] init];
    [satFinderViewController getSatListFromBundle];
    [self presentViewController:satFinderViewController animated:YES completion:nil];
}

#pragma mark - Keyboard notifications

// Called when the UIKeyboardDidShowNotification is sent.
- (void)keyboardWasShown:(NSNotification*)aNotification
{
      NSDictionary* info = [aNotification userInfo];
      CGSize kbSize = [[info objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;
      CGFloat kbHeight = 0.0f;
      
      //if (IS_IPAD) kbHeight = kbSize.width;
      //else kbHeight = kbSize.height;
      kbHeight = kbSize.height;
      scrollViewOffset = self.scrollView.contentOffset;
      CGPoint pt;
      CGRect rc = [self.textField bounds];
      rc = [self.textField convertRect:rc toView:self.scrollView];
      pt = rc.origin;
      pt.x = 0;
      pt.y -= kbHeight;
      [self.scrollView setContentOffset:pt animated:YES];
}

// Called when the UIKeyboardWillHideNotification is sent
- (void)keyboardWillBeHidden:(NSNotification*)aNotification
{
  //[self.scrollView setContentOffset:scrollViewOffset animated:YES];
    [self.scrollView setContentOffset:CGPointZero animated:YES];
    [self.textField resignFirstResponder];
}


@end
