/*       *\

    ^3^

\*       */

#import "SatFinderViewController.h"

@interface SatFinderViewController ()

@end

@implementation SatFinderViewController

#pragma mark - UIViewController methods

- (void)viewDidLoad {
	[super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
	[super viewWillAppear:animated];
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - SatFinderViewController methods

+ (BOOL)satFinderAvailable {
	//	satellite finder should only be available is the device has a camera & can get compass readings
	//	accelerometer should only be available if the sat finder is
    if([CLLocationManager respondsToSelector:@selector(headingAvailable)]) {
        if([CLLocationManager headingAvailable]) {
            NSArray *videoDevices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
            if([videoDevices count]) {
				return true;
				
				//	set up satellite finder button
//				[satelliteFinderButton setFrame:CGRectMake(258.0, 20.0, 62.0, 42.0)];
//				[self.tabBarController.view addSubview:satelliteFinderButton];
				//	set up accelerometer... we dont need it if we dont have the sat finder
//				double accelerometerFrequency = (1.0 / 24.0);
				//	accelerometer & filter
//				if(accelerometerFilter == nil) {
//					accelerometerFilter = [[LowpassFilter alloc] initWithSampleRate:accelerometerFrequency cutoffFrequency:5.0];
//					[accelerometerFilter setAdaptive:YES];
//				}
//				if(accelerometer == nil) {
//					accelerometer = [UIAccelerometer sharedAccelerometer];
//					[accelerometer setUpdateInterval:accelerometerFrequency];
//					[accelerometer setDelegate:self];
//				}
			}
        }
    }
	
	//	location manager
//	if(locationManager == nil) {
//        locationManager = [[CLLocationManager alloc] init];
//        [locationManager setDelegate:self];
//        [locationManager setDistanceFilter:kCLDistanceFilterNone];
//        [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
//        [locationManager setHeadingFilter:kCLHeadingFilterNone];
////        [locationManager setPurpose:@"SatelliteFinder needs your location to find satellites!"];	//	deprecated
//        [locationManager startUpdatingLocation];
//        if([CLLocationManager headingAvailable]) [locationManager startUpdatingHeading];
//    }
	return false;
}

@end