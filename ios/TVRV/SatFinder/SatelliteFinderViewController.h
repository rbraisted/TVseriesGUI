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

@interface SatelliteFinderViewController : UIViewController <CLLocationManagerDelegate, UIAccelerometerDelegate> {
	// UIButton*	demoButton;
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
  UIAccelerometer*   accelerometer;
  LowpassFilter*     accelerometerFilter;
}

+ (BOOL)available;

- (IBAction)infoButtonPressed:(id)sender;
- (IBAction)backButtonPressed:(id)sender;

- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude;

- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth;
- (double)offscreenXPositionForSatelliteWithAzimuth:(double)satelliteAzimuth;

- (double)yPositionForSatelliteWithElevation:(double)satelliteElevation;
- (double)offscreenYPositionForSatelliteWithElevation:(double)satelliteElevation;

- (void)timerAction;

- (void)drawSatList;
- (void)drawClarkeBelt;

@end