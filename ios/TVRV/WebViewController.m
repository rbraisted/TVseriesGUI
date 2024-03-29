
#import "WebViewController.h"
#import "UpdatesManager.h"
#import "BonjourViewController.h"

@interface WebViewController ()

@end

@implementation WebViewController

#pragma mark - UIViewController methods

#define ConnectionAlert @"Connection to TV-Hub failed."
#define ConnectionFailureUpdateAlert @"Failure to connect with the updates site."
#define RGBCOLOR(r, g, b) [UIColor colorWithRed:r/225.0f green:g/225.0f blue:b/225.0f alpha:1]

- (void)viewWillAppear:(BOOL)animated {
    //    there used to be a very complicated process to pass demo/tech mode
    //    and mobile shell flags to the web code but now we just open on shell.php
    //    which handles this for us
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/shell.php", hostName]]]];
}

- (void)viewDidLoad {
    [self initUpdatesManager];
    [self addMainWebView];
    [self addHelpWebView];
    [self addLoadingView];
    [self addNotificationIcon];
    [super viewDidLoad];
}

- (void)initUpdatesManager {
    updatesManager = [[UpdatesManager alloc] initWithDelegate:self];
}

- (void)addMainWebView {
    // main web view - displays gui, handles custom scheme (tvro://) calls
    webView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
    [webView setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
    [webView.scrollView setDelaysContentTouches:NO];
    [webView setDelegate:self];
    webView.backgroundColor = [UIColor clearColor];
    webView.opaque = NO;
    webView.scrollView.bounces = NO;
    [self.view addSubview:webView];
    [self.view setBackgroundColor:RGBCOLOR(13.0f, 18.0f, 49.0f)];
}

- (void)addHelpWebView {
    //    help web view - displays help pages
    //    no delegate set for helpWebView
    helpWebView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
    [helpWebView setAutoresizingMask:UIViewAutoresizingFlexibleWidth];
    [helpWebView.scrollView setDelaysContentTouches:NO];
    helpWebView.scrollView.bounces = NO;
    helpWebView.backgroundColor = RGBCOLOR(13.0f, 18.0f, 49.0f);
    helpWebView.opaque = NO;
    [helpWebView setHidden:YES];
    [self.view addSubview:helpWebView];
    
    //    attach a close button and header bar to the help
    UIImage* helpCloseButtonImage = [UIImage imageNamed:@"close-button"];
    UIButton* helpCloseButton = [UIButton buttonWithType:UIButtonTypeCustom];
    yPosHelpCloseButton = 0.0;
    if (IS_IPHONEX) {
        yPosHelpCloseButton = 55;
    } else {
        yPosHelpCloseButton = 10;
    }
    [helpCloseButton setFrame:CGRectMake(self.view.frame.size.width - 40.0, yPosHelpCloseButton, 24.0, 24.0)];
    [helpCloseButton setAutoresizingMask:UIViewAutoresizingFlexibleLeftMargin];
    [helpCloseButton setBackgroundImage:helpCloseButtonImage forState:UIControlStateNormal];
    [helpCloseButton addTarget:self action:@selector(closeHelpWebView) forControlEvents:UIControlEventTouchUpInside];
    
    UILabel* helpTopBarLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, 50.0)];
    [helpTopBarLabel setAutoresizingMask:UIViewAutoresizingFlexibleWidth];
    [helpTopBarLabel setTextColor:[UIColor whiteColor]];
    [helpTopBarLabel setText:@"Help Center"];
    [helpTopBarLabel setTextAlignment:NSTextAlignmentCenter];
    [helpTopBarLabel setFont:[UIFont fontWithName:@"Helvetica" size:21]];
    
    UIView* helpTopBar = [[UIView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, 50.0)];
    [helpTopBar setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
    [helpTopBar setBackgroundColor:[UIColor blackColor]];
    [helpTopBar addSubview:helpTopBarLabel];
    if (!IS_IPHONEX) {
        [helpWebView addSubview:helpTopBar];
    }
    [helpWebView addSubview:helpCloseButton];
}

