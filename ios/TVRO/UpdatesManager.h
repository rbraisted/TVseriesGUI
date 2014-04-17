/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"

@interface UpdatesManager : NSObject <NSURLConnectionDelegate> {
	NSURLConnection* connection;
	NSMutableData* fileData;
	UIAlertView* alertView;
	
	NSString* antType;
	NSString* portalVersion;
	id delegate;
}

- (id)initWithDelegate:(id<UpdatesManagerDelegate>)_delegate;
- (void)startDownloadForAntType:(NSString *)_antType portalVersion:(NSString *)portalVersion portalUrl:(NSURL *)portalUrl;
- (void)cancelDownload;

- (void)startUploadForAntType:(NSString *)_antType uploadUrl:(NSURL *)uploadUrl;
- (void)cancelUpload;

- (NSString*)deviceVersionForAntType:(NSString *)_antType;
- (NSString*)filePathForAntType:(NSString *)_antType;

@end