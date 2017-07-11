#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>

@class 	WebViewController;

@interface AppDelegate : UIResponder <UIApplicationDelegate, UNUserNotificationCenterDelegate, NSURLSessionDelegate> {
	
}

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic,readwrite) BOOL isNavigateToUpdateScreen;
@property (nonatomic, assign) CGSize screenSize;


@end


// --------------------------------------------------------
// 30 June 2015
// --------------------------------------------------------
// Need to change bottom bar image of sat. finder
// Need to change splash screen
// Check y axis prb in landscape mode
// Need to create dynamic vFOV and hFOV

// --------------------------------------------------------
// Tesing
// --------------------------------------------------------
// All iPad's
// All iPhone's
