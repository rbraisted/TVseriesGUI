
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"

@interface UpdatesManager : NSObject <NSURLConnectionDelegate> {
	NSURLConnection* connection;
	NSMutableData* fileData;
	UIAlertView* alertView;
	
	NSString* updateType;
	NSString* portalVersion;
	id delegate;
}

- (id)initWithDelegate:(id<UpdatesManagerDelegate>)_delegate;
- (void)startDownloadForUpdateType:(NSString *)_updateType portalVersion:(NSString *)portalVersion portalUrl:(NSURL *)portalUrl;
- (void)cancelDownload;

- (void)startUploadForUpdateType:(NSString *)_updateType uploadUrl:(NSURL *)uploadUrl;
- (void)cancelUpload;

- (NSString*)deviceVersionForUpdateType:(NSString *)_updateType;
- (NSString*)filePathForUpdateType:(NSString *)_updateType;

@end