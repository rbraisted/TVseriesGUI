//
//  NotificationViewController.m
//  hd7_icontrol
//
//  Created by Nandpal Jethanand on 7/31/17.
//
//

#import "NotificationViewController.h"
#import "NotificationCell.h"
#import "AppDelegate.h"
#import "Constants.h"


#define kNOTIFICATION_TITLE          @"Notifications"
#define kIDEN_NOTIFICATION           @"idenNotification"
#define kNOTIFICATION_CELL           @"NotificationCell"
#define kNOTIFICATION_FORMAT_SERVER  @"yyyy-MM-dd HH:mm:ss"
#define kNOTIFICATION_FORMAT_DISPLAY @"dd-MMM-yyyy hh:mm a"

@interface NotificationViewController ()

@end

@implementation NotificationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self configureView];
    [self addCloseButtonInNavigation];
    [self setUINavigationControllerProperties:self.navigationController];
    [self callGetPushMessages];
}

-(void)setUINavigationControllerProperties:(UINavigationController *)navigationControlle {
    self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:(33.0/255.0) green:(53.0/255.0) blue:(100.0/255.0) alpha:1.0];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    [self.navigationController.navigationBar
     setTitleTextAttributes:@{NSForegroundColorAttributeName : [UIColor whiteColor]}];
    self.navigationController.navigationBar.translucent = NO;
}

- (void)configureView {
    
    // Set Title
    self.title = kNOTIFICATION_TITLE;

    // Register notification cell
    [self.tblNotifications registerNib:[UINib nibWithNibName:kNOTIFICATION_CELL bundle:nil] forCellReuseIdentifier:kIDEN_NOTIFICATION];
    
    // Set tableview separator Style
    [self.tblNotifications setSeparatorStyle:UITableViewCellSeparatorStyleNone];
}

- (void)addCloseButtonInNavigation {
    UIButton *btnClose = [UIButton buttonWithType:UIButtonTypeCustom];
    btnClose.frame = CGRectMake(0, 0, 32, 32);
    [btnClose setImage:[UIImage imageNamed:@"notificationClose"] forState:UIControlStateNormal];
    [btnClose addTarget:self action:@selector(closeNotificationView) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *barButton = [[UIBarButtonItem alloc] init];
    [barButton setCustomView:btnClose];
    self.navigationItem.leftBarButtonItem = barButton;
}

- (void)closeNotificationView {
    [self dismissViewControllerAnimated:YES completion:^{}];
}

- (NSString *)getCurrentDate {
    NSDate *date = [NSDate date];
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:kNOTIFICATION_DATE_FORMAT];
    NSString *strCurrentDate = [dateFormatter stringFromDate:date];
    return strCurrentDate;
}

- (void)callGetPushMessages {
    [_aiNotification startAnimating];
    
    // Here call 'register device token to server' web service
    NSDictionary *dictPostParameters = @{ kAPP_ID: TVRV_APP_ID,
                                          kCurrentDate: [self getCurrentDate]  };
    
    NSLog(@"Post Parameters Request :-> %@",dictPostParameters);
    [self postDataWebService:API_List_of_Notifications param:dictPostParameters completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (!error) {
            // Convert the JSON data into dictionary.
            NSDictionary *json  = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            NSLog(@"API_GET_PUSH_MESSAGES Response :-> %@",json);
            
            BOOL bSuccess = [[json valueForKey:@"success"] boolValue];
            if (bSuccess) {
                self.notifArray = [NSMutableArray arrayWithArray:[json valueForKey:@"data"]];
                BOOL bSuccess = [[json valueForKey:@"success"] boolValue];
                [self reloadUI:bSuccess];
            } else {
                [self reloadUI:bSuccess];
            }
        }
    }];
}

- (void)reloadUI:(BOOL)isSuccess {
    dispatch_async(dispatch_get_main_queue(), ^{
        [_aiNotification stopAnimating];
        _aiNotification.hidden = YES;
        if (isSuccess) {
            _tblNotifications.hidden = NO;
            _lblNoNotification.hidden = YES;
            [_tblNotifications reloadData];
        } else {
            _tblNotifications.hidden = YES;
            _lblNoNotification.hidden = NO;
        }
    });
}


-(void)postDataWebService:(NSString *)strURL param:(NSDictionary *)dictParameters completionHandler:(void (^)(NSData *, NSURLResponse *, NSError *))postDataWebServiceCompletionHandler {
    NSDictionary *headers = @{ kContentType: kAppJson };
    
    NSData *postData = [NSJSONSerialization dataWithJSONObject:dictParameters options:0 error:nil];
    
    // URL of the endpoint we're going to contact.
    NSURL *setURL = [NSURL URLWithString:strURL];
    
    // Create a POST request with JSON as a request body.
    NSMutableURLRequest *postDataRequest = [NSMutableURLRequest requestWithURL:setURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:1.0];
    [postDataRequest setHTTPMethod:kPOST];
    [postDataRequest setAllHTTPHeaderFields:headers];
    [postDataRequest setHTTPBody:postData];
    
    // Create a task.
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:postDataRequest
                                                completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                    postDataWebServiceCompletionHandler(data, response, error);
                                                }];
    // Start the task.
    [dataTask resume];
}

#pragma mark - UITableViewDelegate & DataSource methods
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView estimatedHeightForRowAtIndexPath:(NSIndexPath* )indexPath {
    return UITableViewAutomaticDimension;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath* )indexPath {
    return UITableViewAutomaticDimension;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.notifArray.count;
}
 
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NotificationCell *objNotifCell = (NotificationCell *)[tableView dequeueReusableCellWithIdentifier:kIDEN_NOTIFICATION];

    [self setupCell:objNotifCell index:indexPath];
    
    return objNotifCell;
}

-(void)setupCell:(NotificationCell *)cell index:(NSIndexPath *)indexPath {
    cell.backgroundColor = [UIColor clearColor];
    // Notification fire date
    NSString *strNotifDate = [[self.notifArray objectAtIndex:indexPath.row] valueForKey:kNOTIFICATION_DATE];
    cell.notificationDateLabel.text = [self getNotificationDate:strNotifDate];
    // Notification text
    cell.notificationTextLabel.text = [[self.notifArray objectAtIndex:indexPath.row] valueForKey:kNOTIFICATION_TEXT];
}

-(NSString *)getNotificationDate:(NSString *)strDate{
    if (!notifDateFormat) {
        notifDateFormat = [[NSDateFormatter alloc] init];
    }
    notifDateFormat.dateFormat = kNOTIFICATION_FORMAT_SERVER;
    NSDate *notifDate = [notifDateFormat dateFromString:strDate];
    notifDateFormat.dateFormat = kNOTIFICATION_FORMAT_DISPLAY;
    NSLog(@"dateFormatter - %@",[notifDateFormat stringFromDate:notifDate]);
    return [notifDateFormat stringFromDate:notifDate];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
