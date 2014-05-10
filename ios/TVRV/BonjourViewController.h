
#import <UIKit/UIKit.h>

@interface BonjourViewController : UIViewController <NSNetServiceBrowserDelegate, NSNetServiceDelegate, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate, NSCoding> {
    NSNetServiceBrowser* netServiceBrowser;
    NSMutableArray* netServices;

    UIImage* cellBGImageDark;
    UIImage* cellBGImageLight;

    CGPoint scrollViewOffset;
}

- (id)init;

@end