/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@interface UpdatesManager : NSObject <NSURLConnectionDelegate> {
	NSURLConnection* connection;
	NSMutableData* fileData;
	UIAlertView* alertView;
}

- (void)startDownloadFromURL:(NSURL *)url;
- (void)cancelDownload;

@end