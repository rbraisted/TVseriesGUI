/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import <AVFoundation/AVFoundation.h>

@interface SatFinderViewController : UIViewController <CLLocationManagerDelegate, UIAccelerometerDelegate> {
	CLLocationManager* locationManager;
}

+ (BOOL)satFinderAvailable;

@end