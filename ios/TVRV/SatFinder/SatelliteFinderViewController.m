//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteFinderViewController.h"
#import "SatelliteFinderInfoView.h"
#import "Satellite.h"

@implementation SatelliteFinderViewController

//=========================================================================================================================================================
#pragma mark -
#pragma mark SatelliteFinderViewController Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude {
  //  these guys are set whenever our current location is updated
  double drLatDeg = deviceLat;
  double drLongDeg = deviceLon;
    
  double drLongDegSat = satelliteLongitude;
  double drLongRadSat = degreesToRadians(drLongDegSat);
    
  double drAzimuth,
         drElevation,
         drDelta,
         drLatRad,
         drLongRad,
         drY;
    
  double drCosDelta,
         drCosLat,
         drSinLat,
         drAbsDelta;
  
  double  drA = 0.15127;
  
  /* Convert degrees to radians */
  drLatRad  = degreesToRadians(drLatDeg);
  drLongRad = degreesToRadians(drLongDeg);

  drCosLat   = cos(drLatRad);
  drSinLat   = sin(drLatRad);
  
  drDelta = drLongRad - drLongRadSat;
  drAbsDelta = fabs(drDelta);
  drCosDelta = cos(drAbsDelta);

  drY = acos(drCosLat * drCosDelta);

  /* Compute azimuth */
  if (drDelta > 0.0)  {
    drAzimuth = M_PI + atan2(tan(drAbsDelta),drSinLat);
  } else  {
    drAzimuth = M_PI - atan2(tan(drAbsDelta),drSinLat);
  }

  drAzimuth = radiansToDegrees(drAzimuth);
  drAzimuth += (180.0 < drAzimuth) ? -360.0 : 0.0;
  
  /* Compute elevation */
  drElevation = atan2(cos(drY) - drA, sin(drY));

  drElevation = radiansToDegrees(drElevation);
  
  // now, rElevation and rAzimuth are correct.  use them to place the satellite.
  return [NSArray arrayWithObjects:[NSNumber numberWithDouble:drAzimuth], [NSNumber numberWithDouble:drElevation], nil];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
