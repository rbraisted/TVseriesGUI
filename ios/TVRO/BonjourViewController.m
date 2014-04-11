/*       *\

    ^3^

\*       */

#import "BonjourViewController.h"
#import "WebViewController.h"
#import "BonjourTableViewCell.h"
#import <arpa/inet.h>

@interface BonjourViewController ()

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UITextField *textField;
@property (weak, nonatomic) IBOutlet UIButton *refreshButton;
@property (weak, nonatomic) IBOutlet UIButton *connectButton;
@property (strong, nonatomic) IBOutlet UIScrollView *scrollView;

@end

@implementation BonjourViewController

#pragma mark - UIViewController methods

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
	netServiceBrowser = [[NSNetServiceBrowser alloc] init];
	[netServiceBrowser setDelegate:self];
	
	netServices = [[NSMutableArray alloc] init];
	
	[self.textField setReturnKeyType:UIReturnKeyDone];
	[self.textField setDelegate:self];

	[self.tableView setDelegate:self];
	[self.tableView setDataSource:self];
    
    [self registerForKeyboardNotifications];
    
    cellBGImageDark  =  [UIImage imageNamed:@"tableCellBGDark.png"];
    cellBGImageLight =  [UIImage imageNamed:@"tableCellBGLight.png"];
	
    [super viewDidLoad];
}

- (void)registerForKeyboardNotifications
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWasShown:)
                                                 name:UIKeyboardDidShowNotification object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillBeHidden:)
                                                 name:UIKeyboardWillHideNotification object:nil];
    
}

- (void)viewWillAppear:(BOOL)animated
{
	NSLog(@"viewWillAppear");
    //TODO: use this for refreshing the list
	[netServiceBrowser stop];
	[netServiceBrowser searchForServicesOfType:@"_afpovertcp._tcp" inDomain:@""];
}

- (BOOL)prefersStatusBarHidden
{
	return YES;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

#pragma mark - NSNetServiceBrowserDelegate protocol methods

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didFindService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing
{
	NSLog(@"netServiceBrowser didFindService:%@ moreComing:%d", netService, moreServicesComing);
	[netService setDelegate:self];
	[netServices addObject:netService];
	[self.tableView reloadData];
}

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didRemoveService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing
{
	NSLog(@"netServiceBrowser didRemoveService:%@ moreComing:%d", netService, moreServicesComing);
	[netServices removeObject:netService];
	[self.tableView reloadData];
}

- (void)netServiceBrowserWillSearch:(NSNetServiceBrowser *)netServiceBrowser
{
	NSLog(@"netServiceBrowserWillSearch");
	[netServices removeAllObjects];
}

#pragma mark - NSNetServiceDelegate protocol methods

- (void)netServiceDidResolveAddress:(NSNetService *)netService
{
	NSLog(@"netServiceDidResolveAddress:%@", netService);
	WebViewController* webViewController = [[WebViewController alloc] initWithHostName:netService.hostName];
	[UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

- (void)netService:(NSNetService *)netService didNotResolve:(NSDictionary *)errorDict
{
	NSLog(@"netService:%@ didNotResolve:%@", netService, errorDict);
}

- (void)netServiceDidStop:(NSNetService *)netService
{
	NSLog(@"netServiceDidStop:%@", netService);
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
		[netService resolveWithTimeout:5];
	}
}



- (void)tableView: (UITableView*)tableView willDisplayCell: (UITableViewCell*)cell forRowAtIndexPath: (NSIndexPath*)indexPath
{
//    cell.backgroundColor = indexPath.row % 2
//    ? [UIColor colorWithRed: 0.0 green: 0.0 blue: 1.0 alpha: 1.0]
//    : [UIColor whiteColor];
//    cell.textLabel.backgroundColor = [UIColor clearColor];
//    cell.detailTextLabel.backgroundColor = [UIColor clearColor];
}

#pragma mark - UITableViewDataSource protocol methods

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"BonjourTableCell";
	
    //UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    BonjourTableViewCell *cell = (BonjourTableViewCell*)[self.tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    
    
	if (cell == nil)
	{
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"BonjourTableCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
	}

	NSInteger row = [indexPath row];
    
    if(row % 2 == 0)
    {
        [cell.backgroundImage setImage: cellBGImageLight];
    }
    else
    {
        [cell.backgroundImage setImage: cellBGImageDark];
    }
	
    NSNetService* netService = [netServices objectAtIndex:row];
    [cell.hubLabel setText:netService.name];
    
    //Now extract the ip address and set the ip label
    
    char addressBuffer[INET6_ADDRSTRLEN];
    
  
    memset(addressBuffer, 0, INET6_ADDRSTRLEN);
        
    typedef union
    {
        struct sockaddr sa;
        struct sockaddr_in ipv4;
        struct sockaddr_in6 ipv6;
    } ip_socket_address;
    
    
//    ip_socket_address *socketAddress = (ip_socket_address *)[[netService.addresses objectAtIndex: 0] bytes];
//    
//    if (socketAddress && (socketAddress->sa.sa_family == AF_INET || socketAddress->sa.sa_family == AF_INET6))
//    {
//        const char *addressStr = inet_ntop(
//                                            socketAddress->sa.sa_family,
//                                            (socketAddress->sa.sa_family == AF_INET ? (void *)&(socketAddress->ipv4.sin_addr) : (void *)&(socketAddress->ipv6.sin6_addr)),
//                                            addressBuffer,
//                                            sizeof(addressBuffer));
//            
//        //int port = ntohs(socketAddress->sa.sa_family == AF_INET ? socketAddress->ipv4.sin_port : socketAddress->ipv6.sin6_port);
//            
//        [cell.ipLabel setText:[[NSString alloc] initWithUTF8String:addressStr]];
//    }
    
    return cell;
}

//- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
//	return @"Select your BDU";
//}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
	NSLog(@"tableView numberOfRowsInSection return:%d", [netServices count]);
	return [netServices count];
}

