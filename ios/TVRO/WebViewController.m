/*       *\

    ^3^

\*       */

#import "WebViewController.h"
#import "UpdatesManager.h"

@interface WebViewController ()

@end

@implementation WebViewController

#pragma mark - WebViewController methods

- (id)initWithHostName:(NSString*)_hostName {
	self = [self init];
	hostName = _hostName;
	return self;
}

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
	NSLog(@" ");
	NSLog(@"webView shouldStartLoadWithRequest:%@ navigationType:%d", request, navigationType);

	//	we should check for:
	//	1 our hostname, for which we always return yes
	//	2 software updates (urls which end in the file ext .kvh), for which we always return no & and then take over the downloading process
	//	3 pdfs, which we open with hostname/pdf-frame.php
	//	4 anything besides those, for which we should always return no and then open in safari app instead
	NSString* _hostName = [NSString stringWithFormat:@"%@", request.URL.host];
	if (request.URL.port) _hostName = [NSString stringWithFormat:@"%@:%@", _hostName, request.URL.port];
	
	NSLog(@"_hostName: %@", _hostName);
	NSLog(@"webView.request: %@", webView.request);
	NSLog(@"webView.request.URL.lastPathComponent: %@", webView.request.URL.lastPathComponent);
	
	if ([request.URL.pathExtension isEqualToString:@"kvh"]) {
		NSLog(@"request.URL.pathExtension isEqualToString:@\"kvh\"");
		[updatesManager startDownloadFromURL:request.URL];
		return false;
	} else if ([request.URL.pathExtension isEqualToString:@"pdf"]) {
		NSLog(@"request.URL.pathExtension isEqualToString:@\"pdf\"");
		if (![webView.request.URL.lastPathComponent isEqualToString:@"pdf-frame.php"]) {
			[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/pdf-frame.php?src=%@", hostName, request.URL]]]];
		}
		return false;
	} else if (![hostName isEqualToString:_hostName]) {
		NSLog(@"![hostName isEqualToString:_hostName]");
//		[[UIApplication sharedApplication] openURL:request.URL];
//		return false;
		return true;
	} else {
		NSLog(@"else");
		return true;
	}
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView {
//	NSLog(@"webViewDidFinishLoad");
}

- (void)webViewDidStartLoad:(UIWebView *)_webView {
//	NSLog(@"webViewDidStartLoad");
}

@end