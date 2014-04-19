
#import "UpdatesManager.h"
#import "UpdatesManagerDelegate.h"

@interface UpdatesManager ()

@end

@implementation UpdatesManager

#pragma mark - UpdatesManager methods

- (id)initWithDelegate:(id<UpdatesManagerDelegate>)_delegate {
	self = [super init];
	
	delegate = _delegate;
	
	NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
	if (![defaults stringForKey:@"satlibrary-device-version"]) [defaults setValue:@"" forKey:@"satlibrary-device-version"];
	if (![defaults stringForKey:@"tv1-device-version"]) [defaults setValue:@"" forKey:@"tv1-device-version"];
	if (![defaults stringForKey:@"tv3-device-version"]) [defaults setValue:@"" forKey:@"tv3-device-version"];
	if (![defaults stringForKey:@"tv5-device-version"]) [defaults setValue:@"" forKey:@"tv5-device-version"];
	if (![defaults stringForKey:@"tv6-device-version"]) [defaults setValue:@"" forKey:@"tv6-device-version"];
	if (![defaults stringForKey:@"rv1-device-version"]) [defaults setValue:@"" forKey:@"rv1-device-version"];
	
	fileData = [[NSMutableData alloc] init];
	alertView = [[UIAlertView alloc] initWithTitle:@"Downloading" message:@"Please wait!" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:nil];
	
	return self;
}

- (void)startDownloadForUpdateType:(NSString *)_updateType portalVersion:(NSString *)_portalVersion portalUrl:(NSURL *)portalUrl {
	if (connection) {
		[connection cancel];
		connection = nil;
	}
	
	[fileData setLength:0];
	
  //	reinforce lowercase key names
  //	web code might send us 'TV5' instead of 'tv5'
	updateType = [_updateType lowercaseString];
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
	
	if (delegate)
		if ([delegate respondsToSelector:@selector(updatesManager:downloadCancelledForUpdateType:)])
			[delegate updatesManager:self downloadCancelledForUpdateType:updateType];
}

- (void)startUploadForUpdateType:(NSString *)_updateType uploadUrl:(NSURL *)uploadUrl {
	
	if (connection) {
		[connection cancel];
		connection = nil;
	}
	
	[fileData setLength:0];
	
	updateType = [_updateType lowercaseString];
	
	NSString* filePath = [self filePathForUpdateType:updateType];
	NSString* fileName = [filePath lastPathComponent];
	[fileData appendData:[NSData dataWithContentsOfFile:filePath]];

	NSLog(@"filePath: %@", filePath);
	NSLog(@"fileName: %@", fileName);
	
	NSString* stringBoundary = @"0xKHTMLBoundary";
  NSMutableDictionary* headers = [[NSMutableDictionary alloc] init];
  [headers setValue:@"no-cache" forKey:@"Cache-Control"];
  [headers setValue:@"no-cache" forKey:@"Pragma"];
  [headers setValue:[NSString stringWithFormat:@"multipart/form-data; boundary=%@", stringBoundary] forKey:@"Content-Type"];
  
  NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:uploadUrl cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:60.0];
  [request setHTTPMethod:@"POST"];
  [request setAllHTTPHeaderFields:headers];
  
  NSMutableData* postData = [NSMutableData dataWithCapacity:[fileData length] + 512];
  [postData appendData:[[NSString stringWithFormat:@"--%@\r\n", stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
  [postData appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"fileToUpload\"; filename=\"%@\"\r\n\r\n", fileName] dataUsingEncoding:NSUTF8StringEncoding]];
  [postData appendData:fileData];
  [postData appendData:[[NSString stringWithFormat:@"\r\n--%@--\r\n", stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
  [request setHTTPBody:postData];
	
	connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
	[connection start];
}

- (void)cancelUpload {
	if (connection) {
		[connection cancel];
		connection = nil;
	}
	
	if (delegate)
		if ([delegate respondsToSelector:@selector(updatesManager:uploadCancelledForUpdateType:)])
			[delegate updatesManager:self uploadCancelledForUpdateType:updateType];
}

- (NSString*)deviceVersionForUpdateType:(NSString *)_updateType {
  NSString* key = [NSString stringWithFormat:@"%@-device-version", [_updateType lowercaseString]];
	return [[NSUserDefaults standardUserDefaults] stringForKey:key];
}

- (NSString*)filePathForUpdateType:(NSString *)_updateType {
	return [[NSUserDefaults standardUserDefaults] stringForKey:[NSString stringWithFormat:@"%@-file-path", [_updateType lowercaseString]]];
}

#pragma mark - NSURLConnectionDelegate protocol methods

- (void)connection:(NSURLConnection *)_connection didReceiveResponse:(NSURLResponse *)response {
	NSLog(@"connection:%@ didReceiveResponse:%@", _connection, response);
}

- (void)connection:(NSURLConnection *)_connection didReceiveData:(NSData *)data {
	NSLog(@"connection:%@ didReceiveData:%d", _connection, [data length]);
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
	NSString *filePath = [NSString stringWithFormat:@"%@/%@/%@", documentsDirectory, updateType, fileName];
		
	[fileData writeToFile:filePath atomically:YES];
  [alertView dismissWithClickedButtonIndex:0 animated:YES];
	
	NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
	[defaults setValue:portalVersion forKey:[NSString stringWithFormat:@"%@-device-version", updateType]];
	[defaults setValue:filePath forKey:[NSString stringWithFormat:@"%@-file-path", updateType]];
	[defaults synchronize];
	
	if (delegate)
		if ([delegate respondsToSelector:@selector(updatesManager:downloadCompletedForUpdateType:)])
			[delegate updatesManager:self downloadCompletedForUpdateType:updateType];
}

#pragma mark - UIAlertViewDelegate protocol methods

- (void)alertView:(UIAlertView *)_alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
	
}

@end