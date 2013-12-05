/*       *\
 
    ^3^
 
\*       */

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import <AVFoundation/AVFoundation.h>
#import "AccelerometerFilter.h"

@interface Sat : NSObject

@property (nonatomic) NSString* name;
@property (nonatomic) NSString* region;
@property (nonatomic) NSString* listId;
@property (nonatomic) NSString* antSatId;
@property (nonatomic) NSString* triSatId;
@property (nonatomic) float degLon;
@property (nonatomic) BOOL  favorite;
@property (nonatomic) BOOL  enabled;
@property (nonatomic) BOOL  selectable;

@end

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

@protocol SatFinderViewDelegate

@required

@property (nonatomic) double deviceLat;
@property (nonatomic) double deviceLon;
@property (nonatomic) double deviceTilt;
@property (nonatomic) float  deviceHeading;

@end

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

@interface SatFinderView : UIView {
	id delegate;
}

- (id)initWithDelegate:(id<SatFinderViewDelegate>)_delegate;

@end

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

@interface SatFinderViewController : UIViewController <CLLocationManagerDelegate, UIAccelerometerDelegate, SatFinderViewDelegate> {
	LowpassFilter* 		accelerometerFilter;
	UIAccelerometer* 	accelerometer;
	CLLocationManager* 	locationManager;
	NSMutableArray*		satList;
	
	double deviceLat;
	double deviceLon;
	double deviceTilt;
	float  deviceHeading;
}

+ (BOOL)satFinderAvailable;
- (id)initWithSatListXmlString:(NSString*)satListXmlString;

@end