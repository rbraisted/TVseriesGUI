//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <AVFoundation/AVFoundation.h>
#import "AccelerometerFilter.h"
#import "SatelliteFinderOverlayView.h"

@class SatelliteFinderInfoView;


@interface SatelliteFinderViewController : UIViewController <CLLocationManagerDelegate, UIAccelerometerDelegate, NSURLConnectionDelegate>
{
    UIButton*	infoButton;
    UIButton*	backButton;
    
    NSTimer *timer;// our display update timer.
    
    SatelliteFinderOverlayView* overlayView;// over lay view displaying sats, meters
    SatelliteFinderInfoView*    infoView;	  // info view, trigger by infoButton
    
    NSMutableArray*  satList;
    NSDictionary*    satelliteLongitudes; // << as key->value satellitename->satellitelongitude
    
    UIImagePickerController* picker;
    BOOL showPicker;
    
    double deviceLat;
    double deviceLon;
    double deviceTilt;
    float  deviceHeading;
    
    CLLocationManager* locationManager;
    //UIAccelerometer*   accelerometer;
    CMMotionManager *motionManager;
    LowpassFilter*     accelerometerFilter;
    
    NSURLConnection* connection;
    NSMutableData*   xmlData;
}

@property BOOL isRotate;

+ (BOOL)available;

- (void)getSatListFromHostname:(NSString*)hostname;
- (void)getAntennaStatusFromHostname:(NSString*)hostname;
- (void)getSatListFromBundle;
- (void)timerAction;
- (void)drawSatList;
- (void)drawClarkeBelt;

- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth;
- (double)offscreenXPositionForSatelliteWithAzimuth:(double)satelliteAzimuth;
- (double)yPositionForSatelliteWithElevation:(double)satelliteElevation;
- (double)offscreenYPositionForSatelliteWithElevation:(double)satelliteElevation;

- (IBAction)infoButtonPressed:(id)sender;
- (IBAction)backButtonPressed:(id)sender;

- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude;

@end