- (void)addLoadingView {
    // spinner/loader
    loadingView = [[UIView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
    [loadingView setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
    [loadingView setBackgroundColor:[UIColor colorWithRed:4.0/255.0 green:18.0/255.0 blue:42.0/255.0 alpha:1]];
    
    UIImageView* backgroundView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"gradient.png"]];
    [backgroundView setAutoresizingMask:(UIViewAutoresizingFlexibleLeftMargin   |
                                         UIViewAutoresizingFlexibleRightMargin  |
                                         UIViewAutoresizingFlexibleTopMargin    |
                                         UIViewAutoresizingFlexibleBottomMargin)];
    [backgroundView setCenter:loadingView.center];
    [loadingView addSubview:backgroundView];
    
    UIActivityIndicatorView* spinnerView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    [spinnerView setAutoresizingMask:(UIViewAutoresizingFlexibleLeftMargin   |
                                      UIViewAutoresizingFlexibleRightMargin  |
                                      UIViewAutoresizingFlexibleTopMargin    |
                                      UIViewAutoresizingFlexibleBottomMargin)];
    [spinnerView setCenter:loadingView.center];
    [loadingView addSubview:spinnerView];
    [spinnerView startAnimating];
    [self.view addSubview:loadingView];
    [loadingView setHidden:TRUE];
}

- (void)addNotificationIcon {
    UIImage *imgNotif = [UIImage imageNamed:@"notifications"];
    CGRect frameNotif = CGRectMake(self.view.frame.size.width-(imgNotif.size.width+10), yPosHelpCloseButton, imgNotif.size.width, imgNotif.size.height);
    btnNotif = [[UIButton alloc] initWithFrame:frameNotif];
    [btnNotif setBackgroundImage:imgNotif forState:UIControlStateNormal];
    [btnNotif addTarget:self action:@selector(openNotificationsScreen) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btnNotif];
    btnNotif.hidden = YES;
}

- (void)openNotificationsScreen {
    NotificationViewController *objNotificationVC = [[NotificationViewController alloc] initWithNibName:@"NotificationViewController" bundle:nil];
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:objNotificationVC];
    [self presentViewController:navigationController animated:YES completion:^{ }];
}

#pragma mark - UIWebViewDelegate protocol methods
- (void)webViewDidStartLoad:(UIWebView *)_webView
{
    //NSLog(@"webViewDidStartLoad");
    btnNotif.hidden = YES;
    webView.delegate = self;
    NSURLRequest* request = _webView.request;
    if ([request.URL.path isEqualToString:@"/support.php"] && [request.URL.fragment isEqualToString:@"/command-line"]) {
        //    see comment in webView shouldStartLoadWithRequest about print2screen.php
        return;
    }
    //    start the timeout timer so that if the url doesnt fully load we get kicked back to the host select screen
    timeoutTimer = [NSTimer scheduledTimerWithTimeInterval:20.0 target:self selector:@selector(webViewURLRequestTimeout) userInfo:nil repeats:NO];
    [loadingView setHidden:FALSE];
}

- (void)webView:(UIWebView *)_webView didFailLoadWithError:(NSError*)error
{
    //NSLog(@"webView:%@ didFailLoadWithError:%@", _webView == webView ? @"webView" : @"helpWebView", error);
    //  NSURLErrorCancelled (-999)
    //    "Returned when an asynchronous load is canceled. A Web Kit framework delegate will
    //    receive this error when it performs a cancel operation on a loading resource. Note
    //    that an NSURLConnection or NSURLDownload delegate will not receive this error
    //    if the download is canceled."
    //    k
    //    i'm not exactly sure what unusual cases might bring this error, but we need to
    //    check for this case now in order to prevent the timeoutTimer from kicking us
    //    back to the bonjour view after a redirect (or even if the user has fast fingers)
    
    
    if ([_webView.request.URL.path isEqualToString:@"/support.php"]) {
        // call when go back to the command screen...
        return;
    }
    if (error.code == NSURLErrorCancelled) {
        return;
    } else if (error.code == NSURLErrorCannotFindHost  || error.code == NSURLErrorCannotConnectToHost || error.code == NSURLErrorNotConnectedToInternet || error.code == NSURLErrorTimedOut) {
        [timeoutTimer invalidate];
        [loadingView setHidden:TRUE];
        if (ApplicationDelegate.isNavigateToUpdateScreen) {
            if (error.code == NSURLErrorNotConnectedToInternet) {
                [self goBackToHostSelect:ConnectionFailureUpdateAlert];
            }
            else {
                [self goBackToHostSelect:ConnectionAlert];
            }
        }
        else {
            [self goBackToHostSelect:ConnectionAlert];
        }
    }
}

