
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"
#import "SatFinderViewController.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
  NSString*  hostName;
  UIWebView* webView;
  UIWebView* helpWebView;
  UIView*    loadingView;
  NSTimer*   timeoutTimer;

  SatFinderViewController* satFinderViewController;
  UpdatesManager*          updatesManager;
}

- (id)initWithHostName:(NSString*)hostName;

@end