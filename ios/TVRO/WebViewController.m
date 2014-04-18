
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
	[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@", hostName]]]];
//	[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://miky.local:5757/settings.php#/general"]]];
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
//		NSLog(@"    ![hostName isEqualToString:_hostName]");
//		[[UIApplication sharedApplication] openURL:request.URL];
//		return false;
		return true;
	
        
	//	at this point it's probably just another path in our app
	} else {
		return true;
	}
}

- (void)webViewURLRequestTimeout {
  NSLog(@"URL load didn't finish loading within 20 sec");
  [self goBackToHostSelect];
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidFinishLoad");
	[timeoutTimer invalidate];
}

- (void)webViewDidStartLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidStartLoad");
    
	NSString* satFinderAvailable = [SatFinderViewController satFinderAvailable] ? @"true" : @"false";
	NSString* demoMode = [[NSUserDefaults standardUserDefaults] boolForKey:@"demo-mode"] ? @"true" : @"false";
	NSString* techMode = [[NSUserDefaults standardUserDefaults] boolForKey:@"tech-mode"] ? @"true" : @"false";
    
  NSString* javascriptString = [NSString stringWithFormat:
    @"var TVRO = {"
      "shell: true,"
      "satFinder: %@,"
      "demoMode: %@,"
      "techMode: %@"
    "};",
    satFinderAvailable,
    demoMode,
    techMode];
    
	[webView stringByEvaluatingJavaScriptFromString:javascriptString];
    
  //start the timeout timer so that if the url doesnt fully load we get kicked back to the host select screen
  timeoutTimer = [NSTimer scheduledTimerWithTimeInterval:20.0 target:self selector:@selector(webViewURLRequestTimeout) userInfo:nil repeats:NO];
}

#pragma mark - UpdatesManagerDelgate protocol methods

- (void)updatesManager:(UpdatesManager *)_updatesManager downloadCompletedForAntType:(NSString *)antType {
	NSString* deviceVersion = [updatesManager deviceVersionForAntType:antType];
	NSString* jsString = [NSString stringWithFormat:@"window.tvro.updates.%@.deviceVersion = '%@'; window.tvro.updates.update();", antType, deviceVersion];
	[webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)updatesManager:(UpdatesManager *)_updatesManager uploadCompletedForAntType:(NSString *)antType {
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
  BonjourViewController* bonjourViewController = [[BonjourViewController alloc] initWithNibName:@"BonjourViewiPadLandscape" bundle:nil];
  [UIApplication sharedApplication].delegate.window.rootViewController = bonjourViewController;
}

- (void)handleCustomURL:(NSURL*)url {
  //	custom urls all begin with tvro://
  //	the custom urls are ...

  //	tvro://set-tech-mode/{ true || false }
  //	tvro://set-demo-mode/{ true || false }
  //      setting tech/demo mode - these are done via cookies on desktop
  //      but are done via NSUserDefaults in the mobile shell

  //	tvro://sat-finder
  //      shows the sat finder - desktop has no sat finder

  //	tvro://updates/device-versions
  //      gets versions of the stored update files
  //      makes a javascript call that gives the web code the device versions

  //	tvro://updates/download/{ antenna-type-of-the-update-to-download }/{ portal-version-to-store-for-device-versions-call }/{ portal-url-to-download-file-from }
  //      starts downloading the a specifed version of the update file
  //      for a specified antenna-type
  //      from a specifed url
  //      this reponsibility is passed from the web code to the mobile code because
  //      you cannot navigate the filesystem on some mobile devices for certain kinds of files

  //	tvro://updates/download/{ antenna-type-of-the-update-to-upload-and-install }
  //      calls the install_software method of the backend
  //      we do this for the same reason as the download - some devices can't
  //      search/find and upload/install the file from the device's file system

  NSArray* pathComponents = [url pathComponents];

  if ([url.host isEqualToString:@"set-tech-mode"] || [url.host isEqualToString:@"set-demo-mode"]) {
    NSString* key = [url.host substringFromIndex:3];
    BOOL value = [[pathComponents objectAtIndex:1] isEqualToString:@"true"];
    NSLog(@"!!!");
    NSLog(@"%@", key);
    [[NSUserDefaults standardUserDefaults] setBool:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
  } else if ([url.host isEqualToString:@"sat-finder"]) {
    NSString* jsString = @"(function() { var webService = new TVRO.WebService(); return webService.getSatelliteList2(); }());";
    NSString* satListXmlString = [webView stringByEvaluatingJavaScriptFromString:jsString];
    satFinderViewController = [[SatFinderViewController alloc] initWithSatListXmlString:satListXmlString];
    [self presentViewController:satFinderViewController animated:YES completion:nil];

  } else if ([url.host isEqualToString:@"updates"]) {
    if ([pathComponents[1] isEqualToString:@"device-versions"]) {
      //	tvro://updates/device-versions
      NSString* tv1DeviceVersion = [updatesManager deviceVersionForAntType:@"tv1"];
      NSString* tv3DeviceVersion = [updatesManager deviceVersionForAntType:@"tv3"];
      NSString* tv5DeviceVersion = [updatesManager deviceVersionForAntType:@"tv5"];
      NSString* tv6DeviceVersion = [updatesManager deviceVersionForAntType:@"tv6"];
      NSString* javascriptString = [NSString stringWithFormat:@"window.tvro.updates.setDeviceVersions({'tv1':'%@','tv3':'%@','tv5':'%@','tv6':'%@'});", tv1DeviceVersion, tv3DeviceVersion, tv5DeviceVersion, tv6DeviceVersion];
      [webView stringByEvaluatingJavaScriptFromString:javascriptString];
      
    } else if ([pathComponents[1] isEqualToString:@"download"]) {
      //	tvro://updates/download/antenna-type/portal-version/portal-url
      NSString* antType = [NSString stringWithString:pathComponents[2]];
      NSString* portalVersion = [NSString stringWithString:pathComponents[3]];
      NSString* portalUrl = [[pathComponents subarrayWithRange:NSMakeRange(4, [pathComponents count]-4)] componentsJoinedByString:@"/"];
      [updatesManager startDownloadForAntType:antType portalVersion:portalVersion portalUrl:[NSURL URLWithString:portalUrl]];
      
    } else if ([pathComponents[1] isEqualToString:@"install"]) {
      //	tvro://updates/install/antenna-type
      NSString* antType = [NSString stringWithString:pathComponents[2]];
      [updatesManager startUploadForAntType:antType uploadUrl:[NSURL URLWithString:@"/xmlservices.php/upload_software"]];
    }

  } else if ([url.host isEqualToString:@"change-hostname"]) {
    [self goBackToHostSelect];
  }
}

@end