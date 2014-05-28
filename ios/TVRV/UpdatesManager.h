
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"

@interface UpdatesManager : NSObject <NSURLConnectionDelegate> {
	NSURLConnection* connection;
	NSMutableData*   fileData;
  long long        totalFileSize;
  BOOL             uploading;
	
	NSString* updateType;
	NSString* portalVersion;
	id delegate;
  
  UIAlertView* downloadAlertView;
  UIAlertView* uploadAlertView;
}

- (id)initWithDelegate:(id<UpdatesManagerDelegate>)_delegate;
- (void)startDownloadForUpdateType:(NSString *)_updateType portalVersion:(NSString *)portalVersion portalUrl:(NSURL *)portalUrl;
- (void)cancelDownload;

- (void)startUploadForUpdateType:(NSString *)_updateType uploadUrl:(NSURL *)uploadUrl;
- (void)cancelUpload;

- (NSString*)deviceVersionForUpdateType:(NSString *)_updateType;
- (NSString*)filePathForUpdateType:(NSString *)_updateType;
- (NSString*)fileNameForUpdateType:(NSString *)_updateType;

@end