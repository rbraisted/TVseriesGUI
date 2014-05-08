
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"
#import "SatFinderViewController.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
	UIWebView* webView;
	UIWebView* helpWebView;
	NSString* hostName;
	UpdatesManager* updatesManager;
	SatFinderViewController* satFinderViewController;
  NSTimer *timeoutTimer;
  
  UIView* loadingView;
}

- (id)initWithHostName:(NSString*)hostName;

@end