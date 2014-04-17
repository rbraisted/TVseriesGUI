/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@interface BonjourViewController : UIViewController <NSNetServiceBrowserDelegate, NSNetServiceDelegate, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
	NSNetServiceBrowser* netServiceBrowser;
	NSMutableArray* netServices;
    
    UIImage* cellBGImageDark;
    UIImage* cellBGImageLight;
    
    CGPoint svos;
}

@end