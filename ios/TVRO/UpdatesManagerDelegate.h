/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@class UpdatesManager;

@protocol UpdatesManagerDelegate

@optional
- (void)updatesManager:(UpdatesManager *)updatesManager downloadCompletedForAntType:(NSString *)antType;
- (void)updatesManager:(UpdatesManager *)updatesManager downloadCancelledForAntType:(NSString *)antType;
- (void)updatesManager:(UpdatesManager *)updatesManager uploadCompletedForAntType:(NSString *)antType;
- (void)updatesManager:(UpdatesManager *)updatesManager uploadCancelledForAntType:(NSString *)antType;


@end