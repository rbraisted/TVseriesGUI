/*       *\

    ^3^

\*       */

#import "BonjourViewController.h"
#import "WebViewController.h"

@interface BonjourViewController ()

@end

@implementation BonjourViewController

#pragma mark - UIViewController methods

- (void)viewDidLoad {
	netServiceBrowser = [[NSNetServiceBrowser alloc] init];
	[netServiceBrowser setDelegate:self];
	
	netServices = [[NSMutableArray alloc] init];
	
	textField = [[UITextField alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
	[textField setPlaceholder:@"Custom BDU address"];
	[textField setReturnKeyType:UIReturnKeyDone];
	[textField setDelegate:self];
	[self.view addSubview:textField];
	
	tableView = [[UITableView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
	[tableView setDelegate:self];
	[tableView setDataSource:self];
	[self.view addSubview:tableView];
	
    [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
	NSLog(@"viewWillAppear");
	[netServiceBrowser stop];
	[netServiceBrowser searchForServicesOfType:@"_afpovertcp._tcp" inDomain:@""];
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - NSNetServiceBrowserDelegate protocol methods

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didFindService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing {
	NSLog(@"netServiceBrowser didFindService:%@ moreComing:%d", netService, moreServicesComing);
	[netService setDelegate:self];
	[netServices addObject:netService];
	[tableView reloadData];
}

- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser didRemoveService:(NSNetService *)netService moreComing:(BOOL)moreServicesComing {
	NSLog(@"netServiceBrowser didRemoveService:%@ moreComing:%d", netService, moreServicesComing);
	[netServices removeObject:netService];
	[tableView reloadData];
}

- (void)netServiceBrowserWillSearch:(NSNetServiceBrowser *)netServiceBrowser {
	NSLog(@"netServiceBrowserWillSearch");
	[netServices removeAllObjects];
}

#pragma mark - NSNetServiceDelegate protocol methods

- (void)netServiceDidResolveAddress:(NSNetService *)netService {
	NSLog(@"netServiceDidResolveAddress:%@", netService);
	WebViewController* webViewController = [[WebViewController alloc] initWithHostName:netService.hostName];
	[UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

- (void)netService:(NSNetService *)netService didNotResolve:(NSDictionary *)errorDict {
	NSLog(@"netService:%@ didNotResolve:%@", netService, errorDict);
}

- (void)netServiceDidStop:(NSNetService *)netService {
	NSLog(@"netServiceDidStop:%@", netService);
}

#pragma mark - UITableViewDelegate protocol methods

- (CGFloat)tableView:(UITableView *)_tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
	return 35.0;
}

- (void)tableView:(UITableView *)_tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	[netServiceBrowser stop];

	int row = [indexPath row];
	if (row >= [netServices count]) {
		[tableView setHidden:YES];
	} else {
		NSNetService* netService = [netServices objectAtIndex:row];
		[netService resolveWithTimeout:5];
	}
}

#pragma mark - UITableViewDataSource protocol methods

- (UITableViewCell *)tableView:(UITableView *)_tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *CellIdentifier = @"Generic";
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
	if (cell == nil)	{
		cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier];
	}

	int row = [indexPath row];
	if (row >= [netServices count]) {
		[cell.textLabel setFont:[UIFont boldSystemFontOfSize:12.0]];
		[cell.textLabel setText:@"Other"];
	} else {
		NSNetService* netService = [netServices objectAtIndex:row];
		[cell.textLabel setFont:[UIFont systemFontOfSize:12.0]];
		[cell.textLabel setText:netService.name];
	}
	return cell;
}

- (NSString *)tableView:(UITableView *)_tableView titleForHeaderInSection:(NSInteger)section {
	return @"Select your BDU";
}

- (NSInteger)tableView:(UITableView *)_tableView numberOfRowsInSection:(NSInteger)section {
	NSLog(@"tableView numberOfRowsInSection return:%d", [netServices count]);
	return [netServices count] + 1;
}

#pragma mark - UITextFieldDelegate protocol methods

- (BOOL)textFieldShouldReturn:(UITextField *)_textField {
	NSLog(@"textFieldShouldReturn");
	[textField endEditing:YES];
	return NO;
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)_textField {
	NSLog(@"textFieldShouldEndEditing");
	return YES;
}

- (void)textFieldDidEndEditing:(UITextField *)_textField {
	NSLog(@"textFieldDidEndEditing");
	WebViewController* webViewController = [[WebViewController alloc] initWithHostName:textField.text];
	[UIApplication sharedApplication].delegate.window.rootViewController = webViewController;
}

@end