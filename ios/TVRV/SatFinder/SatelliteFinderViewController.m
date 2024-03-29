//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteFinderViewController.h"
#import "SatelliteFinderInfoView.h"
#import "Satellite.h"
#import "RXMLElement.h"

@interface CUIImagePickerController : UIImagePickerController

@end

@implementation CUIImagePickerController

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return NO;
}

- (BOOL)shouldAutorotate
{
    return NO;
}

#if __IPHONE_OS_VERSION_MAX_ALLOWED < 90000
- (NSUInteger)supportedInterfaceOrientations
#else
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
#endif
{
    return UIInterfaceOrientationMaskPortrait;
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
    return UIInterfaceOrientationPortrait;
}
@end

@implementation SatelliteFinderViewController

//=========================================================================================================================================================
#pragma mark -
#pragma mark SatelliteFinderViewController Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)getSatListFromBundle {
  //NSLog(@":: getSatListFromBundle");
  NSString* satListXmlString = [NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"satellites" ofType:@"xml"] encoding:NSUTF8StringEncoding error:NULL];
  [self getSatListFromXmlString:satListXmlString];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)getSatListFromHostname:(NSString*)hostname {
  //NSLog(@":: setHostname");
  if (connection) {
    [connection cancel];
    connection = nil;
  }
  
  if (xmlData) [xmlData setLength:0];
  else xmlData = [[NSMutableData alloc] init];

  NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/webservice.php", hostname]]];
  [request setHTTPMethod:@"POST"];
  [request setValue:@"application/xml; charset=utf-8" forHTTPHeaderField:@"Content-Type"];
  [request setHTTPBody:[@"<?xml version=\"1.0\" encoding=\"UTF-8\"?><ipacu_request><message name=\"get_autoswitch_status\"/></ipacu_request>" dataUsingEncoding:NSUTF8StringEncoding]];
  //NSLog(@":: request.HTTPBodyL %@", request.HTTPBody);

  connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
  [connection start];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)getSatListFromXmlString:(NSString*)satListXmlString
{
    //NSLog(@":: getSatListFromXmlString");
    [satList removeAllObjects];
    
    RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];
    RXMLElement* satElement = [satListXml child:@"satellites.A"];
    Satellite* satA = [[Satellite alloc] initWithListID:[satElement child:@"listID"].text withAntSatID:[satElement child:@"antSatID"].text withTriSatID:[satElement child:@"triSatID"].text withName:[satElement child:@"name"].text withRegion:[satElement child:@"region"].text withDegLon:[[satElement child:@"lon"].text floatValue] isFavorite:[[satElement child:@"favorite"].text boolValue] isEnabled:[[satElement child:@"enable"].text boolValue] isSelectable:[[satElement child:@"select"].text boolValue] isSelected:FALSE];
    [satList addObject:satA];
    
    satElement = [satListXml child:@"satellites.B"];
    Satellite* satB = [[Satellite alloc] initWithListID:[satElement child:@"listID"].text withAntSatID:[satElement child:@"antSatID"].text withTriSatID:[satElement child:@"triSatID"].text withName:[satElement child:@"name"].text withRegion:[satElement child:@"region"].text withDegLon:[[satElement child:@"lon"].text floatValue] isFavorite:[[satElement child:@"favorite"].text boolValue] isEnabled:[[satElement child:@"enable"].text boolValue] isSelectable:[[satElement child:@"select"].text boolValue] isSelected:FALSE];
    [satList addObject:satB];
    
    satElement = [satListXml child:@"satellites.C"];
    Satellite* satC = [[Satellite alloc] initWithListID:[satElement child:@"listID"].text withAntSatID:[satElement child:@"antSatID"].text withTriSatID:[satElement child:@"triSatID"].text withName:[satElement child:@"name"].text withRegion:[satElement child:@"region"].text withDegLon:[[satElement child:@"lon"].text floatValue] isFavorite:[[satElement child:@"favorite"].text boolValue] isEnabled:[[satElement child:@"enable"].text boolValue] isSelectable:[[satElement child:@"select"].text boolValue] isSelected:FALSE];
    [satList addObject:satC];
    
    satElement = [satListXml child:@"satellites.D"];
    Satellite* satD = [[Satellite alloc] initWithListID:[satElement child:@"listID"].text withAntSatID:[satElement child:@"antSatID"].text withTriSatID:[satElement child:@"triSatID"].text withName:[satElement child:@"name"].text withRegion:[satElement child:@"region"].text withDegLon:[[satElement child:@"lon"].text floatValue] isFavorite:[[satElement child:@"favorite"].text boolValue] isEnabled:[[satElement child:@"enable"].text boolValue] isSelectable:[[satElement child:@"select"].text boolValue] isSelected:FALSE];
    [satList addObject:satD];
    
    // find the selected satellite from antenna_status
    [self getAntennaStatusFromHostname:[[NSUserDefaults standardUserDefaults] objectForKey:@"default-host"]];
}

