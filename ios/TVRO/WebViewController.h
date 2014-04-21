
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"
#import "SatFinderViewController.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
	UIWebView* webView;
	NSString* hostName;
	UpdatesManager* updatesManager;
	SatFinderViewController* satFinderViewController;
    NSTimer *timeoutTimer;
}

- (id)initWithHostName:(NSString*)hostName;

@end