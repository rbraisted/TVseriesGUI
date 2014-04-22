
#import "WebViewController.h"
#import "UpdatesManager.h"
#import "BonjourViewController.h"

@interface WebViewController ()

@end

@implementation WebViewController

#pragma mark - UIViewController methods

- (void)viewDidLoad {
	webView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
	[webView setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
	[webView.scrollView setDelaysContentTouches:NO];
	[webView setDelegate:self];
	[webView setBackgroundColor:[UIColor blackColor]];
	webView.scrollView.bounces = NO;
	[self.view addSubview:webView];
	
	updatesManager = [[UpdatesManager alloc] initWithDelegate:self];
	
	[super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
  //	there used to be a very complicated process to pass demo/tech mode
  //	and mobile shell flags to the web code but now we just open on shell.php
  //	which handles this for us
	[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/shell.php", hostName]]]];
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - UIWebViewDelegate protocol methods

- (void)webView:(UIWebView *)_webView didFailLoadWithError:(NSError*)error {
	NSLog(@"webView didFailLoadWithError:%@", error);
}

- (BOOL)webView:(UIWebView *)_webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
  NSLog(@"webView shouldStartLoadWithRequest:%@ navigationType:%d", request, navigationType);

	//	we should check for:
	//	1 our hostname, for which we always return yes
	//	2 software updates (urls which end in the file ext .kvh), for which we always return no & and then take over the downloading process
	//	3 pdfs, which we open with hostname/pdf-frame.php
	//	4 anything besides those, for which we should always return no and then open in safari app instead
	NSString* _hostName = [NSString stringWithFormat:@"%@", request.URL.host];
	if (request.URL.port) _hostName = [NSString stringWithFormat:@"%@:%@", _hostName, request.URL.port];

	//	check if it's a javascript to ios/android command
	//	being called with a the scheme "tvro"
	if ([request.URL.scheme isEqualToString:@"tvro"]) {
    NSLog(@"  [request.URL.scheme isEqualToString:@\"tvro\"]");
    
    [self handleCustomURL:request.URL];
		return false;

        
	//	if we're being directed to a .pdf file, we're going to display it
	//	in some custom view that includes the pdf and a back button
//	} else if ([request.URL.pathExtension isEqualToString:@"pdf"]) {
//		NSLog(@"    request.URL.pathExtension isEqualToString:@\"pdf\"");
//		if (![webView.request.URL.lastPathComponent isEqualToString:@"pdf-frame.php"])
//			[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/pdf-frame.php?src=%@", hostName, request.URL]]]];
//		return false;

    
	//	check if it's coming from our bdu hostname
	//	if not, it's probably an external link and we
	//	should open it in safari
	} else if (![hostName isEqualToString:_hostName]) {
		NSLog(@"  ![hostName isEqualToString:_hostName]");
//		[[UIApplication sharedApplication] openURL:request.URL];
//		return false;
		return true;
	
        
	//	at this point it's probably just another path in our app
	} else {
		NSLog(@"  } else {");
		return true;
	}
}

- (void)webViewURLRequestTimeout {
  NSLog(@"URL load didn't finish loading within 20 sec");
  [self goBackToHostSelect];
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidFinishLoad");
  
	NSString* demoMode = [[NSUserDefaults standardUserDefaults] boolForKey:@"demo-mode"] ? @"true" : @"false";
  NSString* demoModeString = [NSString stringWithFormat:@"TVRO.setDemoMode(%@);", demoMode];
  
	NSString* techMode = [[NSUserDefaults standardUserDefaults] boolForKey:@"tech-mode"] ? @"true" : @"false";
  NSString* techModeString = [NSString stringWithFormat:@"TVRO.setTechMode(%@);", techMode];
  
	NSString* jsString = [NSString stringWithFormat:@"%@%@", demoModeString, techModeString];
	[webView stringByEvaluatingJavaScriptFromString:jsString];

	[timeoutTimer invalidate];
}

- (void)webViewDidStartLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidStartLoad");
  //	start the timeout timer so that if the url doesnt fully load we get kicked back to the host select screen
  timeoutTimer = [NSTimer scheduledTimerWithTimeInterval:20.0 target:self selector:@selector(webViewURLRequestTimeout) userInfo:nil repeats:NO];
}

#pragma mark - UpdatesManagerDelgate protocol methods

- (void)updatesManager:(UpdatesManager *)_updatesManager downloadCompletedForUpdateType:(NSString *)updateType {
	NSLog(@"updatesManager downloadCompletedForUpdateType:%@", updateType);
  [self setDeviceVersions];
	[webView stringByEvaluatingJavaScriptFromString:@"TVRO.reload();"];
}

- (void)updatesManager:(UpdatesManager *)_updatesManager uploadCompletedForUpdateType:(NSString *)updateType {
	NSLog(@"updatesManager uploadCompletedForUpdateType:%@", updateType);
	NSString* jsString = [NSString stringWithFormat:@"window.tvro.updates.install('%@');", @"some file name"];
	[webView stringByEvaluatingJavaScriptFromString:jsString];
}

#pragma mark - WebViewController methods

- (id)initWithHostName:(NSString*)_hostName {
	self = [self init];
	hostName = _hostName;
	return self;
}

- (void)goBackToHostSelect {
  //	we should probably move the iPad detection to BonjourViewController
  //	and we should probably pop/push instead of setting the rootViewController
  BonjourViewController* bonjourViewController = [[BonjourViewController alloc] init];
  [UIApplication sharedApplication].delegate.window.rootViewController = bonjourViewController;
}

- (void)handleCustomURL:(NSURL*)url {
  //	custom urls all begin with tvro://
  //	the custom urls are ...
  
  NSLog(@"handleCustomURL: %@", url);
  NSArray* pathComponents = [url pathComponents];
  
  if ([url.host isEqualToString:@"change-hostname"]) {
  //	tvro://change-hostname
  //    brings you back to the bonjour list view
    [self goBackToHostSelect];

    
  } else if ([url.host isEqualToString:@"sat-finder"]) {
  //	tvro://sat-finder
  //    shows the sat finder - desktop has no sat finder
    [self showSatFinder];
    
    
  } else if ([url.host isEqualToString:@"set-tech-mode"] || [url.host isEqualToString:@"set-demo-mode"]) {
  //	tvro://set-tech-mode/{ true || false }
  //	tvro://set-demo-mode/{ true || false }
  //    setting tech/demo mode - these are done via cookies on desktop
  //    but are done via NSUserDefaults in the mobile shell
  //    the ui buttons in GeneralSettingsView of the web code is hooked up
  //    to call these two functions on the iOS side
    NSString* key = [url.host substringFromIndex:4];
    NSLog(@"key: %@", key);
    BOOL value = [[pathComponents objectAtIndex:1] isEqualToString:@"true"];
    NSLog(@"value: %@", key);
    [[NSUserDefaults standardUserDefaults] setBool:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    
  } else if ([url.host isEqualToString:@"get-device-versions"]) {
  //	tvro://get-device-versions
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
    [updatesManager startUploadForUpdateType:updateType uploadUrl:[NSURL URLWithString:@"/xmlservices.php/upload_software"]];
  }
    
  //invalidate timer otherwise we will be kicked back to the bonjour
  //from calls like set-demo-mode, set-tech-mode
  [timeoutTimer invalidate];
}

- (void)showSatFinder {
  NSString* jsString = @"(function() { var webService = new TVRO.WebService(); return webService.getSatelliteList2(); }());";
  NSString* satListXmlString = [webView stringByEvaluatingJavaScriptFromString:jsString];
  satFinderViewController = [[SatFinderViewController alloc] initWithSatListXmlString:satListXmlString];
  [self presentViewController:satFinderViewController animated:YES completion:nil];
}

- (void)setDeviceVersions {
  NSString* satLibraryDeviceVersion = [updatesManager deviceVersionForUpdateType:@"satlibrary"];
  NSString* tv1DeviceVersion = [updatesManager deviceVersionForUpdateType:@"tv1"];
  NSString* tv3DeviceVersion = [updatesManager deviceVersionForUpdateType:@"tv3"];
  NSString* tv5DeviceVersion = [updatesManager deviceVersionForUpdateType:@"tv5"];
  NSString* tv6DeviceVersion = [updatesManager deviceVersionForUpdateType:@"tv6"];
  NSString* rv1DeviceVersion = [updatesManager deviceVersionForUpdateType:@"rv1"];
  
  NSLog(@"setDeviceVersions");
  NSLog(@"satLibraryDeviceVersion: %@", satLibraryDeviceVersion);
  NSLog(@"tv1DeviceVersion: %@", tv1DeviceVersion);
  NSLog(@"tv3DeviceVersion: %@", tv3DeviceVersion);
  NSLog(@"tv5DeviceVersion: %@", tv5DeviceVersion);
  NSLog(@"tv6DeviceVersion: %@", tv6DeviceVersion);
  NSLog(@"rv1DeviceVersion: %@", rv1DeviceVersion);
  
  //	on the web app side this should trigger the fulfillment of the TVRO.getDeviceVersions() promise
  NSString* jsString = [NSString stringWithFormat:@"TVRO.setDeviceVersions({ SatLibrary: '%@', TV1: '%@', TV3: '%@', TV5: '%@', TV6: '%@', RV1: '%@' });", satLibraryDeviceVersion, tv1DeviceVersion, tv3DeviceVersion, tv5DeviceVersion, tv6DeviceVersion, rv1DeviceVersion];
  
  NSLog(@"jsString: %@", jsString);
  
  [webView stringByEvaluatingJavaScriptFromString:jsString];
}

@end