#pragma mark - UITextFieldDelegate protocol methods

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
	NSLog(@"textFieldShouldReturn");
	[textField endEditing:YES];
	return NO;
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)textField
{
	NSLog(@"textFieldShouldEndEditing");
	return YES;
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
	NSLog(@"textFieldDidEndEditing");
}

#pragma mark - UIButton actions

- (IBAction)refreshButtonPressed:(id)sender
{
    [netServiceBrowser stop];
	[netServiceBrowser searchForServicesOfType:@"_afpovertcp._tcp" inDomain:@""];
}

- (IBAction)connectButtonPressed:(id)sender
{
    WebViewController* webViewController = [[WebViewController alloc] initWithHostName:self.textField.text];
	[UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

#pragma mark - Keyboard notifications
// Called when the UIKeyboardDidShowNotification is sent.
- (void)keyboardWasShown:(NSNotification*)aNotification
{
    NSDictionary* info = [aNotification userInfo];
    CGSize kbSize = [[info objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;
    
    UIEdgeInsets contentInsets = UIEdgeInsetsMake(0.0, 0.0, kbSize.height, 0.0);
    self.scrollView.contentInset = contentInsets;
    self.scrollView.scrollIndicatorInsets = contentInsets;
    
    // If active text field is hidden by keyboard, scroll it so it's visible
    // Your app might not need or want this behavior.
    CGRect aRect = self.view.frame;
    aRect.size.height -= kbSize.height;
    
    if (!CGRectContainsPoint(aRect, self.textField.frame.origin) )
    {
        [self.scrollView scrollRectToVisible:self.textField.frame animated:YES];
    }
}

// Called when the UIKeyboardWillHideNotification is sent
- (void)keyboardWillBeHidden:(NSNotification*)aNotification
{
    UIEdgeInsets contentInsets = UIEdgeInsetsZero;
    self.scrollView.contentInset = contentInsets;
    self.scrollView.scrollIndicatorInsets = contentInsets;
}

@end