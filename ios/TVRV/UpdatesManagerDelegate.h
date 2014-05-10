
#import <UIKit/UIKit.h>

@class UpdatesManager;

@protocol UpdatesManagerDelegate

@optional
- (void)updatesManager:(UpdatesManager *)updatesManager downloadCompletedForUpdateType:(NSString *)updateType;
- (void)updatesManager:(UpdatesManager *)updatesManager downloadCancelledForUpdateType:(NSString *)updateType;
- (void)updatesManager:(UpdatesManager *)updatesManager uploadCompletedForUpdateType:(NSString *)updateType;
- (void)updatesManager:(UpdatesManager *)updatesManager uploadCancelledForUpdateType:(NSString *)updateType;


@end