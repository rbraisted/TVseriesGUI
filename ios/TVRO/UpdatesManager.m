/*       *\

    ^3^

\*       */

#import "UpdatesManager.h"

@interface UpdatesManager ()

@end

@implementation UpdatesManager

#pragma mark - UpdatesManager methods

- (void)startDownloadForAntType:(NSString *)_antType portalVersion:(NSString *)_portalVersion portalUrl:(NSURL *)portalUrl {
	[self cancelDownload];
	
	antType = _antType;
	portalVersion = _portalVersion;
	
	connection = [[NSURLConnection alloc] initWithRequest:[NSURLRequest requestWithURL:portalUrl] delegate:self];
	[connection start];
	
	[alertView show];
}

- (void)cancelDownload {
	if (connection) {
		[connection cancel];
		connection = nil;
	}
	
	[fileData setLength:0];
}

- (NSString*)deviceVersionForAntType:(NSString *)_antType {
	return [[NSUserDefaults standardUserDefaults] stringForKey:[NSString stringWithFormat:@"%@-device-version", _antType]];
}

#pragma mark - NSObject methods

- (id)init {
	self = [super init];
	
	NSUserDefaults* standardDefaults = [NSUserDefaults standardUserDefaults];
	
	NSLog(@"%@", [standardDefaults stringForKey:@"tv5-device-version"]);
	
	if (![standardDefaults stringForKey:@"tv1-device-version"]) [standardDefaults setValue:@"---" forKey:@"tv1-device-version"];
	if (![standardDefaults stringForKey:@"tv3-device-version"]) [standardDefaults setValue:@"---" forKey:@"tv3-device-version"];
	if (![standardDefaults stringForKey:@"tv5-device-version"]) [standardDefaults setValue:@"---" forKey:@"tv5-device-version"];
	if (![standardDefaults stringForKey:@"tv6-device-version"]) [standardDefaults setValue:@"---" forKey:@"tv6-device-version"];

	fileData = [[NSMutableData alloc] init];
	alertView = [[UIAlertView alloc] initWithTitle:@"Downloading" message:@"Please wait!" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:nil];
	
	return self;
}

#pragma mark - NSURLConnectionDelegate protocol methods

- (void)connection:(NSURLConnection *)_connection didReceiveResponse:(NSURLResponse *)response {
	NSLog(@"connection:%@ didReceiveResponse:%@", _connection, response);
}

- (void)connection:(NSURLConnection *)_connection didReceiveData:(NSData *)data {
	NSLog(@"connection:%@ didReceiveData:%@", _connection, data);
    [fileData appendData:data];
}

- (void)connection:(NSURLConnection *)_connection didFailWithError:(NSError *)error {
	NSLog(@"connection:%@ didFailWithError:%@", _connection, error);
}

- (void)connectionDidFinishLoading:(NSURLConnection *)_connection {
	NSLog(@"connectionDidFinishLoading:%@", _connection);
	NSString* fileName = connection.currentRequest.URL.lastPathComponent;
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *filePath = [NSString stringWithFormat:@"%@/%@/%@", documentsDirectory, antType, fileName];
	
	NSLog(@"antType: %@", antType);
	NSLog(@"portalVersion: %@", portalVersion);
	NSLog(@"filePath: %@", filePath);
		
	[fileData writeToFile:filePath atomically:YES];
    [alertView dismissWithClickedButtonIndex:0 animated:YES];
	
	NSUserDefaults* standardDefaults = [NSUserDefaults standardUserDefaults];
	[standardDefaults setValue:portalVersion forKey:[NSString stringWithFormat:@"%@-device-version", antType]];
	[standardDefaults synchronize];
}

#pragma mark - UIAlertViewDelegate protocol methods

- (void)alertView:(UIAlertView *)_alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
	
}

@end