- (BOOL)webView:(UIWebView *)_webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    //NSLog(@"webView:%@ shouldStartLoadWithRequest:%@ navigationType:%ld", _webView == webView ? @"webView" : @"helpWebView", request, (long)navigationType);
    //NSLog(@"request.URL.path is %@", request.URL.path);
    
    NSString* _hostName = [NSString stringWithFormat:@"%@", request.URL.host];
    if (request.URL.port)
        _hostName = [NSString stringWithFormat:@"%@:%@", _hostName, request.URL.port];
    
    [helpWebView setHidden:YES];
    
    
    // Use this action when pressed Home button in update page
    // Use for in application only
    if ([request.URL.scheme isEqualToString:@"inapp"]) {
        if ([request.URL.host isEqualToString:@"GoToHomePage"]) {
            [self navigateToLaunchPage];
        }
        return NO;
    }
    
    //    check if it's a javascript to ios/android command
    //    being called with a the scheme "tvro"
    if ([request.URL.scheme isEqualToString:@"tvro"]) {
        //NSLog(@"    [request.URL.scheme isEqualToString:@\"tvro\"]");
        btnNotif.hidden = YES;
        [self handleCustomURL:request.URL];
        return false;
        
        
    } else if ([request.URL.path isEqualToString:@"/print2screen.php"]) {
        //NSLog(@"    [request.URL.relativeString isEqualToString:@\"/print2screen.php\"]");
        //    the command line view pulls this file in, and it can take a while.
        //    but this request shouldn't cause you to return to the bonjour view
        //    even if it takes more than a minute to complete
        //    there is more to this in webViewDidStartLoad
        [timeoutTimer invalidate];
        [loadingView setHidden:TRUE];
        return true;
        
        
    } else if ([request.URL.relativeString isEqualToString:@"about:blank"]) {
        //    were trying to go to about:blank for some reason lets negate that
        //NSLog(@"    [request.URL.relativeString isEqualToString:@\"about:blank\"]");
        [timeoutTimer invalidate];
        [loadingView setHidden:TRUE];
        return false;
        
        
        //    check if it's coming from our bdu hostname
        //    if not, it's probably an external link and we
        //    should open it in safari
    } else if (![hostName isEqualToString:_hostName]) {
        //NSLog(@"    ![hostName isEqualToString:_hostName]");
        //        [[UIApplication sharedApplication] openURL:request.URL];
        //        return false;
        return true;
        
        
        //    } else if ([request.URL.pathComponents objectAtIndex:1])
        
        //    at this point it's probably just another path in our app,
        //    so return true and let the uiwebview continue loading
    } else {
        return true;
    }
}

