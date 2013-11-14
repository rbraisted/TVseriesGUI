/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@class UpdatesManager;

@interface WebViewController : UIViewController <UIWebViewDelegate, NSURLConnectionDelegate> {
	UIWebView* webView;
	NSString* hostName;
	UpdatesManager* updatesManager;
}

- (id)initWithHostName:(NSString*)hostName;

@end