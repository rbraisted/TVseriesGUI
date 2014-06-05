
#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"
#import "SatelliteFinderViewController.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
  NSString*  hostName;
  UIWebView* webView;
  UIWebView* helpWebView;
  UIView*    loadingView;
  NSTimer*   timeoutTimer;

  SatelliteFinderViewController* satFinderViewController;
  UpdatesManager*          updatesManager;
}

- (id)initWithHostName:(NSString*)hostName;

@end