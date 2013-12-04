/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"
#import "SatFinderViewController.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
	UIWebView* webView;
	NSString* hostName;
	UpdatesManager* updatesManager;
	SatFinderViewController* satFinderViewController;
}

- (id)initWithHostName:(NSString*)hostName;

@end