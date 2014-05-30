
#import "SatFinderViewController.h"
#import "RXMLElement.h"

@implementation Sat

@synthesize name,
      			region,
      			listId,
      			antSatId,
      			triSatId,
      			lon,
      			favorite,
      			enabled,
      			selectable;

@end

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

@implementation SatFinderView

- (id)initWithDelegate:(id<SatFinderViewDelegate>)_delegate {
	self = [super initWithFrame:UIScreen.mainScreen.applicationFrame];
  [self setAutoresizingMask:UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
  [self setBackgroundColor:[UIColor redColor]];
	delegate = _delegate;
	return self;
}

- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude {
  //	these guys are set whenever our current location is updated
	double drLatDeg = [delegate deviceLat];
	double drLongDeg = [delegate deviceLon];
    
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

- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth {
  satelliteAzimuth += (0.0 > satelliteAzimuth) ? 360.0 : 0.0;
	
	//	we could store these values when deviceHeading changes
	double leftBound = [delegate deviceHeading] - (hfov/2.0);
	double rightBound = [delegate deviceHeading] + (hfov/2.0);
	
	double positionAtBoundScale;
	if (leftBound > rightBound)	{
		if (satelliteAzimuth <= rightBound) {
      positionAtBoundScale = ((360.0 - leftBound) + satelliteAzimuth)/hfov;
    } else if (satelliteAzimuth >= leftBound) {
      positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
    } else {
      return NAN;
    }

	} else {
    if ((satelliteAzimuth > leftBound) && (satelliteAzimuth < rightBound)){
      positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
    } else{
      return NAN;
    }
	}
	
	double x = camviewwidth * positionAtBoundScale;
	return x;
}

- (double)yPositionForSatelliteWithElevation:(double)satelliteElevation {
	//	we could store these values when deviceTilt changes
	//	including boundDiff
	double topBound = [delegate deviceTilt] + (vfov/2.0);
	double bottomBound = [delegate deviceTilt] - (vfov/2.0);
	
  if((satelliteElevation > bottomBound) && (satelliteElevation < topBound)) {
    double boundDiff = topBound - bottomBound;
    double positionAtBoundScale = (satelliteElevation - bottomBound)/boundDiff;
    double y = camviewheight - (camviewheight * positionAtBoundScale);
    return y;
  } else {
    return NAN;
  }
}

- (CGPoint)positionWithLon:(double)lon {
	double drLatDeg = [delegate deviceLat];
	double drLongDeg = [delegate deviceLon];
    
	double drLongDegSat = lon;
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
  
  double drA = 0.15127;
  
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
  // return NSArray with NSNumbers drAzimuth and drElevation as 0 and 1 indexes
  // // return [NSArray arrayWithObjects:[NSNumber numberWithDouble:drAzimuth], [NSNumber numberWithDouble:drElevation], nil];
	drAzimuth += (0.0 > drAzimuth) ? 360.0 : 0.0;
	
	//	get x
	double leftBound = [delegate deviceHeading] - (hfov/2.0);
	double rightBound = [delegate deviceHeading] + (hfov/2.0);
	
	double positionAtBoundScale;
	if (leftBound > rightBound)	{
		if (drAzimuth <= rightBound) {
      positionAtBoundScale = ((360.0 - leftBound) + drAzimuth)/hfov;
    } else if (drAzimuth >= leftBound) {
      positionAtBoundScale = (drAzimuth - leftBound)/hfov;
		} else {
			positionAtBoundScale = NAN;
		}

	} else {
    if ((drAzimuth > leftBound) && (drAzimuth < rightBound)) {
			positionAtBoundScale = (drAzimuth - leftBound)/hfov;
		} else {
			positionAtBoundScale = NAN;
		}
	}
	
	double x = camviewwidth * positionAtBoundScale;
	
	double topBound = [delegate deviceTilt] + (vfov/2.0);
	double bottomBound = [delegate deviceTilt] - (vfov/2.0);

	double y = NAN;
	
  if ((drElevation > bottomBound) && (drElevation < topBound)) {
    double boundDiff = topBound - bottomBound;
    double positionAtBoundScale = (drElevation - bottomBound)/boundDiff;
  	y = camviewheight - (camviewheight * positionAtBoundScale);
  }
	
	return CGPointMake(x, y);
}

- (void)drawClarkeBelt:(CGPoint)position withContext:(CGContextRef)context {
	CGRect rect = CGRectMake(position.x - 2.0, position.y - 2.0, 4.0, 4.0);
	[[UIColor yellowColor] set];
	CGContextFillEllipseInRect(context, rect);
	[[UIColor whiteColor] set];
	CGContextStrokeEllipseInRect(context, rect);
}

- (void)drawRect:(CGRect)rect {
	CGContextRef context = UIGraphicsGetCurrentContext();
	CGContextClearRect(context, self.bounds);
	
	//	draw the clarke belt
	double d = -180.0;
	while (d <= 180.0) {
//		CGPoint position = [self positionWithLon:d];
//		if (!isNaN(position.x) && isNaN(position.y)) {
//			NSLog(@"!");
////			[self drawClarkeBelt:position withContext:context];
//			CGRect rect = CGRectMake(position.x - 2.0, position.y - 2.0, 4.0, 4.0);
//			[[UIColor yellowColor] set];
//			CGContextFillEllipseInRect(context, rect);
//			[[UIColor whiteColor] set];
//			CGContextStrokeEllipseInRect(context, rect);
//		}
		NSArray* azimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:d];
		if (azimuthAndElevation) {
			double elevation = [[azimuthAndElevation objectAtIndex:1] doubleValue];
			if (elevation > 0.0) {
				double y = [self yPositionForSatelliteWithElevation:elevation];
				if (!isNaN(y)) {
					double azimuth = [[azimuthAndElevation objectAtIndex:0] doubleValue];
					double x = [self xPositionForSatelliteWithAzimuth:azimuth];
					if (!isNaN(x)) {
						CGRect rect = CGRectMake(x - 2.0, y - 2.0, 4.0, 4.0);
						[[UIColor yellowColor] set];
						CGContextFillEllipseInRect(context, rect);
						[[UIColor whiteColor] set];
						CGContextStrokeEllipseInRect(context, rect);
					}
				}
			}
		}
		d = d + 2.0;
	}
	
	//	draw the satellites
//	NSArray* satList = [delegate satList];
//	for (int i = 0; i < [satList count]; i++) {
//		Sat* sat = (Sat*)[satList objectAtIndex:i];
//   		NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:sat.lon];
//   		if (satelliteAzimuthAndElevation) {
//			double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
//			double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
//			double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
//			double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
//			if (satelliteElevation > 0.0 && !isNaN(x) && !isNaN(y)) {
//				CGRect rect = CGRectMake(x - 5.0, y - 5.0, 10.0, 10.0);
//				[[UIColor redColor] set];
//				CGContextFillEllipseInRect(context, rect);
//				[[UIColor whiteColor] set];
//				CGContextStrokeEllipseInRect(context, rect);
//			}
//		}
//	}
}

@end

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

@implementation SatFinderViewController

@synthesize deviceLat,
			      deviceLon,
			      deviceTilt,
			      deviceHeading,
			      satList;

// @dynamic view;

#pragma mark - UIViewController methods

- (id)init {
  NSLog(@"SatFinderViewController init");
  self = [super init];

  satFinderView = [[SatFinderView alloc] initWithDelegate:self];

  satList = [[NSMutableArray alloc] init];
  // RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];
  // [satListXml iterateWithRootXPath:@"//satellite" usingBlock: ^(RXMLElement *satElement) {
  //   Sat* sat = [[Sat alloc] init];
  //   [sat setName:[satElement child:@"name"].text];
  //   [sat setRegion:[satElement child:@"region"].text];
  //   [sat setListId:[satElement child:@"listID"].text];
  //   [sat setAntSatId:[satElement child:@"antSatID"].text];
  //   [sat setTriSatId:[satElement child:@"triSatID"].text];
  //   [sat setLon:[[satElement child:@"lon"].text floatValue]];
  //   [sat setFavorite:[[satElement child:@"favorite"].text boolValue]];
  //   [sat setEnabled:[[satElement child:@"enabled"].text boolValue]];
  //   [sat setSelectable:[[satElement child:@"select"].text boolValue]];
  //   [satList addObject:sat];
  // }];

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
  [locationManager setPurpose:@"SatelliteFinder needs your location to find satellites!"];  //  deprecated
  [locationManager startUpdatingLocation];
  if ([CLLocationManager headingAvailable]) {
    [locationManager startUpdatingHeading];
  }

  return self;
}

- (void)viewDidLoad {
  NSLog(@"SatFinderViewController viewDidLoad");
  [self.view addSubview:satFinderView];
  [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
  NSLog(@"SatFinderViewController viewWillAppear");
  [locationManager startUpdatingLocation];
  if ([CLLocationManager headingAvailable]) [locationManager startUpdatingHeading];
  [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated {
  NSLog(@"SatFinderViewController viewWillDisappear");  
	[locationManager stopUpdatingLocation];
  if ([CLLocationManager headingAvailable]) [locationManager stopUpdatingHeading];
  [super viewWillDisappear:animated];
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

#pragma mark - CLLocationManagerDelegate protocol methods

//2013-12-05 10:52:25.259 KVH TracVision HD-11[268:907] IMMA DRAWING! -80
//2013-12-05 10:52:25.261 KVH TracVision HD-11[268:907] lat: 34.043918
//2013-12-05 10:52:25.263 KVH TracVision HD-11[268:907] lon: -118.252480
//2013-12-05 10:52:25.264 KVH TracVision HD-11[268:907] hdg: 125.611473
//2013-12-05 10:52:25.266 KVH TracVision HD-11[268:907] tlt: 25.271421
//2013-12-05 10:52:25.267 KVH TracVision HD-11[268:907] ele: 125.377627
//2013-12-05 10:52:25.269 KVH TracVision HD-11[268:907] azi: 33.333587
//2013-12-05 10:52:25.269 KVH TracVision HD-11[268:907]   x: 158.105549
//2013-12-05 10:52:25.270 KVH TracVision HD-11[268:907]   y: 148.198437

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation {
	deviceLat = newLocation.coordinate.latitude;
	deviceLon = newLocation.coordinate.longitude;
  if (deviceLat == 0.0) deviceLat = 0.000001;
  if (deviceLon == 0.0) deviceLon = 0.000001;
	[satFinderView setNeedsDisplay];
}

- (void)locationManager:(CLLocationManager*)manager didUpdateHeading:(CLHeading*)newHeading {
  if (0 >= newHeading.headingAccuracy) deviceHeading = -999.0;
	else if (deviceTilt < 45.0) deviceHeading = newHeading.trueHeading;
	else deviceHeading = fabsf(newHeading.trueHeading - 180.0);
	[satFinderView setNeedsDisplay];
}

- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager {
	[manager dismissHeadingCalibrationDisplay];
  return NO;
}

#pragma mark - UIAccelerometerDelegate protocol methods

- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:(UIAcceleration *)acceleration {
  [accelerometerFilter addAcceleration:acceleration];
  double y = accelerometerFilter.y;
	double z = accelerometerFilter.z;
	deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
	[satFinderView setNeedsDisplay];
}

#pragma mark - SatFinderViewController methods

+ (BOOL)satFinderAvailable {
  //  SATFINDERDEBUG
  return true;
  if ([CLLocationManager respondsToSelector:@selector(headingAvailable)]) {
    if ([CLLocationManager headingAvailable]) {
      NSArray *videoDevices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
      if ([videoDevices count]) return true;
    }
  }
	
	return false;
}

// - (id)initWithSatListXmlString:(NSString*)satListXmlString {
// 	self = [self init];
	
// 	self.view = [[SatFinderView alloc] initWithDelegate:self];
	
// 	satList = [[NSMutableArray alloc] init];
// 	RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];
// 	[satListXml iterateWithRootXPath:@"//satellite" usingBlock: ^(RXMLElement *satElement) {
// 		Sat* sat = [[Sat alloc] init];
// 		[sat setName:[satElement child:@"name"].text];
// 		[sat setRegion:[satElement child:@"region"].text];
// 		[sat setListId:[satElement child:@"listID"].text];
// 		[sat setAntSatId:[satElement child:@"antSatID"].text];
// 		[sat setTriSatId:[satElement child:@"triSatID"].text];
// 		[sat setLon:[[satElement child:@"lon"].text floatValue]];
// 		[sat setFavorite:[[satElement child:@"favorite"].text boolValue]];
// 		[sat setEnabled:[[satElement child:@"enabled"].text boolValue]];
// 		[sat setSelectable:[[satElement child:@"select"].text boolValue]];
// 		[satList addObject:sat];
// 	}];
	
// 	NSLog(@"satList: %@", satList);
	
	// double accelerometerFrequency = (1.0 / 24.0);
 //  accelerometerFilter = [[LowpassFilter alloc] initWithSampleRate:accelerometerFrequency cutoffFrequency:5.0];
 //  [accelerometerFilter setAdaptive:YES];
 
 //  accelerometer = [UIAccelerometer sharedAccelerometer];
 //  [accelerometer setUpdateInterval:accelerometerFrequency];
 //  [accelerometer setDelegate:self];
 
 //  locationManager = [[CLLocationManager alloc] init];
 //  [locationManager setDelegate:self];
 //  [locationManager setDistanceFilter:kCLDistanceFilterNone];
 //  [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
 //  [locationManager setHeadingFilter:kCLHeadingFilterNone];
 //  [locationManager setPurpose:@"SatelliteFinder needs your location to find satellites!"];	//	deprecated
 //  [locationManager startUpdatingLocation];
 //  if ([CLLocationManager headingAvailable]) {
 //    [locationManager startUpdatingHeading];
 //  }
	
// 	return self;
// }

- (NSArray*)satList {
	return satList;
}

@end