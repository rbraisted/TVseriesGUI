/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@interface UpdatesManager : NSObject <NSURLConnectionDelegate> {
	NSURLConnection* connection;
	NSMutableData* fileData;
	UIAlertView* alertView;
	
	NSString* antType;
	NSString* portalVersion;
}

- (void)startDownloadForAntType:(NSString *)_antType portalVersion:(NSString *)portalVersion portalUrl:(NSURL *)portalUrl;
- (void)cancelDownload;
- (NSString*)deviceVersionForAntType:(NSString *)_antType;

@end