/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>

@interface BonjourViewController : UIViewController <NSNetServiceBrowserDelegate, NSNetServiceDelegate, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
	NSNetServiceBrowser* netServiceBrowser;
	NSMutableArray* netServices;
	UITableView* tableView;
	UITextField* textField;
}

@end