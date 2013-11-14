/*       *\

    ^3^

\*       */

#import "UpdatesManager.h"

@interface UpdatesManager ()

@end

@implementation UpdatesManager

#pragma mark - UpdatesManager methods

- (void)startDownloadFromURL:(NSURL *)url {
	[self cancelDownload];
	
	connection = [[NSURLConnection alloc] initWithRequest:[NSURLRequest requestWithURL:url] delegate:self];
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

#pragma mark - NSObject methods

- (id)init {
	self = [super init];
	
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
	NSString *filePath = [NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
	NSLog(@"filePath: %@", filePath);
	
	[fileData writeToFile:filePath atomically:YES];
    [alertView dismissWithClickedButtonIndex:0 animated:YES];
}

#pragma mark - UIAlertViewDelegate protocol methods

- (void)alertView:(UIAlertView *)_alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
	
}

@end