
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
	if (![defaults stringForKey:@"a9-device-version"]) [defaults setValue:@"" forKey:@"a9-device-version"];
	
	fileData = [[NSMutableData alloc] init];
  
	downloadAlertView = [[UIAlertView alloc] initWithTitle:@"Downloading" message:@"Please wait!" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:nil];
	uploadAlertView = [[UIAlertView alloc] initWithTitle:@"Uploading" message:@"Please wait!" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:nil];

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
	
  uploading = false;
	connection = [[NSURLConnection alloc] initWithRequest:[NSURLRequest requestWithURL:portalUrl] delegate:self];
	[connection start];
	
  [downloadAlertView setMessage:@"Please wait!"];
	[downloadAlertView show];
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
  
  [uploadAlertView show];
  
  uploading = true;
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

- (NSString*)fileNameForUpdateType:(NSString *)_updateType {
  NSString* filePath = [self filePathForUpdateType:_updateType];
	return [filePath lastPathComponent];
}


#pragma mark - NSURLConnectionDelegate protocol methods

- (void)connection:(NSURLConnection *)_connection didReceiveResponse:(NSURLResponse *)response {
	NSLog(@"connection:%@ didReceiveResponse:%@", _connection, response);
	totalFileSize = [[NSNumber numberWithLongLong:[response expectedContentLength]] longLongValue];
}

- (void)connection:(NSURLConnection *)_connection didReceiveData:(NSData *)data {
	NSLog(@"connection:%@ didReceiveData:%d", _connection, [data length]);
  [fileData appendData:data];
  
  NSNumber* resourceLength = [NSNumber numberWithUnsignedInteger:[fileData length]];
  NSNumber* progress = [NSNumber numberWithFloat:([resourceLength floatValue] / totalFileSize )];
	NSString* progressString = [NSString stringWithFormat:@"Please wait...\n%.0f%%", [progress floatValue] * 100];
	[downloadAlertView setMessage:progressString];
}

- (void)connection:(NSURLConnection *)_connection didFailWithError:(NSError *)error {
	NSLog(@"connection:%@ didFailWithError:%@", _connection, error);
}

- (void)connectionDidFinishLoading:(NSURLConnection *)_connection {
	NSLog(@"connectionDidFinishLoading:%@", _connection);
  if (uploading) {
    [uploadAlertView dismissWithClickedButtonIndex:0 animated:YES];

    if (delegate)
      if ([delegate respondsToSelector:@selector(updatesManager:uploadCompletedForUpdateType:)])
        [delegate updatesManager:self uploadCompletedForUpdateType:updateType];

  } else {
    NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
    
    NSString* fileName = connection.currentRequest.URL.lastPathComponent;
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    
    NSString* oldFilePath = [self filePathForUpdateType:updateType];
  	if ([oldFilePath length]) {
      NSFileManager *fileManager = [NSFileManager defaultManager];
      [fileManager removeItemAtPath:oldFilePath error:NULL];
    }
    
    NSString *filePath = [NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
		
		[fileData writeToFile:filePath atomically:YES];
    [downloadAlertView dismissWithClickedButtonIndex:0 animated:YES];
    
    [defaults setValue:portalVersion forKey:[NSString stringWithFormat:@"%@-device-version", updateType]];
    [defaults setValue:filePath forKey:[NSString stringWithFormat:@"%@-file-path", updateType]];
    [defaults synchronize];
    
    if (delegate)
      if ([delegate respondsToSelector:@selector(updatesManager:downloadCompletedForUpdateType:)])
        [delegate updatesManager:self downloadCompletedForUpdateType:updateType];
  }
}

#pragma mark - UIAlertViewDelegate protocol methods

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
	if (alertView == downloadAlertView || alertView == uploadAlertView) {
		[[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO];
		[connection cancel];
		[fileData setLength:0];
  }
}

@end
