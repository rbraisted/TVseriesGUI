
#import <UIKit/UIKit.h>

@interface BonjourViewController : UIViewController <NSNetServiceBrowserDelegate, NSNetServiceDelegate, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
  NSNetServiceBrowser* netServiceBrowser;
  NSMutableArray* netServices;

  UIImage* cellBGImageDark;
  UIImage* cellBGImageLight;

  CGPoint scrollViewOffset;
}

- (id)init;

@end