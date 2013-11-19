/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>
#import "UpdatesManagerDelegate.h"

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, UpdatesManagerDelegate> {
	UIWebView* webView;
	NSString* hostName;
	UpdatesManager* updatesManager;
}

- (id)initWithHostName:(NSString*)hostName;

@end