+ (BOOL)available {
  if ([CLLocationManager respondsToSelector:@selector(headingAvailable)]) {
    if ([CLLocationManager headingAvailable]) {
      NSArray *videoDevices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
      if ([videoDevices count]) return true;
    }
  }
  
  return false;
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (IBAction)infoButtonPressed:(id)sender {
	[infoView setHidden:!infoView.hidden];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (IBAction)backButtonPressed:(id)sender {
	[self dismissModalViewControllerAnimated:NO];
	showPicker = true;
	// [APPDEL hideSatelliteFinder];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth {
  satelliteAzimuth += (0.0 > satelliteAzimuth) ? 360.0 : 0.0; 

	double leftBound = deviceHeading - (hfov/2.0);
	double rightBound = deviceHeading + (hfov/2.0);

	double positionAtBoundScale;
	if (leftBound > rightBound)	{
		if (satelliteAzimuth <= rightBound) {
      positionAtBoundScale = ((360.0 - leftBound) + satelliteAzimuth)/hfov;
    } else if (satelliteAzimuth >= leftBound) {
      positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
		}
		else return NAN;
	} else {
    if ((satelliteAzimuth > leftBound) && (satelliteAzimuth < rightBound)) positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
		else return NAN;
	}
	double x = camviewwidth * positionAtBoundScale;
	return x;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)offscreenXPositionForSatelliteWithAzimuth:(double)satelliteAzimuth {
	double leftBound = deviceHeading - (hfov/2.0);
	double rightBound = deviceHeading + (hfov/2.0);
	double invisibleBoundsDiff = (360.0 - hfov);
	double positionAtBoundScale;

	if (leftBound > rightBound)	{
		if (satelliteAzimuth >= (leftBound - (invisibleBoundsDiff/2.0))) {
			// it's to the left
			positionAtBoundScale = (leftBound - satelliteAzimuth)/hfov;
			return (0.0 - (camviewwidth * positionAtBoundScale));
		} else {
			// it's to the right
			positionAtBoundScale = (satelliteAzimuth - rightBound)/hfov;
			return (camviewwidth + (camviewwidth * positionAtBoundScale));
		}

	} else {
		if (satelliteAzimuth <= leftBound) {
			// it's to the left
			positionAtBoundScale = (leftBound - satelliteAzimuth)/hfov;
			return (0.0 - (camviewwidth * positionAtBoundScale));
		} else if (satelliteAzimuth >= (rightBound + (invisibleBoundsDiff/2.0))) {
			// it's to the left
			positionAtBoundScale = ((360.0 - satelliteAzimuth) + leftBound)/hfov;
			return (0.0 - (camviewwidth * positionAtBoundScale));
		} else {
			// it's to the right
			positionAtBoundScale = (satelliteAzimuth - rightBound)/hfov;
			return (camviewwidth + (camviewwidth * positionAtBoundScale));
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)yPositionForSatelliteWithElevation:(double)satelliteElevation {
	double topBound = deviceTilt + (vfov/2.0);
	double bottomBound = deviceTilt - (vfov/2.0);

  if ((satelliteElevation > bottomBound) && (satelliteElevation < topBound)) {
    double boundDiff = topBound - bottomBound;
    double positionAtBoundScale = (satelliteElevation - bottomBound)/boundDiff;
    double y = camviewheight - (camviewheight * positionAtBoundScale);
    return y;
  } else {
    return NAN;
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)offscreenYPositionForSatelliteWithElevation:(double)satelliteElevation {
	double topBound = deviceTilt + (vfov/2.0);
	double bottomBound = deviceTilt - (vfov/2.0);
	
	double boundDiff = topBound - bottomBound;
	double positionAtBoundScale;
	double y;
	
	if (satelliteElevation <= bottomBound) {
		positionAtBoundScale = (bottomBound - satelliteElevation)/boundDiff;
		y = camviewheight + (camviewheight * positionAtBoundScale);
	} else if (satelliteElevation >= topBound) {
		positionAtBoundScale = (satelliteElevation - topBound)/boundDiff;
		y = 0.0 - (camviewheight * positionAtBoundScale);
	}

	return y;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)timerAction {
	[overlayView updateAzimuthLabel:deviceHeading];
	[overlayView updateElevationLabel:deviceTilt];
  [self drawClarkeBelt];
	[self drawSatList];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)setSatList:(NSArray*)_satList {
	if (satList != nil) satList = nil;
	satList = _satList;
	[overlayView clearSatelliteViews];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawSatList {
	int k = [satList count];

	//	distance of the closest sat
	NSString* closest = nil;
	float closestD = 100000.0;
	BOOL satellitesVisible = NO;
	
	//	for calculating directions
	float offscreenClosestD = 100000.0;
	float offscreenClosestX = 0.0;
	float offscreenClosestY = 0.0;
	
	while (k--) {
		Satellite* satellite = (Satellite*)[satList objectAtIndex:k];
		NSNumber* satelliteLongitude = [NSNumber numberWithFloat:satellite.degLon];

    if (satelliteLongitude) {
		  NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:[satelliteLongitude doubleValue]];
		  if (satelliteAzimuthAndElevation) {
        double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
			  double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
        double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
        double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
		
        if (0.0 < satelliteElevation) {
  	   		if (isNaN(x) || isNaN(y)) {
  				//	satellite is offscreen. hide it.
  				[overlayView hideViewForSatelliteWithName:satellite.antSatID];

  	   			//	if we already have a visible satellite, do not calculate direction/distance of offscreen satellite.
    				if (satellitesVisible) {
              continue;

            } else {
    					//	if we have no visible satellites yet, go ahead and calculate the distance and offscreen x & y
    					if (isNaN(x)) x = [self offscreenXPositionForSatelliteWithAzimuth:satelliteAzimuth];
    					if (isNaN(y)) y = [self offscreenYPositionForSatelliteWithElevation:satelliteElevation];

    					//	get distance. if no visible satellites still, 
    					float x1 = 160.0;
    					float y1 = 213.0;
    					float x2 = x;
    					float y2 = y;
    					float dx = (x2 - x1);
    					float dy = (y2 - y1);
    					float d = sqrt(dx*dx + dy*dy);

    					if (d < offscreenClosestD) {
    						offscreenClosestD = d;
    						offscreenClosestX = x;
    						offscreenClosestY = y;
    					}
    				}

  		  		continue;
  		    } else {

    				// if ([satellite.antSatID isEqualToString:APPDEL.connectedSatellite.antSatID]) [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:4];
    				// else if (satellite.favorite && satellite.enabled)                            [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:1];
            if (satellite.favorite && satellite.enabled)       [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:1];
    				else if (satellite.enabled && !satellite.favorite) [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:2];
    				else if (satellite.favorite && !satellite.enabled) [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:3];
    				else continue;

    				satellitesVisible = YES;

    				//	get distance
    				float x1 = 160.0;
    				float y1 = 213.0;
    				float x2 = x;
    				float y2 = y;
    				float dx = (x2 - x1);
    				float dy = (y2 - y1);
    				float d = sqrt(dx*dx + dy*dy);

    				if (d < closestD) {
    					closestD = d;
    					closest = satellite.antSatID;
    				}
    			}
        }
      } else continue;
    } else continue;
	}
	
	//	set closest if sats visible
	if (closest != nil) {
		[overlayView setClosestSatellite:closest];
	} else {
		[overlayView setClosestSatellite:@""];
	}
	
	//	set crosshair direction
	if (satellitesVisible) {
		[overlayView setCrosshairState:0];

  //  satellites are not visible, so set the overlayView crosshair to point in the proper direction
  //  check left/right
	} else {
    //  ON YOUR LEFT
		if (offscreenClosestX < 160.0) {
      //  LOWER LEFT
			if (offscreenClosestY > 213.0) {
				/*LEFT*/if (fabsf(160.0 - offscreenClosestX) > fabsf(offscreenClosestY - 213.0)) [overlayView setCrosshairState:3];
				/*DOWN*/else [overlayView setCrosshairState:4];

      //  UPPER LEFT
			} else {
				/*LEFT*/if (fabsf(160.0 - offscreenClosestX) > fabsf(213.0 - offscreenClosestY)) [overlayView setCrosshairState:3];
				/**UP**/else [overlayView setCrosshairState:1];
			}

    //  ON YOUR RIGHT
		} else {
      //  LOWER RIGHT
			if (offscreenClosestY > 213.0) {
				/*RIGHT*/if (fabsf(offscreenClosestX - 160.0) > fabsf(offscreenClosestY - 213.0)) [overlayView setCrosshairState:2];
				/*DOWN**/else [overlayView setCrosshairState:4];

      //  UPPER RIGHT
			} else {//	somewhere up right ...
				/*RIGHT*/if (fabsf(offscreenClosestX - 160.0) > fabsf(213.0 - offscreenClosestY)) [overlayView setCrosshairState:2];
				/**UP***/else [overlayView setCrosshairState:1];
			}
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawClarkeBelt {
	// enumerate through satellites
  NSString* satelliteName;
  NSEnumerator *enumerator = [satelliteLongitudes keyEnumerator];
  while ((satelliteName = [enumerator nextObject])) {
    NSNumber* satelliteLongitude = [satelliteLongitudes valueForKey:satelliteName];
    if (satelliteLongitude) {
      // use jacob's alg to calc azimuth & elevation of satellite
  		NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:[satelliteLongitude doubleValue]];
  		if (satelliteAzimuthAndElevation) {
        double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
  			double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
        double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
        double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
        if (satelliteElevation>0.0) {
  				if (isNaN(x) || isNaN(y)) {
						[overlayView hideViewForSatelliteWithName:satelliteName];
						continue;
					} else {
						// NSLog(@"IMMA DRAWING! %@", satelliteLongitude);
						// NSLog(@"lat: %f", deviceLat);
						// NSLog(@"lon: %f", deviceLon);
						// NSLog(@"hdg: %f", deviceHeading);
						// NSLog(@"tlt: %f", deviceTilt);
						// NSLog(@"ele: %f", satelliteAzimuth);
						// NSLog(@"azi: %f", satelliteElevation);
						// NSLog(@"  x: %f", x);
						// NSLog(@"  y: %f", y);
						[overlayView updateViewForSatelliteWithName:satelliteName AtX:x andY:y withType:0];
					}
        }
      } else continue;
    } else continue;                                                                     
  }
}

//=========================================================================================================================================================
#pragma mark -
#pragma mark UIViewController Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
  NSLog(@":: init 1");
  self = [super initWithNibName:NSStringFromClass([self class]) bundle:[NSBundle mainBundle]];
  if (self) {
    double accelerometerFrequency = (1.0 / 24.0);
    accelerometerFilter = [[LowpassFilter alloc] initWithSampleRate:accelerometerFrequency cutoffFrequency:5.0];
    [accelerometerFilter setAdaptive:YES];
   
    accelerometer = [UIAccelerometer sharedAccelerometer];
    [accelerometer setUpdateInterval:accelerometerFrequency];
    [accelerometer setDelegate:self];

    locationManager = [[CLLocationManager alloc] init];
    [locationManager setDelegate:self];
    [locationManager setDistanceFilter:kCLDistanceFilterNone];
    [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
    [locationManager setHeadingFilter:kCLHeadingFilterNone];
    [locationManager setPurpose:@"Satellite Finder needs your location to find satellites!"];  //  deprecated, we may still need for older ios versions
    [locationManager startUpdatingLocation];
    if ([CLLocationManager headingAvailable]) {
      [locationManager startUpdatingHeading];
    }
  }

  NSLog(@":: init 2");

  return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewDidLoad {
  NSLog(@":: viewDidLoad");
  showPicker = true;
    
  // in case i dont have net
  if (!deviceLat) deviceLat =  41.521705;
  if (!deviceLon) deviceLon = -71.298824;

	NSMutableDictionary* _satelliteLongitudes = [[NSMutableDictionary alloc] init];
	
	double d = -80.0;
	[_satelliteLongitudes setObject:[NSNumber numberWithDouble:d] forKey:[NSString stringWithFormat:@"%d-%@", abs((int)d), ((d<0) ? @"W" : @"E")]];

	satelliteLongitudes = (NSDictionary*)_satelliteLongitudes;

	if (overlayView == nil) overlayView = [[SatelliteFinderOverlayView alloc] init];	
	
	UIImageView* bottomBar = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"sf_enabled_favorite_selected_bar.png"]];
	[bottomBar setFrame:CGRectMake(0.0, 426.0, 320.0, 54.0)];
	[overlayView addSubview:bottomBar];
	// [bottomBar release];
	
	backButton = [UIButton buttonWithType:UIButtonTypeCustom];
	[backButton setImage:[UIImage imageNamed:@"sf_back_button.png"] forState:UIControlStateNormal];
	[backButton addTarget:self action:@selector(backButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
	[backButton setFrame:CGRectMake(247.0, 10.0, 63.0, 32.0)];
	[overlayView addSubview:backButton];
	
	infoButton = [UIButton buttonWithType:UIButtonTypeCustom];
	[infoButton setImage:[UIImage imageNamed:@"sf_info_button.png"] forState:UIControlStateNormal];
	[infoButton addTarget:self action:@selector(infoButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
	[infoButton setFrame:CGRectMake(194.0, 10.0, 38.0, 32.0)];
	[overlayView addSubview:infoButton];

	// demoButton = [UIButton buttonWithType:UIButtonTypeCustom];
	// [demoButton setImage:[UIImage imageNamed:@"sf_demo_button.png"] forState:UIControlStateNormal];
	// [demoButton setFrame:CGRectMake(113.0, 12.0, 66.0, 34.0)];
	// [overlayView addSubview:demoButton];

	infoView = [[SatelliteFinderInfoView alloc] init];
	[overlayView addSubview:infoView];
		
  if (timer == nil) {
    timer = [NSTimer timerWithTimeInterval:(1.0 / 5.0) target:self selector:@selector(timerAction) userInfo:nil repeats:YES];
    [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
  }
    
	[super viewDidLoad];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewWillAppear:(BOOL)animated {  
  NSLog(@":: viewWillAppear");
  [locationManager startUpdatingLocation];
  if ([CLLocationManager headingAvailable]) [locationManager startUpdatingHeading];
  
  // [demoButton setHidden:!APPDEL.demoMode];

  if ([[NSUserDefaults standardUserDefaults] boolForKey:@"satFinderInfoShown"]) {
    [infoView setHidden:YES];
  } else {
    [[NSUserDefaults standardUserDefaults] setBool:TRUE forKey:@"satFinderInfoShown"];
    [infoView setHidden:NO];
  } 
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewDidAppear:(BOOL)animated {
  NSLog(@":: viewDidAppear");
  
  //  show the camera!
  if (showPicker) {
    if (picker == nil) picker = [[UIImagePickerController alloc] init];    
    [picker setSourceType:UIImagePickerControllerSourceTypeCamera]; // << choose camera
    [picker setShowsCameraControls:NO];
    [picker setNavigationBarHidden:YES];
    [picker setWantsFullScreenLayout:YES];
    [picker setCameraOverlayView:overlayView];
    [self presentModalViewController:picker animated:NO];
    showPicker = false;
  }
}

//=========================================================================================================================================================
#pragma mark -
#pragma mark CLLocationManager Delegate Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation {
  // NSLog(@":: locationManager didUpdateToLocation");
  deviceLat = newLocation.coordinate.latitude;
  deviceLon = newLocation.coordinate.longitude;
  if (deviceLat == 0.0) deviceLat = 0.000001;
  if (deviceLon == 0.0) deviceLon = 0.000001;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)locationManager:(CLLocationManager*)manager didUpdateHeading:(CLHeading*)newHeading {
  // NSLog(@":: locationManager didUpdateHeading");
  if (0 < newHeading.headingAccuracy) {
		if (deviceTilt > 45.0)	deviceHeading = fabsf(newHeading.trueHeading - 180.0);
		else deviceHeading = newHeading.trueHeading;
  } else {
    deviceHeading = -999.0;
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager {
  // NSLog(@":: locationManagerShouldDisplayHeadingCalibration");
	[manager dismissHeadingCalibrationDisplay];
  return NO;
}


//=========================================================================================================================================================
#pragma mark -
#pragma mark UIAccelerometer Delegate Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:(UIAcceleration *)acceleration {
  // NSLog(@":: accelerometer didAccelerate");
  [accelerometerFilter addAcceleration:acceleration];
  double y = accelerometerFilter.y;
	double z = accelerometerFilter.z;    
	deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
}

@end