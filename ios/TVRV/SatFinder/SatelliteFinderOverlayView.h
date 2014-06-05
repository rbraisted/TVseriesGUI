//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import <UIKit/UIKit.h>
#import "SatelliteView.h"

@class SatelliteViewCrosshairView;

@interface SatelliteFinderOverlayView : UIView {
	UIImageView*    vertical;
	UIImageView*    horizontal1;
	UIImageView*    horizontal2;
	
//	UILabel*		azimuthLabel;
//	UILabel*		elevationLabel;
	NSMutableDictionary* satelliteViews;
	
	SatelliteViewCrosshairView*	crosshairView;
}

- (void)updateAzimuthLabel:(double)azimuth;
- (void)updateElevationLabel:(double)elevation;

- (void)updateHorizontalDisplay:(double)heading;
- (void)updateVerticalDisplay:(double)tilt;

- (void)updateViewForSatelliteWithName:(NSString*)satelliteName AtX:(double)x andY:(double)y withType:(int)type;
- (void)hideViewForSatelliteWithName:(NSString*)satelliteName;
- (void)setClosestSatellite:(NSString*)satelliteName;
- (void)setCrosshairState:(int)state;
- (void)clearSatelliteViews;

@end