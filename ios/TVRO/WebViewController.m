/*       *\

    ^3^

\*       */

#import "WebViewController.h"
#import "UpdatesManager.h"

@interface WebViewController ()

@end

@implementation WebViewController

#pragma mark - UIViewController methods

- (void)viewDidLoad {
	webView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
	[webView setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
	[webView.scrollView setDelaysContentTouches:NO];
	[webView setDelegate:self];
	[self.view addSubview:webView];
	
	updatesManager = [[UpdatesManager alloc] init];
	
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
	if ([request.URL.scheme isEqualToString:@"tvro"]) {
		NSLog(@"    [request.URL.scheme isEqualToString:@\"tvro\"]");
		NSArray* pathComponents = [request.URL pathComponents];
		if([request.URL.host isEqualToString:@"updates"]) {
			if ([pathComponents[1] isEqualToString:@"device-versions"]) {
				NSString* tv1DeviceVersion = [updatesManager deviceVersionForAntType:@"tv1"];
				NSString* tv3DeviceVersion = [updatesManager deviceVersionForAntType:@"tv3"];
				NSString* tv5DeviceVersion = [updatesManager deviceVersionForAntType:@"tv5"];
				NSString* tv6DeviceVersion = [updatesManager deviceVersionForAntType:@"tv6"];
				NSLog(@"tv1DeviceVersion: %@", tv1DeviceVersion);
				NSLog(@"tv3DeviceVersion: %@", tv3DeviceVersion);
				NSLog(@"tv5DeviceVersion: %@", tv5DeviceVersion);
				NSLog(@"tv6DeviceVersion: %@", tv6DeviceVersion);
				NSString* javascriptString = [NSString stringWithFormat:@"window.tvro.updates.tv1.deviceVersion = '%@'; window.tvro.updates.tv3.deviceVersion = '%@'; window.tvro.updates.tv5.deviceVersion = '%@'; window.tvro.updates.tv6.deviceVersion = '%@'; window.tvro.updates.update();", tv1DeviceVersion, tv3DeviceVersion, tv5DeviceVersion, tv6DeviceVersion];
				NSLog(@"javascriptString: %@", javascriptString);
				[webView stringByEvaluatingJavaScriptFromString:javascriptString];
			} else if ([pathComponents[1] isEqualToString:@"download"]) {
				//	tvro://updates/download/antenna-type/portal-version/portal-url
				NSString* antType = [NSString stringWithString:pathComponents[2]];
				NSString* portalVersion = [NSString stringWithString:pathComponents[3]];
				NSString* portalUrl = [[pathComponents subarrayWithRange:NSMakeRange(4, [pathComponents count]-4)] componentsJoinedByString:@"/"];
				[updatesManager startDownloadForAntType:antType portalVersion:portalVersion portalUrl:[NSURL URLWithString:portalUrl]];
			} else if ([pathComponents[1] isEqualToString:@"install"]) {
//				NSString* antType = [NSString stringWithString:pathComponents[2]];
			}
		}
		return false;

	//	if we're being directed to a .pdf file, we're going to display it
	//	in some custom view that includes the pdf and a back button
	} else if ([request.URL.pathExtension isEqualToString:@"pdf"]) {
		NSLog(@"    request.URL.pathExtension isEqualToString:@\"pdf\"");
		if (![webView.request.URL.lastPathComponent isEqualToString:@"pdf-frame.php"]) {
			[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/pdf-frame.php?src=%@", hostName, request.URL]]]];
		}
		return false;
			
	//	check if it's coming from our bdu hostname
	//	if not, it's probably an external link and we
	//	should open it in safari
	} else if (![hostName isEqualToString:_hostName]) {
		NSLog(@"    ![hostName isEqualToString:_hostName]");
		[[UIApplication sharedApplication] openURL:request.URL];
		return false;
		
	//	at this point it's probably just another path in our app
	} else {
		NSLog(@"    else");
		return true;
	}
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView {
	NSLog(@"webViewDidFinishLoad");
	[webView stringByEvaluatingJavaScriptFromString:@"window.tvro.ios();"];
}

- (void)webViewDidStartLoad:(UIWebView *)_webView {
//	NSLog(@"webViewDidStartLoad");
}

#pragma mark - WebViewController methods

- (id)initWithHostName:(NSString*)_hostName {
	self = [self init];
	hostName = _hostName;
	return self;
}


@end