- (void)getAntennaStatusFromHostname:(NSString*)hostname
{
    //NSLog(@":: getAntennaStatusFromHostname");
    if (connection)
    {
        [connection cancel];
        connection = nil;
    }
    
    if (xmlData) [xmlData setLength:0];
    else xmlData = [[NSMutableData alloc] init];
    
    NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@/webservice.php", hostname]]];
    [request setHTTPMethod:@"POST"];// request.HTTPMethod = @"POST";
    [request setValue:@"application/xml; charset=utf-8" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPBody:[@"<?xml version=\"1.0\" encoding=\"UTF-8\"?><ipacu_request><message name=\"antenna_status\"/></ipacu_request>" dataUsingEncoding:NSUTF8StringEncoding]];
    //NSLog(@":: request.HTTPBodyL %@", request.HTTPBody);
    connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
    [connection start];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)getAntennaStatusFromXmlString:(NSString*)satListXmlString
{
    //NSLog(@":: getAntennaStatusFromXmlString");
    RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];
    RXMLElement* satElement = [satListXml child:@"satellite"];
    
    //NSString* selectedAntSatID = [[NSString alloc] init];
    NSString* selectedAntSatID = @"";
    selectedAntSatID = [satElement child:@"selected"].text;
    
    NSUInteger k = [satList count];
    while (k--) {
        Satellite* satellite = (Satellite*)[satList objectAtIndex:k];
        if ([satellite.antSatID isEqualToString:selectedAntSatID]) {
            satellite.selected = true;
        } else {
            satellite.selected = false;
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude {
  // NSLog(@":: azimuthAndElevationOfSatelliteAtLongitude");
  //  these guys are set whenever our current location is updated
  double drLatDeg = deviceLat; //23.04
  double drLongDeg = deviceLon; //72.50

  double drLongDegSat = satelliteLongitude; // 0
  double drLongRadSat = degreesToRadians(drLongDegSat); // 0
    
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
  drLatRad  = degreesToRadians(drLatDeg); // 0.402
  drLongRad = degreesToRadians(drLongDeg); // 1.265

  drCosLat   = cos(drLatRad); // 0.920
  drSinLat   = sin(drLatRad); // 0.391
  
  drDelta = drLongRad - drLongRadSat; // 1.265
  drAbsDelta = fabs(drDelta);// 1.265
  drCosDelta = cos(drAbsDelta);// 0.300

  drY = acos(drCosLat * drCosDelta); // 1.290

  /* Compute azimuth */
  if (drDelta > 0.0)  {
    drAzimuth = M_PI + atan2(tan(drAbsDelta),drSinLat); // 4.589
  } else  {
    drAzimuth = M_PI - atan2(tan(drAbsDelta),drSinLat);
  }

  drAzimuth = radiansToDegrees(drAzimuth); // 262.968
  drAzimuth += (180.0 < drAzimuth) ? -360.0 : 0.0; // -97.031
  
  /* Compute elevation */
  drElevation = atan2(cos(drY) - drA, sin(drY)); // 0.12968

  drElevation = radiansToDegrees(drElevation); // 7.430
  
  // now, rElevation and rAzimuth are correct.  use them to place the satellite.
  return [NSArray arrayWithObjects:[NSNumber numberWithDouble:drAzimuth], [NSNumber numberWithDouble:drElevation], nil];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
+ (BOOL)available {
  //NSLog(@":: available");
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
  //NSLog(@":: infoButtonPressed");
	[infoView setHidden:!infoView.hidden];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (IBAction)backButtonPressed:(id)sender
{
    [self nilSatelliteFinderViewObjects];
    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
    if (timer != nil)
    {
        [timer invalidate];
        timer = nil;
    }
    showPicker = true;
}


#pragma mark -
#pragma mark Release Satellite Finder Objects
-(void)nilSatelliteFinderViewObjects
{
    // nil UIAccelerometer Object...
    //[accelerometer setDelegate:nil];
    //accelerometer = nil;
    
    // stop & nil CMMotionManager Object...
    [motionManager stopAccelerometerUpdates];
    motionManager = nil;
    
    // nil CLLocationManager Object...
    [locationManager setDelegate:nil];
    locationManager = nil;
    
    // nil NSURLConnection Object...
    [connection cancel];
    connection = nil;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth
{
    // NSLog(@":: xPositionForSatelliteWithAzimuth");
    satelliteAzimuth += (0.0 > satelliteAzimuth) ? 360.0 : 0.0;
    
    double leftBound = deviceHeading - (hfov/2.0);
    double rightBound = deviceHeading + (hfov/2.0);
    double positionAtBoundScale;
    if (leftBound > rightBound)
    {
        if (satelliteAzimuth <= rightBound)
        {
            positionAtBoundScale = ((360.0 - leftBound) + satelliteAzimuth)/hfov;
        }
        else if (satelliteAzimuth >= leftBound)
        {
            positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
        }
        else return NAN;
    }
    else
    {
        if ((satelliteAzimuth > leftBound) && (satelliteAzimuth < rightBound))
            positionAtBoundScale = (satelliteAzimuth - leftBound)/hfov;
        else
            return NAN;
    }
    //double x = camviewwidth * positionAtBoundScale;
    double x = ApplicationDelegate.screenSize.width * positionAtBoundScale;
    return x;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)offscreenXPositionForSatelliteWithAzimuth:(double)satelliteAzimuth {
  // NSLog(@":: offscreenXPositionForSatelliteWithAzimuth");
	double leftBound = deviceHeading - (hfov/2.0);
	double rightBound = deviceHeading + (hfov/2.0);
	double invisibleBoundsDiff = (360.0 - hfov);
	double positionAtBoundScale;

	if (leftBound > rightBound)	{
		if (satelliteAzimuth >= (leftBound - (invisibleBoundsDiff/2.0))) {
			// it's to the left
			positionAtBoundScale = (leftBound - satelliteAzimuth)/hfov;
			//return (0.0 - (camviewwidth * positionAtBoundScale));
            return (0.0 - (ApplicationDelegate.screenSize.width * positionAtBoundScale));
		} else {
			// it's to the right
			positionAtBoundScale = (satelliteAzimuth - rightBound)/hfov;
			//return (camviewwidth + (camviewwidth * positionAtBoundScale));
            return (ApplicationDelegate.screenSize.width + (ApplicationDelegate.screenSize.width * positionAtBoundScale));
		}

	} else {
		if (satelliteAzimuth <= leftBound) {
			// it's to the left
			positionAtBoundScale = (leftBound - satelliteAzimuth)/hfov;
			//return (0.0 - (camviewwidth * positionAtBoundScale));
            return (0.0 - (ApplicationDelegate.screenSize.width * positionAtBoundScale));
		} else if (satelliteAzimuth >= (rightBound + (invisibleBoundsDiff/2.0))) {
			// it's to the left
			positionAtBoundScale = ((360.0 - satelliteAzimuth) + leftBound)/hfov;
			//return (0.0 - (camviewwidth * positionAtBoundScale));
            return (0.0 - (ApplicationDelegate.screenSize.width * positionAtBoundScale));
		} else {
			// it's to the right
			positionAtBoundScale = (satelliteAzimuth - rightBound)/hfov;
			//return (camviewwidth + (camviewwidth * positionAtBoundScale));
            return (ApplicationDelegate.screenSize.width + (ApplicationDelegate.screenSize.width * positionAtBoundScale));
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)yPositionForSatelliteWithElevation:(double)satelliteElevation {
    // NSLog(@":: yPositionForSatelliteWithElevation");
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
  // NSLog(@":: offscreenYPositionForSatelliteWithElevation");
	double topBound = deviceTilt + (vfov/2.0);
	double bottomBound = deviceTilt - (vfov/2.0);
	
	double boundDiff = topBound - bottomBound;
	double positionAtBoundScale;
	double y = 0.0;
	
	if (satelliteElevation <= bottomBound)
    {
		positionAtBoundScale = (bottomBound - satelliteElevation)/boundDiff;
		y = camviewheight + (camviewheight * positionAtBoundScale);
	}
    else if (satelliteElevation >= topBound)
    {
		positionAtBoundScale = (satelliteElevation - topBound)/boundDiff;
		y = 0.0 - (camviewheight * positionAtBoundScale);
	}

	return y;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)timerAction {
//   NSLog(@":: timerAction");
	[overlayView updateAzimuthLabel:deviceHeading];
	[overlayView updateElevationLabel:deviceTilt];
    [self drawClarkeBelt];
	[self drawSatList];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawSatList {
    NSUInteger k = [satList count];
    
    float hw = (IS_IPAD ? 384.0 :  ApplicationDelegate.screenSize.width/2); // half width
    float hh = (IS_IPAD ? 384.0 : camviewheight/2); // half height
    
    
    //	distance of the closest sat
    NSString* closest = nil;
    float closestD = 100000.0;
    BOOL satellitesVisible = NO;
    
    //	for calculating directions
    float offscreenClosestD = 100000.0;
    float offscreenClosestX = 0.0;
    float offscreenClosestY = 0.0;
    
    while (k--)
    {
        Satellite* satellite = (Satellite*)[satList objectAtIndex:k];
        NSNumber* satelliteLongitude = [NSNumber numberWithFloat:satellite.degLon];
        
        if (satelliteLongitude)
        {
            NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:[satelliteLongitude doubleValue]];
            
            if (satelliteAzimuthAndElevation)
            {
                double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
                double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
                double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
                double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
                
                if (0.0 < satelliteElevation)
                {
                    if (isNaN(x) || isNaN(y))
                    {
                        //	satellite is offscreen. hide it.
                        [overlayView hideViewForSatelliteWithName:satellite.antSatID];
                        
                        //	if we already have a visible satellite, do not calculate direction/distance of offscreen satellite.
                        if (satellitesVisible)
                        {
                            continue;
                        }
                        else
                        {
                            //	if we have no visible satellites yet, go ahead and calculate the distance and offscreen x & y
                            if (isNaN(x)) x = [self offscreenXPositionForSatelliteWithAzimuth:satelliteAzimuth];
                            if (isNaN(y)) y = [self offscreenYPositionForSatelliteWithElevation:satelliteElevation];
                            
                            //	get distance. if no visible satellites still,
                            float x1 = hw;
                            float y1 = hh;
                            float x2 = x;
                            float y2 = y;
                            float dx = (x2 - x1);
                            float dy = (y2 - y1);
                            float d = sqrt(dx*dx + dy*dy);
                            
                            if (d < offscreenClosestD)
                            {
                                offscreenClosestD = d;
                                offscreenClosestX = x;
                                offscreenClosestY = y;
                            }
                        }
                        continue;
                    }
                    else
                    {
                        if (satellite.selected)
                            [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:2];
                        else if (satellite.enabled)
                            [overlayView updateViewForSatelliteWithName:satellite.antSatID AtX:x andY:y withType:1];
                        else
                            continue;
                        
                        satellitesVisible = YES;
                        
                        //	get distance
                        float x1 = hw;
                        float y1 = hh;
                        float x2 = x;
                        float y2 = y;
                        float dx = (x2 - x1);
                        float dy = (y2 - y1);
                        float d = sqrt(dx*dx + dy*dy);
                        
                        if (d < closestD)
                        {
                            closestD = d;
                            closest = satellite.antSatID;
                        }
                    }
                }
            }
            else
                continue;
        }
        else
            continue;
    }
    
    //	set closest if sats visible
    if (closest != nil)
    {
        [overlayView setClosestSatellite:closest];
    }
    else
    {
        [overlayView setClosestSatellite:@""];
    }
    
    //	set crosshair direction
    if (satellitesVisible)
    {
        [overlayView setCrosshairState:0];
        //  satellites are not visible, so set the overlayView crosshair to point in the proper direction
        //  check left/right
    }
    else
    {
        //  ON YOUR LEFT
        if (offscreenClosestX < hw)
        {
            //  LOWER LEFT
            if (offscreenClosestY > hh)
            {
                /*LEFT*/if (fabsf(hw - offscreenClosestX) > fabsf(offscreenClosestY - hh)) [overlayView setCrosshairState:3];
                /*DOWN*/else [overlayView setCrosshairState:4];
                
                //  UPPER LEFT
            }
            else
            {
                /*LEFT*/if (fabsf(hw - offscreenClosestX) > fabsf(hh - offscreenClosestY)) [overlayView setCrosshairState:3];
                /**UP**/else [overlayView setCrosshairState:1];
            }
            
            //  ON YOUR RIGHT
        }
        else
        {
            //  LOWER RIGHT
            if (offscreenClosestY > hh)
            {
                /*RIGHT*/if (fabsf(offscreenClosestX - hw) > fabsf(offscreenClosestY - hh)) [overlayView setCrosshairState:2];
                /*DOWN**/else [overlayView setCrosshairState:4];
                
                //  UPPER RIGHT
            }
            else
            {//	somewhere up right ...
                /*RIGHT*/if (fabsf(offscreenClosestX - hw) > fabsf(hh - offscreenClosestY)) [overlayView setCrosshairState:2];
                /**UP***/else [overlayView setCrosshairState:1];
            }
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawClarkeBelt {
    // enumerate through satellites
    NSString* satelliteName;
    for( double satelliteLongitude = 0.0; satelliteLongitude < 359.0; satelliteLongitude += 5.0 ) {
        satelliteName = @"dot";
        satelliteName = [satelliteName stringByAppendingFormat:@"%lf",satelliteLongitude];
        if(satelliteLongitude) {
            // use jacob's alg to calc azimuth & elevation of satellite
            NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:satelliteLongitude];
            if(satelliteAzimuthAndElevation) {
                double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
                double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
                double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
                double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
                if(satelliteElevation>0.0) {
                    if(isNaN(x) || isNaN(y)) {
                        [overlayView hideViewForSatelliteWithName:satelliteName];
                        continue;
                    } else {
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
    if (IS_IPAD) self = [super initWithNibName:@"SatelliteFinderViewController~iPad" bundle:[NSBundle mainBundle]];
    else self = [super initWithNibName:@"SatelliteFinderViewController~iPhone" bundle:[NSBundle mainBundle]];
    
    if (self) {
        
        satList = [[NSMutableArray alloc] init];
        
        double accelerometerFrequency = (1.0 / 24.0);
        accelerometerFilter = [[LowpassFilter alloc] initWithSampleRate:accelerometerFrequency cutoffFrequency:5.0];
        [accelerometerFilter setAdaptive:YES];
        
        //accelerometer = [UIAccelerometer sharedAccelerometer];
        //[accelerometer setUpdateInterval:accelerometerFrequency];
        //[accelerometer setDelegate:self];
        
        motionManager = [[CMMotionManager alloc] init];
        motionManager.accelerometerUpdateInterval = accelerometerFrequency;
        [motionManager startAccelerometerUpdatesToQueue:[NSOperationQueue currentQueue] withHandler:^(CMAccelerometerData  *accelerometerData, NSError *error)
         {
             [self outputAccelertionData:accelerometerData.acceleration];
             if(error)
             {
                 NSLog(@"%@", error);
             }
         }];
        
        /*locationManager = [[CLLocationManager alloc] init];
        [locationManager setDelegate:self];
        if (IS_OS_8_OR_LATER)
        {
            if ([locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)])
            { // iOS8+
                // Sending a message to avoid compile time error
                [[UIApplication sharedApplication] sendAction:@selector(requestWhenInUseAuthorization)
                                                           to:locationManager
                                                         from:self
                                                     forEvent:nil];
            }
        }
        [locationManager setDistanceFilter:kCLDistanceFilterNone];
        [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
        [locationManager setHeadingFilter:kCLHeadingFilterNone];
        [locationManager setPurpose:@"Satellite Finder needs your location to find satellites!"];  //  deprecated, we may still need for older ios versions
        if ([CLLocationManager headingAvailable]) {
            [locationManager startUpdatingHeading];
        }*/

        
        if (!locationManager)
        {
            locationManager = [[CLLocationManager alloc] init];
            locationManager.delegate = self;
            locationManager.distanceFilter = kCLDistanceFilterNone;
            locationManager.desiredAccuracy = kCLLocationAccuracyBest;
            [locationManager setHeadingFilter:kCLHeadingFilterNone];
            
            if([locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]&& IS_IOS8) {
                [locationManager requestWhenInUseAuthorization];
            }
            [locationManager startUpdatingLocation];
            if([CLLocationManager headingAvailable]) [locationManager startUpdatingHeading];
        }

        
        //  DEBUGGING
        // deviceLat = 34.043918;
        // deviceLon = -118.252480;
        // deviceTilt = 25.271421;
        // deviceHeading = 125.611473;
    }
    
    return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewDidLoad {
    [super viewDidLoad];
    //NSLog(@":: viewDidLoad");
    showPicker = true;
    
    // in case i dont have net
    if (!deviceLat)
        deviceLat =  41.521705;
    if (!deviceLon)
        deviceLon = -71.298824;
    
    NSMutableDictionary* _satelliteLongitudes = [[NSMutableDictionary alloc] init];
    double d = -80.0;
    [_satelliteLongitudes setObject:[NSNumber numberWithDouble:d] forKey:[NSString stringWithFormat:@"%d-%@", abs((int)d), ((d<0) ? @"W" : @"E")]];
    satelliteLongitudes = (NSDictionary*)_satelliteLongitudes;
    
    //------------Heigth of overlay-----------//
    if (overlayView == nil)
        overlayView = [[SatelliteFinderOverlayView alloc] init];
    overlayView.backgroundColor = [UIColor clearColor];
    overlayView.frame = [[UIScreen mainScreen] bounds];
    
    //-------------Bottom Bar-------------//
    UIImage *imgBottom;
    UIImageView* bottomBar = [[UIImageView alloc] init];
    //  i don't know why this case doesnt handle ~ipad ~iphone image suffixes
    if (IS_IPAD) {
        imgBottom = [UIImage imageNamed:@"sf_enabled_favorite_selected_bar_ipad.png"];
        [bottomBar setFrame:CGRectMake(410.0, 996.0, 343.0, 23.0)];
    }
    else {
        imgBottom = [UIImage imageNamed:@"sf_enabled_favorite_selected_bar.png"];
        [bottomBar setFrame:CGRectMake(0.0, overlayView.frame.size.height -54.0, overlayView.frame.size.width,54.0)];
    }
    bottomBar.image = imgBottom;
    bottomBar.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleHeight;
    [overlayView addSubview:bottomBar];
    
    //--------------Back Button----------------//
    backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [backButton setImage:[UIImage imageNamed:@"sf_back_button.png"] forState:UIControlStateNormal];
    [backButton addTarget:self action:@selector(backButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
    if (IS_IPAD)
        [backButton setFrame:CGRectMake(659.0, 12.0, 79.0, 40.0)];
    else
        [backButton setFrame:CGRectMake(overlayView.frame.size.width-73.0, 10.0, 63.0, 32.0)];
    [overlayView addSubview:backButton];
    
    //-----------Info Button--------------//
    infoButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [infoButton setImage:[UIImage imageNamed:@"sf_info_button.png"] forState:UIControlStateNormal];
    [infoButton addTarget:self action:@selector(infoButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
    if (IS_IPAD)
        [infoButton setFrame:CGRectMake(602.0, 12.0, 48.0, 40.0)];
    else
        [infoButton setFrame:CGRectMake(backButton.frame.origin.x - 53.0, 10.0, 38.0, 32.0)];
    [overlayView addSubview:infoButton];
    infoView = [[SatelliteFinderInfoView alloc] init];
    [overlayView addSubview:infoView];
    
    [self setPortraitDeviceOrientation];
}

-(void)setPortraitDeviceOrientation
{
    [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:UIInterfaceOrientationPortrait] forKey:@"orientation"];
    [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(orientationChanged:)
                                                 name:UIDeviceOrientationDidChangeNotification
                                               object:nil];
    
}

-(void) orientationChanged:(NSNotification *)notification
{
    [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:UIInterfaceOrientationPortrait] forKey:@"orientation"];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewWillAppear:(BOOL)animated {
    //NSLog(@":: viewWillAppear");
    [super viewWillAppear:YES];
    [locationManager startUpdatingLocation];
    if ([CLLocationManager headingAvailable]) [locationManager startUpdatingHeading];
    
    // [demoButton setHidden:!APPDEL.demoMode];
    
    if ([[NSUserDefaults standardUserDefaults] boolForKey:@"satFinderInfoShown"]) {
        [infoView setHidden:YES];
    } else {
        [[NSUserDefaults standardUserDefaults] setBool:TRUE forKey:@"satFinderInfoShown"];
        [infoView setHidden:NO];
    }
    
    //  start the timer
    if (timer == nil) {
        timer = [NSTimer timerWithTimeInterval:(1.0 / 5.0) target:self selector:@selector(timerAction) userInfo:nil repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:YES];
    if (showPicker) {
        if (picker == nil) picker = [[CUIImagePickerController alloc] init];
        [picker setSourceType:UIImagePickerControllerSourceTypeCamera]; // << choose camera
        [picker setShowsCameraControls:NO];
        [picker setNavigationBarHidden:YES];
        //[picker setWantsFullScreenLayout:YES];
        picker.edgesForExtendedLayout = YES;

        if (!(IS_IPAD)) {
            float cameraAspectRatio = 4.0 / 3.0;
            float imageWidth = floorf(ApplicationDelegate.screenSize.width * cameraAspectRatio);
            float scale = ceilf((ApplicationDelegate.screenSize.height / imageWidth) * 1.0) / 1.0;
            picker.cameraViewTransform = CGAffineTransformMakeScale(scale, scale);
        }
        
        [picker setCameraOverlayView:overlayView];
        [self presentViewController:picker animated:NO completion:nil];
        showPicker = false;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (BOOL)shouldAutorotate {
  //NSLog(@":: shouldAutorotate");
  return false;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
#if __IPHONE_OS_VERSION_MAX_ALLOWED < 90000
- (NSUInteger)supportedInterfaceOrientations
#else
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
#endif
{
  //NSLog(@":: shouldAutorotate");
  return UIInterfaceOrientationMaskPortrait;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation {
  //NSLog(@":: preferredInterfaceOrientationForPresentation");
  return UIInterfaceOrientationPortrait;
}

//=========================================================================================================================================================
#pragma mark -
#pragma mark CLLocationManager Delegate Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation {
  // NSLog(@"--------------------------------------");
  // NSLog(@":: locationManager didUpdateToLocation");
  // NSLog(@"--------------------------------------");
  deviceLat = newLocation.coordinate.latitude;
  deviceLon = newLocation.coordinate.longitude;

  if (deviceLat == 0.0)
      deviceLat = 0.000001;
  if (deviceLon == 0.0)
      deviceLon = 0.000001;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)locationManager:(CLLocationManager*)manager didUpdateHeading:(CLHeading*)newHeading {
  // NSLog(@":: locationManager didUpdateHeading");
  if (0 < newHeading.headingAccuracy) {
		if (deviceTilt > 45.0)	deviceHeading = fabs(newHeading.trueHeading - 180.0);
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
//- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:(UIAcceleration *)acceleration {
//  // NSLog(@":: accelerometer didAccelerate");
//  [accelerometerFilter addAcceleration:acceleration];
//  double y = accelerometerFilter.y;
//	double z = accelerometerFilter.z;    
//	deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
//}

-(void)outputAccelertionData:(CMAcceleration)acceleration
{
    //NSLog(@":: accelerometer didAccelerate");
    [accelerometerFilter addAcceleration:acceleration];
    double y = accelerometerFilter.y;
    double z = accelerometerFilter.z;
    deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
    //NSLog(@"deviceTilt : %f",deviceTilt);
}

//=========================================================================================================================================================
#pragma mark -
#pragma mark - NSURLConnectionDelegate protocol methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)connection:(NSURLConnection *)_connection didReceiveResponse:(NSURLResponse *)response {
  //NSLog(@":: connection didReceiveResponse");
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)connection:(NSURLConnection *)_connection didReceiveData:(NSData *)data {
  //NSLog(@":: connection didReceiveData");
  [xmlData appendData:data];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)connection:(NSURLConnection *)_connection didFailWithError:(NSError *)error {
  //NSLog(@":: connection didFailWithError");
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)connectionDidFinishLoading:(NSURLConnection *)_connection
{
    //NSLog(@":: connectionDidFinishLoading");
    //NSLog(@":: xmlData length: %lu", (unsigned long)[xmlData length]);
    
    NSString* satListXmlString = [[NSString alloc] initWithBytes:[xmlData bytes] length:[xmlData length] encoding:NSUTF8StringEncoding];
    if ([satListXmlString containsString:@"antenna_status"])
        [self getAntennaStatusFromXmlString:satListXmlString];
    else if ([satListXmlString containsString:@"get_autoswitch_status"])
        [self getSatListFromXmlString:satListXmlString];
}

@end
