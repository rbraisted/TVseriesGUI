/*       *\

    ^3^

\*       */

#import "WebViewController.h"
#import "UpdatesManager.h"

@interface WebViewController ()

@end

@implementation WebViewController

#pragma mark - UIViewController methods

- (void) initView: withNibName {
    
}

- (void)viewDidLoad {
    
    
	webView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
	[webView setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
	[webView.scrollView setDelaysContentTouches:NO];
	[webView setDelegate:self];
    webView.scrollView.bounces = NO;
	[self.view addSubview:webView];
	
	updatesManager = [[UpdatesManager alloc] initWithDelegate:self];
	
	[super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
	[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@", hostName]]]];
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - UIWebViewDelegate protocol methods

- (void)webView:(UIWebView *)_webView didFailLoadWithError:(NSError*)error {
//	NSLog(@"webView didFailLoadWithError:%@", error);
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
	if ([request.URL.scheme isEqualToString:@"tvro"])
    {
		NSLog(@"    [request.URL.scheme isEqualToString:@\"tvro\"]");
		NSArray* pathComponents = [request.URL pathComponents];
        
		if([request.URL.host isEqualToString:@"sat-finder"])
        {
			NSString* jsString = @"(function() { var webService = new TVRO.WebService(); return webService.getSatelliteList2(); }());";
			NSString* satListXmlString = [webView stringByEvaluatingJavaScriptFromString:jsString];
			NSLog(@"satListXmlString:");
			NSLog(@"%@", satListXmlString);
			NSLog(@":satListXmlString");
			satFinderViewController = [[SatFinderViewController alloc] initWithSatListXmlString:satListXmlString];
			[self presentViewController:satFinderViewController animated:YES completion:nil];
		}
        else if([request.URL.host isEqualToString:@"updates"])
        {
			if ([pathComponents[1] isEqualToString:@"device-versions"])
            {
				//	tvro://updates/device-versions
				NSString* tv1DeviceVersion = [updatesManager deviceVersionForAntType:@"tv1"];
				NSString* tv3DeviceVersion = [updatesManager deviceVersionForAntType:@"tv3"];
				NSString* tv5DeviceVersion = [updatesManager deviceVersionForAntType:@"tv5"];
				NSString* tv6DeviceVersion = [updatesManager deviceVersionForAntType:@"tv6"];
				NSString* javascriptString = [NSString stringWithFormat:@"window.tvro.updates.setDeviceVersions({'tv1':'%@','tv3':'%@','tv5':'%@','tv6':'%@'});", tv1DeviceVersion, tv3DeviceVersion, tv5DeviceVersion, tv6DeviceVersion];
				[webView stringByEvaluatingJavaScriptFromString:javascriptString];
			}
            else if([pathComponents[1] isEqualToString:@"download"])
            {
				//	tvro://updates/download/antenna-type/portal-version/portal-url
				NSString* antType = [NSString stringWithString:pathComponents[2]];
				NSString* portalVersion = [NSString stringWithString:pathComponents[3]];
				NSString* portalUrl = [[pathComponents subarrayWithRange:NSMakeRange(4, [pathComponents count]-4)] componentsJoinedByString:@"/"];
				[updatesManager startDownloadForAntType:antType portalVersion:portalVersion portalUrl:[NSURL URLWithString:portalUrl]];
			}
            else if ([pathComponents[1] isEqualToString:@"install"])
            {
				//	tvro://updates/install/antenna-type
				NSString* antType = [NSString stringWithString:pathComponents[2]];
				[updatesManager startUploadForAntType:antType uploadUrl:[NSURL URLWithString:@"/xmlservices.php/upload_software"]];
			}
		}
		return false;

	//	if we're being directed to a .pdf file, we're going to display it
	//	in some custom view that includes the pdf and a back button
	}
    else if ([request.URL.pathExtension isEqualToString:@"pdf"])
    {
		NSLog(@"    request.URL.pathExtension isEqualToString:@\"pdf\"");
		if (![webView.request.URL.lastPathComponent isEqualToString:@"pdf-frame.php"])
        {
			[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/pdf-frame.php?src=%@", hostName, request.URL]]]];
		}
		return false;
			
	//	check if it's coming from our bdu hostname
	//	if not, it's probably an external link and we
	//	should open it in safari
	}
    else if (![hostName isEqualToString:_hostName])
    {
//		NSLog(@"    ![hostName isEqualToString:_hostName]");
//		[[UIApplication sharedApplication] openURL:request.URL];
//		return false;
		return true;
		
	//	at this point it's probably just another path in our app
	}
    else
    {
		NSLog(@"    else");
		return true;
	}
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidFinishLoad");
	//[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"tvro://sat-finder"]]];
}

- (void)webViewDidStartLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidStartLoad");
	NSString* satFinderAvailable = [SatFinderViewController satFinderAvailable] ? @"true" : @"false";
	NSString* javascriptString = [NSString stringWithFormat:@"var TVRO = { shell: true, satFinder: %@ };", satFinderAvailable];
	[webView stringByEvaluatingJavaScriptFromString:javascriptString];
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

@end