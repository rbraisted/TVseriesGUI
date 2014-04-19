
#import "AppDelegate.h"
#import "BonjourViewController.h"

@implementation AppDelegate

#pragma mark - UIApplicationDelegate protocol methods

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  self.window.backgroundColor = [UIColor blackColor];
  [self.window makeKeyAndVisible];
	
  //	set default values -
  //	even though we set these in the settings bundle,
  //	iOS doesn't actually use those defaults on first launch
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  if ([defaults objectForKey:@"tech-mode"] == nil) [defaults setBool:false forKey:@"tech-mode"];
  if ([defaults objectForKey:@"demo-mode"] == nil) [defaults setBool:true forKey:@"demo-mode"];
  
  [defaults synchronize];
  NSLog(@"%@", [defaults dictionaryRepresentation]);
	NSLog(@"tech-mode: %d", [defaults boolForKey:@"tech-mode"]);
	NSLog(@"demo-mode: %d", [defaults boolForKey:@"demo-mode"]);
  NSLog(@"\n");

  BonjourViewController* bonjourViewController = [[BonjourViewController alloc] init];
	self.window.rootViewController = bonjourViewController;

	return YES;
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

- (void)applicationWillEnterForeground:(UIApplication *)application {
	// Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
	// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
	// Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end