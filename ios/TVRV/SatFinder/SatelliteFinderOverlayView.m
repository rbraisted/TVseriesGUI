//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteFinderOverlayView.h"
#import <QuartzCore/QuartzCore.h>
#import "SatelliteViewCrosshairView.h"

//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
@implementation SatelliteFinderOverlayView

//=========================================================================================================================================================
#pragma mark - UIView Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
  if (IS_IPAD) self = [super initWithFrame:CGRectMake(0, 0, 768, 1024)];
  else self = [super initWithFrame:CGRectMake(0, 0, 320, 480)];

  if (self) {

		crosshairView = [[SatelliteViewCrosshairView alloc] init];
		[self addSubview:crosshairView];

		UIView* whiteStrip;
    if (IS_IPAD) whiteStrip = [[UIView alloc] initWithFrame:CGRectMake(0.0, 918.0, 768.0, 50.0)];
    else whiteStrip = [[UIView alloc] initWithFrame:CGRectMake(0.0, 363.0, 320.0, 45.0)];
		[whiteStrip setOpaque:NO];
		[whiteStrip setBackgroundColor:[UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.5]];
		[self addSubview:whiteStrip];
		// [whiteStrip release];
		
		UIImageView* v = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_horizontal_axis.png"]];
		CGAffineTransform rotationTransform = CGAffineTransformMakeRotation(1.57079633);
		[v setTransform:rotationTransform];
		if (IS_IPAD) [v setFrame:CGRectMake(20.0, 0.0, 8.0, 1024.0)];
    else [v setFrame:CGRectMake(14.0, 0.0, 7.0, 426.0)];
		[self addSubview:v];
		// [v release];
		
		UIImageView* h = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_horizontal_axis.png"]];
    if (IS_IPAD) [h setFrame:CGRectMake(0.0, 966.0, 768.0, 8.0)];
		else [h setFrame:CGRectMake(0.0, 405.0, 320.0, 7.0)];
		[self addSubview:h];
		// [h release];

		vertical = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"vertical_nu.png"]];		
		[self addSubview:vertical];
		
		horizontal1 = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"horizontal_nu.png"]];
		[self addSubview:horizontal1];
		
		horizontal2 = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"horizontal2_nu.png"]];
		[self addSubview:horizontal2];
		
		UIImageView* bottomTriangle = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_triangle_guide.png"]];
		if (IS_IPAD) [bottomTriangle setFrame:CGRectMake(366.0, 958.0, 36.0, 24.0)];
    else [bottomTriangle setFrame:CGRectMake(149.5, 400.0, 21.0, 15.0)];
		[self addSubview:bottomTriangle];
		// [bottomTriangle release];
		
		UIImageView* leftTriangle = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_triangle_guide.png"]];
		[leftTriangle setTransform:rotationTransform];
		if (IS_IPAD) [leftTriangle setFrame:CGRectMake(15.0, 494.0, 24.0, 36.0)];
    else [leftTriangle setFrame:CGRectMake(10.0, 202.5, 15.0, 21.0)];
		[self addSubview:leftTriangle];
		// [leftTriangle release];
		
		UIImageView* eleLabel = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_label_elevation.png"]];
		if (IS_IPAD) [eleLabel setFrame:CGRectMake(2.0, 10.0, 17.0, 81.0)];// note: x + 1
    else [eleLabel setFrame:CGRectMake(1.0, 0.0, 14.0, 63.0)];// note: x + 1
		[self addSubview:eleLabel];
		// [eleLabel release];

		UIImageView* aziLabel = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_label_azimuth.png"]];
		if (IS_IPAD) [aziLabel setFrame:CGRectMake(690.0, 975.0, 64.0, 17.0)];// note: y - 2
    else [aziLabel setFrame:CGRectMake(270.0, 410.0, 50.0, 14.0)];// note: y - 2
		[self addSubview:aziLabel];
		// [aziLabel release];

    //  a cheap hack to deal with tall iphones
    //  we just cover up parts of the overlay view that stick out further than
    //  they should on a 568px tall phone
    if (!IS_IPAD) {
      UIView* blocker = [[UIView alloc] initWithFrame:CGRectMake(0, 480, 320, 88)];
      [blocker setBackgroundColor:[UIColor blackColor]];
      [self addSubview:blocker];      
    }
		
		satelliteViews = [[NSMutableDictionary alloc] init];        
  }

  return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)updateAzimuthLabel:(double)azimuth {
	[self updateHorizontalDisplay:azimuth];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)updateElevationLabel:(double)elevation {
	[self updateVerticalDisplay:elevation];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)updateHorizontalDisplay:(double)heading {
	double scale;
  if (IS_IPAD) scale = (768.0/hfov);
  else scale = (320.0/45.0);
	double heading_scaled;// = (heading * scale);

	if (heading < 180.0) {
		heading_scaled = (-heading) * scale;
    if (IS_IPAD) {
      [horizontal1 setFrame:CGRectMake(heading_scaled - 1515.0, 923.0, 4044.0, 50.0)];
      [horizontal2 setFrame:CGRectMake(heading_scaled + 2529.0, 923.0, 4044.0, 50.0)];
    } else {
  		[horizontal1 setFrame:CGRectMake(heading_scaled - 480.0, 362.0, 1281.0, 50.0)];
  		[horizontal2 setFrame:CGRectMake(heading_scaled + 800.0, 362.0, 1281.0, 50.0)];      
    }
	} else {
    heading_scaled = (360.0 - heading) * scale;
    if (IS_IPAD) {
      [horizontal1 setFrame:CGRectMake(heading_scaled - 1515.0, 923.0, 4044.0, 50.0)];
      [horizontal2 setFrame:CGRectMake(heading_scaled - 5560.0, 923.0, 4044.0, 50.0)];
    } else {
  		[horizontal1 setFrame:CGRectMake(heading_scaled - 480.0, 362.0, 1281.0, 50.0)];
  		[horizontal2 setFrame:CGRectMake(heading_scaled - 1760.0, 362.0, 1281.0, 50.0)];    
    }
	}	
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)updateVerticalDisplay:(double)tilt {
  if (IS_IPAD) {
    double scale = (1024.0/vfov);
    double offset = 512.0 - (tilt * scale);
    [vertical setFrame:CGRectMake(20.0, offset - 2073.0, 32.0, 4164.0)];  
  } else {
  	double scale = (426.0/hfov);
  	double offset = 240.0 - (tilt * scale);
  	[vertical setFrame:CGRectMake(15.0, offset - 999.0, 30.0, 2000.0)];	    
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)updateViewForSatelliteWithName:(NSString*)satelliteName AtX:(double)x andY:(double)y withType:(int)type {    
	if (!satelliteName) return;
	
  SatelliteView* satelliteView = [satelliteViews objectForKey:satelliteName];
	if (!satelliteView) {
    // oh no, satview for sat with that name doesnt exist! make it and add it...
		satelliteView = [[SatelliteView alloc] initWithType:type];
		[satelliteView setSatelliteName:satelliteName];
		[self insertSubview:satelliteView belowSubview:crosshairView];
		[satelliteViews setObject:satelliteView forKey:satelliteName];
	} else if ([satelliteView isHidden]) {
    [satelliteView setHidden:NO];
  }

	[satelliteView setFrame:CGRectMake(x - (satelliteView.frame.size.width/2), y - (satelliteView.frame.size.height/2), satelliteView.frame.size.width, satelliteView.frame.size.height)];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)hideViewForSatelliteWithName:(NSString*)satelliteName {
	if (!satelliteName) return;

  SatelliteView* satelliteView = [satelliteViews objectForKey:satelliteName];

	if (!satelliteView) return;
  else [satelliteView setHidden:YES];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)setClosestSatellite:(NSString*)satelliteName {
	NSEnumerator *enumerator = [satelliteViews keyEnumerator];
	id key;
	while ((key = [enumerator nextObject])) {
		SatelliteView* satelliteView = [satelliteViews objectForKey:key];
		[satelliteView setClosest:NO];
		[satelliteView setNeedsDisplay];
	}

	SatelliteView* closestSatelliteView = [satelliteViews objectForKey:satelliteName];
	if (closestSatelliteView) {
		[closestSatelliteView removeFromSuperview];
		[self insertSubview:closestSatelliteView belowSubview:crosshairView];
		[closestSatelliteView setClosest:TRUE];
		[closestSatelliteView setNeedsDisplay];
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)setCrosshairState:(int)state {
	[crosshairView setState:state];
	[crosshairView setNeedsDisplay];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)clearSatelliteViews {
	for(NSString *satelliteName in satelliteViews) {
		SatelliteView* satelliteView = [satelliteViews objectForKey:satelliteName];
		if (satelliteView) {
			if (satelliteView.superview) [satelliteView removeFromSuperview];
		}
	}
  
	[satelliteViews removeAllObjects];
}

@end