
#import "AppDelegate.h"
#import "BonjourViewController.h"

@implementation AppDelegate
@synthesize isNavigateToUpdateScreen;
@synthesize screenSize;

#pragma mark - UIApplicationDelegate protocol methods

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    [self.window makeKeyAndVisible];
    self.window.backgroundColor = [UIColor clearColor];
    [self getscreenSize];
    
    //	set default values -
    //	even though we set these in the settings bundle,
    //	iOS doesn't actually use those defaults on first launch
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if ([defaults objectForKey:@"default-host"] == nil) [defaults setObject:kDefaultHostname forKey:@"default-host"];
    if ([defaults objectForKey:@"tech-mode"] == nil) [defaults setBool:false forKey:@"tech-mode"];
    if ([defaults objectForKey:@"demo-mode"] == nil) [defaults setBool:false forKey:@"demo-mode"];
    [defaults synchronize];
    
    BonjourViewController* bonjourViewController = [[BonjourViewController alloc] init];
    self.window.rootViewController = bonjourViewController;
    
    //------------------------------ Call Register For Push Notification -----------------------
    [self registerForPushNotification];
    //-------------------------------------------------------------------------------------------

    return YES;
}

#pragma mark - Push stuff
//------------------------------ Here's where we do push stuff -----------------------
- (void)registerForPushNotification
{
    //[SharedApplication cancelAllLocalNotifications];
    
    if(SYSTEM_VERSION_GRATERTHAN_OR_EQUALTO(@"10.0")) {
        UNUserNotificationCenter *objNC = [UNUserNotificationCenter currentNotificationCenter];
        objNC.delegate = self;
        [objNC requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert |
                                                UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
            if(!error ){
                [SharedApplication registerForRemoteNotifications];
                //[SharedApplication setApplicationIconBadgeNumber:0];
            }
        }];
    }
    else {
        [SharedApplication registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:
                                                             (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
        [SharedApplication registerForRemoteNotifications];
        //[SharedApplication setApplicationIconBadgeNumber:0];
    }
}

#pragma mark - Remote Notification Delegate  <= iOS 9.x
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
    [application registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    
    NSString *strPushNotifDeviceToken = [self removeBlankSpaceFromDeviceToken:deviceToken];
    // Here call 'register device token to server' web service
    NSDictionary *dictPostParameters = @{ kAPP_ID: TVRV_APP_ID,
                                          kAppPlatform: currentPlatform,
                                          kDeviceToken: strPushNotifDeviceToken };
    NSLog(@"API_REGISTER_DEVICE_TOKEN Request :-> %@",dictPostParameters);
    [self postDataWebService:API_REGISTER_DEVICE_TOKEN param:dictPostParameters completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (!error) {
            
            // Save DeviceToken In NSUserDefault
            [self saveDeviceTokenInNSUserDefault:strPushNotifDeviceToken];
            
            // Convert the JSON data into dictionary.
            NSDictionary *json  = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            NSLog(@"API_REGISTER_DEVICE_TOKEN Response :-> %@",json);
        }
    }];
}

- (void)saveDeviceTokenInNSUserDefault:(NSString *)strDeviceToken
{
    [NSUD setObject:strDeviceToken forKey:kDeviceToken];
    [NSUD synchronize];
}

-(NSString *)removeBlankSpaceFromDeviceToken:(NSData *)deviceToken
{
    NSString *strDevicetoken = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    strDevicetoken = [strDevicetoken stringByReplacingOccurrencesOfString:@" " withString:@""];
    return strDevicetoken;
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Here call 'reset badge' web service
    NSString *strPushNotifDeviceToken = [NSUD valueForKey:kDeviceToken];
    if ([strPushNotifDeviceToken length] > 0) {
        NSDictionary *dictPostParameters = @{ kDeviceToken: strPushNotifDeviceToken,
                                              KBadgeCount: @"0"};
        NSLog(@"API_RESET_BADGE Request :-> %@",dictPostParameters);
        [self postDataWebService:API_RESET_BADGE param:dictPostParameters completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (!error) {
                // Convert the JSON data into dictionary.
                NSDictionary *json  = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"API_RESET_BADGE Response :-> %@",json);
                BOOL isSuccess = [[json valueForKey:@"success"] boolValue];
                if (isSuccess) {
                    [self resetBadgeAndCancelAllNotifications];
                }
            }
        }];
    }
}

-(void) resetBadgeAndCancelAllNotifications {
    [SharedApplication setApplicationIconBadgeNumber: 0];
    [SharedApplication cancelAllLocalNotifications];
}


#pragma mark POST Data WebService Method
-(void)postDataWebService:(NSString *)strURL param:(NSDictionary *)dictParameters completionHandler:(void (^)(NSData *, NSURLResponse *, NSError *))postDataWebServiceCompletionHandler
{
    NSDictionary *headers = @{ kContentType: kAppJson };
    
    NSData *postData = [NSJSONSerialization dataWithJSONObject:dictParameters options:0 error:nil];
    
    // URL of the endpoint we're going to contact.
    NSURL *setURL = [NSURL URLWithString:strURL];
    
    // Create a POST request with JSON as a request body.
    NSMutableURLRequest *postDataRequest = [NSMutableURLRequest requestWithURL:setURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:10.0];
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

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    NSLog(@"Push Notification Information : %@",userInfo);
    if (application.applicationState == UIApplicationStateActive) {
        NSString *strPushMessage = userInfo[@"aps"][@"alert"];
        UIAlertView *alertPushMessage = [[UIAlertView alloc] initWithTitle:nil message:strPushMessage delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
        [alertPushMessage show];
    }
}

-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    NSLog(@"%@ = %@", NSStringFromSelector(_cmd), error);
    NSLog(@"did Fail To Register For RemoteNotifications With Error = %@",error);
}

#pragma mark - UNUserNotificationCenter Delegate >= iOS 10
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
    NSLog(@"User Info = %@",notification.request.content.userInfo);
    
    UIAlertView *alertPushMsg = [[UIAlertView alloc]
                                 initWithTitle:nil message:[NSString stringWithFormat:@"%@",notification.request.content.userInfo[@"aps"][@"alert"]] delegate: nil
                                 cancelButtonTitle: @"OK" otherButtonTitles:nil];
    [alertPushMsg show];
    
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler{
    NSLog(@"User Info = %@",response.notification.request.content.userInfo);
    completionHandler();
}
//----------------------------------- Finish push stuff -------------------------------------------------


- (void)getscreenSize
{
    screenSize = [UIScreen mainScreen].bounds.size;
    if ((NSFoundationVersionNumber <= NSFoundationVersionNumber_iOS_7_1) && UIInterfaceOrientationIsLandscape([UIApplication sharedApplication].statusBarOrientation)) {
        screenSize = CGSizeMake(screenSize.height, screenSize.width);
    }
}

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window  {
  return UIInterfaceOrientationMaskAll;
}

- (void)applicationWillResignActive:(UIApplication *)application {
	// Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
	// Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
	// Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
	// If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillTerminate:(UIApplication *)application {
	// Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
