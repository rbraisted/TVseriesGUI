//
//  NotificationViewController.h
//  hd7_icontrol
//
//  Created by Nandpal Jethanand on 7/31/17.
//
//

#import <UIKit/UIKit.h>

@interface NotificationViewController : UIViewController <UITableViewDataSource, UITableViewDelegate> {
    
    NSDateFormatter* notifDateFormat;
    
}

@property (strong, nonatomic) IBOutlet UITableView *tblNotifications;
@property (strong, nonatomic) IBOutlet UILabel *lblNoNotification;
@property (strong, nonatomic) IBOutlet UIActivityIndicatorView *aiNotification;

@property (strong, nonatomic) NSMutableArray *notifArray;
@property(assign, nonatomic) CGFloat currentOffset;

@end