- (void)webViewURLRequestTimeout
{
    //NSLog(@"webView URL Request Timeout");
    //webView.delegate = nil;
    //[self goBackToHostSelect:ConnectionAlert];
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView
{
    //NSLog(@"webViewDidFinishLoad");
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    //    set tech and demo mode - the device's settings should override the
    //    cookies set by the gui - we basically brute force this by setting the cookies
    //    with the device's setting values on every page load
    NSString* demoMode = [defaults boolForKey:@"demo-mode"] ? @"true" : @"false";
    NSString* demoModeString = [NSString stringWithFormat:@"TVRO.setDemoMode(%@);", demoMode];
    
    NSString* techMode = [defaults boolForKey:@"tech-mode"] ? @"true" : @"false";
    NSString* techModeString = [NSString stringWithFormat:@"TVRO.setTechMode(%@);", techMode];
    
    NSString* satFinderAvailable = [SatelliteFinderViewController available] ? @"true" : @"false";
    NSString* satFinderAvailableString = [NSString stringWithFormat:@"TVRO.setSatfinderMode(%@);", satFinderAvailable];
    
    //  get the string, check for single quotes and escape them
    //  this should probably get helperd out
    NSString* installerCompany = [defaults valueForKey:@"installer-company"];
    if (installerCompany == NULL) installerCompany = @"false";
    else installerCompany = [NSString stringWithFormat:@"'%@'", [installerCompany stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"]];
    NSString* installerCompanyString = [NSString stringWithFormat:@"TVRO.setInstallerCompany(%@);", installerCompany];
    
    NSString* installerContact = [defaults valueForKey:@"installer-contact"];
    if (installerContact == NULL) installerContact = @"false";
    else installerContact = [NSString stringWithFormat:@"'%@'", [installerContact stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"]];
    NSString* installerContactString = [NSString stringWithFormat:@"TVRO.setInstallerContact(%@);", installerContact];
    
    NSString* installerPhone = [defaults valueForKey:@"installer-phone"];
    if (installerPhone == NULL) installerPhone = @"false";
    else installerPhone = [NSString stringWithFormat:@"'%@'", [installerPhone stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"]];
    NSString* installerPhoneString = [NSString stringWithFormat:@"TVRO.setInstallerPhone(%@);", installerPhone];
    
    NSString* installerEmail = [defaults valueForKey:@"installer-email"];
    if (installerEmail == NULL) installerEmail = @"false";
    else installerEmail = [NSString stringWithFormat:@"'%@'", [installerEmail stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"]];
    NSString* installerEmailString = [NSString stringWithFormat:@"TVRO.setInstallerEmail(%@);", installerEmail];
    
    NSString* jsString = [NSString stringWithFormat:@"%@%@%@%@%@%@%@", demoModeString,
                          techModeString,
                          satFinderAvailableString,
                          installerCompanyString,
                          installerContactString,
                          installerPhoneString,
                          installerEmailString];
    [webView stringByEvaluatingJavaScriptFromString:jsString];
    
    // Check to see if the default host name has been set to the current connected host
    // if not then set the user defaults host name so it can be displayed on Bonjour view
    NSString* defaultHostname = [defaults objectForKey:@"default-host"];
    if (![hostName isEqualToString:defaultHostname] && ![hostName isEqualToString:kWebSvcPortal]) {
        [defaults setObject:hostName forKey:@"default-host"];
        [defaults synchronize];
    }
    
    [timeoutTimer invalidate];
    [loadingView setHidden:TRUE];
    
    if ([_webView.request.URL.path isEqualToString:@"/shell.php"] || [_webView.request.URL.path isEqualToString:@"/wizard"] || [_webView.request.URL.path isEqualToString:@"/home.php"] || [_webView.request.URL.path isEqualToString:@"/satellites.php"] || [_webView.request.URL.path isEqualToString:@"/autoswitch.php"] || [_webView.request.URL.path isEqualToString:@"/settings.php"] || [_webView.request.URL.path isEqualToString:@"/updates.php"] || [_webView.request.URL.path isEqualToString:@"/support.php"] ) {
        btnNotif.hidden = NO;
        
        UIImage *imgNotif = [UIImage imageNamed:@"notifications"];
        CGRect frameNotif = CGRectMake(50, yPosHelpCloseButton, imgNotif.size.width, imgNotif.size.height);
        btnNotif.frame = frameNotif;
        
    } else {
        btnNotif.hidden = YES;
    }
}

- (void)navigateToLaunchPage {
    BonjourViewController* bonjourViewController = [[BonjourViewController alloc] init];
    [UIApplication sharedApplication].delegate.window.rootViewController = bonjourViewController;
}

#pragma mark - UpdatesManagerDelgate protocol methods
- (void)updatesManager:(UpdatesManager *)_updatesManager downloadCompletedForUpdateType:(NSString *)updateType {
    //NSLog(@"updatesManager downloadCompletedForUpdateType:%@", updateType);
    [webView reload];
}

- (void)updatesManager:(UpdatesManager *)_updatesManager uploadCompletedForUpdateType:(NSString *)updateType {
    //NSLog(@"updatesManager uploadCompletedForUpdateType:%@", updateType);
    NSString* fileName = [updatesManager fileNameForUpdateType:updateType];
    NSString* jsString = [NSString stringWithFormat:@"TVRO.installSoftware({ install: 'Y', filename: '%@' }).then(TVRO.reload);", fileName];
    [webView stringByEvaluatingJavaScriptFromString:jsString];
}

#pragma mark - WebViewController methods

- (id)initWithHostName:(NSString*)_hostName {
    self = [self init];
    //    remove / from end of host name
    //    we're going to add it ourselves in viewWillAppear
    if ([_hostName hasSuffix:@"/"]) hostName = [_hostName substringToIndex:[_hostName length]-1];
    else hostName = _hostName;
    return self;
}

- (void)goBackToHostSelect:(NSString *)strMsg
{
    BonjourViewController* bonjourViewController = [[BonjourViewController alloc] init];
    [UIApplication sharedApplication].delegate.window.rootViewController = bonjourViewController;
    UIAlertView *alertError = [[UIAlertView alloc] initWithTitle:@"Error" message:strMsg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alertError show];
}

- (void)handleCustomURL:(NSURL*)url {
    //    custom urls all begin with tvro://
    //    the custom urls are ...
    
    NSArray* pathComponents = [url pathComponents];
    
    if ([url.host isEqualToString:@"help"]) {
        NSString* helpUrlString = [NSString stringWithFormat:@"http://%@/%@%@?%@", hostName, url.host, url.path, url.query];
        NSURL* helpUrl = [NSURL URLWithString:helpUrlString];
        NSURLRequest* helpRequest = [NSURLRequest requestWithURL:helpUrl];
        [helpWebView loadRequest:helpRequest];
        [helpWebView setHidden:NO];
        
    } else if ([url.host isEqualToString:@"change-hostname"]) {
        //    tvro://change-hostname
        //    brings you back to the bonjour list view
        [self goBackToHostSelect:@""];
        
    } else if ([url.host isEqualToString:@"sat-finder"]) {
        //    tvro://sat-finder
        //    shows the sat finder - desktop has no sat finder
        //if (satFinderViewController == NULL)
        //satFinderViewController = [[SatelliteFinderViewController alloc] init];
        SatelliteFinderViewController* satFinderViewController = [[SatelliteFinderViewController alloc] init];
        if ([[NSUserDefaults standardUserDefaults] boolForKey:@"demo-mode"])
            [satFinderViewController getSatListFromBundle];
        else
            [satFinderViewController getSatListFromHostname:hostName];
        [self presentViewController:satFinderViewController animated:YES completion:nil];
        
    } else if ([url.host isEqualToString:@"set-installer-company"]
               || [url.host isEqualToString:@"set-installer-contact"]
               || [url.host isEqualToString:@"set-installer-phone"]
               || [url.host isEqualToString:@"set-installer-email"]) {
        NSString* key = [url.host substringFromIndex:4];
        NSString* value = [url.path substringFromIndex:1];
        [[NSUserDefaults standardUserDefaults] setValue:value forKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        
    } else if ([url.host isEqualToString:@"set-tech-mode"] || [url.host isEqualToString:@"set-demo-mode"]) {
        //    tvro://set-tech-mode/{ true || false }
        //    tvro://set-demo-mode/{ true || false }
        //    setting tech/demo mode - these are done via cookies on desktop
        //    but are done via NSUserDefaults in the mobile shell
        //    the ui buttons in GeneralSettingsView of the web code is hooked up
        //    to call these two functions on the iOS side
        NSString* key = [url.host substringFromIndex:4];
        BOOL value = [[pathComponents objectAtIndex:1] isEqualToString:@"true"];
        [[NSUserDefaults standardUserDefaults] setBool:value forKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        
    } else if ([url.host isEqualToString:@"get-device-versions"]) {
        //    tvro://get-device-versions
        //    gets versions of the stored update files
        //    makes a javascript call that gives the web code the device versions
        [self setDeviceVersions];
        
    } else if ([url.host isEqualToString:@"download"]) {
        //  tvro://download/{ update-type-to-download }/{ portal-version-to-store-for-device-versions-call }/{ portal-url-to-download-update-from }
        //    starts downloading the a specifed version of the update file
        //    for a specified antenna-type
        //    from a specifed url
        //    this reponsibility is passed from the web code to the mobile code because
        //    you cannot navigate the filesystem on some mobile devices for certain kinds of files
        NSString* updateType = [NSString stringWithString:pathComponents[1]];
        NSString* portalVersion = [NSString stringWithString:pathComponents[2]];
        NSString* portalUrl = [[pathComponents subarrayWithRange:NSMakeRange(3, [pathComponents count]-3)] componentsJoinedByString:@"/"];
        [updatesManager startDownloadForUpdateType:updateType portalVersion:portalVersion portalUrl:[NSURL URLWithString:portalUrl]];
        
    } else if ([url.host isEqualToString:@"upload"]) {
        //  tvro://upload/{ update-type-to-upload-and-install }
        //    calls the install_software method of the backend
        //    we do this for the same reason as the download - some devices can't
        //    search/find and upload/install the file from the device's file system
        NSString* updateType = [NSString stringWithString:pathComponents[1]];
        NSString* uploadURLString = [NSString stringWithFormat:@"http://%@/xmlservices.php/set_config_file", hostName];
        NSURL* uploadURL = [NSURL URLWithString:uploadURLString];
        [updatesManager startUploadForUpdateType:updateType uploadUrl:uploadURL];
    } else if ([url.host isEqualToString:@"restart"]) {
        //NSLog(@"user requested restart launch page");
        [self goBackToHostSelect:@""];
    }
    
    //invalidate timer otherwise we will be kicked back to the bonjour
    //from calls like set-demo-mode, set-tech-mode
    [timeoutTimer invalidate];
    [loadingView setHidden:TRUE];
}

- (void)setDeviceVersions {
    NSString* satLibraryDeviceVersion = [updatesManager deviceVersionForUpdateType:@"satlibrary"];
    NSString* tv1DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"tv1"];
    NSString* tv3DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"tv3"];
    NSString* tv5DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"tv5"];
    NSString* tv6DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"tv6"];
    NSString* tv8DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"tv8"];
    NSString* uhd7DeviceVersion =        [updatesManager deviceVersionForUpdateType:@"uhd7"];
    NSString* rv1DeviceVersion  =        [updatesManager deviceVersionForUpdateType:@"rv1"];
    NSString* a9DeviceVersion   =        [updatesManager deviceVersionForUpdateType:@"a9"];
    
    //    on the web app side this should trigger the fulfillment of the TVRO.getDeviceVersions() promise
    NSString* jsString = [NSString stringWithFormat:@"TVRO.setDeviceVersions({ SatLibrary: '%@', TV1: '%@', TV3: '%@', TV5: '%@', TV6: '%@', TV8: '%@', UHD7: '%@' , RV1: '%@' , A9: '%@' });", satLibraryDeviceVersion, tv1DeviceVersion, tv3DeviceVersion, tv5DeviceVersion, tv6DeviceVersion, tv8DeviceVersion, uhd7DeviceVersion, rv1DeviceVersion, a9DeviceVersion];
    
    [webView stringByEvaluatingJavaScriptFromString:jsString];
}

#pragma mark - Orientations methods
- (BOOL)shouldAutorotate {
    return YES;
}

#if __IPHONE_OS_VERSION_MAX_ALLOWED < 90000
- (NSUInteger)supportedInterfaceOrientations
#else
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
#endif
{
    if (IS_IPAD) {
        return UIInterfaceOrientationMaskLandscape;
    } else {
        return UIInterfaceOrientationMaskPortrait;
    }
}

- (void)closeHelpWebView {
    btnNotif.hidden = NO;
    [helpWebView setHidden:YES];
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end

