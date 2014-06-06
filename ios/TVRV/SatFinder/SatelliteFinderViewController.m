//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteFinderViewController.h"
#import "SatelliteFinderInfoView.h"
#import "Satellite.h"
#import "RXMLElement.h"

@implementation SatelliteFinderViewController

//=========================================================================================================================================================
#pragma mark -
#pragma mark SatelliteFinderViewController Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (NSArray*)azimuthAndElevationOfSatelliteAtLongitude:(double)satelliteLongitude {
  // NSLog(@":: azimuthAndElevationOfSatelliteAtLongitude");
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
  return [NSArray arrayWithObjects:[NSNumber numberWithDouble:drAzimuth], [NSNumber numberWithDouble:drElevation], nil];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
+ (BOOL)available {
  NSLog(@":: available");
  return true;
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
  NSLog(@":: infoButtonPressed");
	[infoView setHidden:!infoView.hidden];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (IBAction)backButtonPressed:(id)sender {
  NSLog(@":: backButtonPressed");

  //  very old code, this is not the way to do it

	[self dismissModalViewControllerAnimated:NO];//camera

  //  kill the timer
  //  do it here or timer will restart because viewWillAppear
  if (timer != nil) {
    [timer invalidate];
    timer = nil;    
  }

  [self dismissModalViewControllerAnimated:NO];//the actual view

	showPicker = true;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (double)xPositionForSatelliteWithAzimuth:(double)satelliteAzimuth {
  // NSLog(@":: xPositionForSatelliteWithAzimuth");
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
  // NSLog(@":: offscreenXPositionForSatelliteWithAzimuth");
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
  NSLog(@":: timerAction");
  deviceHeading += 0.5;
	[overlayView updateAzimuthLabel:deviceHeading];
	[overlayView updateElevationLabel:deviceTilt];
	[self drawSatList];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawSatList {
  NSLog(@":: drawSatList");
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

//=========================================================================================================================================================
#pragma mark -
#pragma mark UIViewController Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
  if (IS_IPAD) self = [super initWithNibName:@"SatelliteFinderViewController~iPad" bundle:[NSBundle mainBundle]];
  else self = [super initWithNibName:@"SatelliteFinderViewController~iPhone" bundle:[NSBundle mainBundle]];

  if (self) {

    satList = [[NSMutableArray alloc] init];

    //  SATFINDERDEBUG
    NSString* satListXmlString = [NSString stringWithString:@"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
    "<ipacu_response>"
      "<message error=\"0\" name=\"get_satellite_list\"/>"
      "<region_filter>North America,Europe</region_filter>"
      "<user_choice_filter>enable,favorite</user_choice_filter>"
      "<sat_list>"
        "<satellite>"
          "<listID>2</listID>"
          "<antSatID>75EN</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>ABS 1 North</name>"
          "<region>Asia</region>"
          "<lon>75.02</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>60</listID>"
          "<antSatID>75ES</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>ABS 1 South</name>"
          "<region>Asia</region>"
          "<lon>75.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>3</listID>"
          "<antSatID>146E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Agila 2</name>"
          "<region>Asia</region>"
          "<lon>145.88</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>61</listID>"
          "<antSatID>40E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>AM1 Europe Wide-beam</name>"
          "<region>Europe</region>"
          "<lon>40.14</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>7</listID>"
          "<antSatID>87W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>AMC-3</name>"
          "<region>North America</region>"
          "<lon>-86.96</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>8</listID>"
          "<antSatID>4W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Amos 2</name>"
          "<region>Europe</region>"
          "<lon>-3.92</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>63</listID>"
          "<antSatID>4WME</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Amos 2 Middle East</name>"
          "<region>Africa</region>"
          "<lon>-3.92</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>9</listID>"
          "<antSatID>134E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Apstar 6</name>"
          "<region>Asia</region>"
          "<lon>134.05</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>11</listID>"
          "<antSatID>105E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>AsiaSat-3S</name>"
          "<region>Asia</region>"
          "<lon>105.44</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>12</listID>"
          "<antSatID>122E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>AsiaSat-4</name>"
          "<region>Asia</region>"
          "<lon>122.23</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>13</listID>"
          "<antSatID>19E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Astra 1</name>"
          "<region>Europe</region>"
          "<lon>19.27</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>14</listID>"
          "<antSatID>28EN</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Astra 2 North</name>"
          "<region>Europe</region>"
          "<lon>28.25</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>15</listID>"
          "<antSatID>28ES</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Astra 2 South</name>"
          "<region>Europe</region>"
          "<lon>28.25</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>64</listID>"
          "<antSatID>23E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Astra 3A</name>"
          "<region>Europe</region>"
          "<lon>23.57</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>1</listID>"
          "<antSatID>5W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>AtlanticBird 3</name>"
          "<region>Europe</region>"
          "<lon>-4.88</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>10</listID>"
          "<antSatID>26E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Badr-3,4</name>"
          "<region>Europe</region>"
          "<lon>26.06</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>65</listID>"
          "<antSatID>56E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Bonum 1</name>"
          "<region>Asia</region>"
          "<lon>56.07</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>16</listID>"
          "<antSatID>72W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 1R</name>"
          "<region>North America</region>"
          "<lon>-72.41</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>18</listID>"
          "<antSatID>110W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 5</name>"
          "<region>North America</region>"
          "<lon>-110.07</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>99</listID>"
          "<antSatID>99W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 99W</name>"
          "<region>North America</region>"
          "<lon>-99.00</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>FALSE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>17</listID>"
          "<antSatID>101W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 9S,10</name>"
          "<region>North America</region>"
          "<lon>-101.09</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>103</listID>"
          "<antSatID>103W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 103W</name>"
          "<region>North America</region>"
          "<lon>-103.00</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>FALSE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>98</listID>"
          "<antSatID>101</antSatID>"
          "<triSatID>9</triSatID>"
          "<name>101W,99W\" withName:@\"DirecTV 99-101-103</name>"
          "<region>North America</region>"
          "<lon>-101.09</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>97</listID>"
          "<antSatID>101</antSatID>"
          "<triSatID>03</triSatID>"
          "<name>101W,103W\" withName:@\"DirecTV 99-101-103</name>"
          "<region>North America</region>"
          "<lon>-101.09</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>19</listID>"
          "<antSatID>119WD</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>DirecTV 7S</name>"
          "<region>North America</region>"
          "<lon>-118.99</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>25</listID>"
          "<antSatID>77W1</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Echostar 1</name>"
          "<region>North America</region>"
          "<lon>-77.15</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>24</listID>"
          "<antSatID>129W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Echostar 2</name>"
          "<region>North America</region>"
          "<lon>-129.00</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>21</listID>"
          "<antSatID>61W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Echostar 3</name>"
          "<region>North America</region>"
          "<lon>-61.43</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>23</listID>"
          "<antSatID>119WE</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Echostar 7</name>"
          "<region>North America</region>"
          "<lon>-118.72</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>22</listID>"
          "<antSatID>77W8</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Echostar 8</name>"
          "<region>North America</region>"
          "<lon>-77.02</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>20</listID>"
          "<antSatID>63W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Estrella Brasil Beam</name>"
          "<region>Central/South America</region>"
          "<lon>-63.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>30</listID>"
          "<antSatID>36E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Eutel Sesat</name>"
          "<region>Europe</region>"
          "<lon>36.00</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>26</listID>"
          "<antSatID>7E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Eutelsat W3A</name>"
          "<region>Europe</region>"
          "<lon>7.10</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>28</listID>"
          "<antSatID>36EN</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Eutelsat W4 Nigerian</name>"
          "<region>Europe</region>"
          "<lon>36.30</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>27</listID>"
          "<antSatID>36ER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Eutelsat W4 Russian</name>"
          "<region>Europe</region>"
          "<lon>36.30</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>29</listID>"
          "<antSatID>70E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Eutelsat W5</name>"
          "<region>North America</region>"
          "<lon>70.72</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>4</listID>"
          "<antSatID>80E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Express AM2</name>"
          "<region>Asia</region>"
          "<lon>80.03</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>62</listID>"
          "<antSatID>53EME</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Express AM22 MEast</name>"
          "<region>Africa</region>"
          "<lon>53.12</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>6</listID>"
          "<antSatID>53E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Express AM22 Wide</name>"
          "<region>Europe</region>"
          "<lon>53.13</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>5</listID>"
          "<antSatID>140E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Express AM3</name>"
          "<region>Asia</region>"
          "<lon>140.13</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>31</listID>"
          "<antSatID>91W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Expresstv, Nimiq 1</name>"
          "<region>North America</region>"
          "<lon>-91.05</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>32</listID>"
          "<antSatID>82W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Expressvu Nimiq 2</name>"
          "<region>North America</region>"
          "<lon>-81.94</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>69</listID>"
          "<antSatID>123W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Galaxy 18</name>"
          "<region>North America</region>"
          "<lon>-122.89</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>68</listID>"
          "<antSatID>97W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Galaxy 19</name>"
          "<region>North America</region>"
          "<lon>-97.04</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>67</listID>"
          "<antSatID>93W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Galaxy 25</name>"
          "<region>North America</region>"
          "<lon>-93.03</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>33</listID>"
          "<antSatID>95W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Galaxy 3C</name>"
          "<region>Central/South America</region>"
          "<lon>-94.97</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>34</listID>"
          "<antSatID>30W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Hispasat 1C</name>"
          "<region>Europe</region>"
          "<lon>-29.86</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>70</listID>"
          "<antSatID>30WA</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Hispasat 1C, America</name>"
          "<region>Europe</region>"
          "<lon>-28.85</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>36</listID>"
          "<antSatID>13E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Hotbird 6,78</name>"
          "<region>Europe</region>"
          "<lon>13.08</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>35</listID>"
          "<antSatID>13EE</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Hotbird 6,7,8 Europe</name>"
          "<region>Europe</region>"
          "<lon>13.08</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>40</listID>"
          "<antSatID>43W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 11</name>"
          "<region>Central/South America</region>"
          "<lon>-42.94</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>37</listID>"
          "<antSatID>93E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 3A, 4B</name>"
          "<region>Asia</region>"
          "<lon>93.51</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>72</listID>"
          "<antSatID>180E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 701, New Caledonia</name>"
          "<region>Australia</region>"
          "<lon>179.97</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>41</listID>"
          "<antSatID>180EP</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 701, Polynesia</name>"
          "<region>Australia</region>"
          "<lon>179.97</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>38</listID>"
          "<antSatID>166E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 8</name>"
          "<region>Australia</region>"
          "<lon>165.98</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>42</listID>"
          "<antSatID>34W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat 903</name>"
          "<region>Europe</region>"
          "<lon>-34.43</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>39</listID>"
          "<antSatID>68E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat-10 Africa Europe</name>"
          "<region>Africa</region>"
          "<lon>68.54</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>71</listID>"
          "<antSatID>68ESA</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Intelsat-10, South Africa</name>"
          "<region>Africa</region>"
          "<lon>68.54</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>49</listID>"
          "<antSatID>58W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>IntelSat-9, Sky Mexico</name>"
          "<region>Australia</region>"
          "<lon>-57.88</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>73</listID>"
          "<antSatID>91EI</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>MeaSat 3, India</name>"
          "<region>Asia</region>"
          "<lon>91.53</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>43</listID>"
          "<antSatID>91EM</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>MeaSat 3, Malaysia</name>"
          "<region>Asia</region>"
          "<lon>91.53</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>44</listID>"
          "<antSatID>7W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Nilesat 101</name>"
          "<region>Africa</region>"
          "<lon>-6.77</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>46</listID>"
          "<antSatID>108E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>NSS11</name>"
          "<region>Asia</region>"
          "<lon>108.26</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>74</listID>"
          "<antSatID>95EI</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>NSS6, India</name>"
          "<region>Asia</region>"
          "<lon>95.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>75</listID>"
          "<antSatID>95EN</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>NSS6, Northeast Asia</name>"
          "<region>Asia</region>"
          "<lon>95.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>45</listID>"
          "<antSatID>95ES</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>NSS6, Southeast Asia</name>"
          "<region>Asia</region>"
          "<lon>95.02</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>47</listID>"
          "<antSatID>156E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Optus C1</name>"
          "<region>Australia</region>"
          "<lon>156.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>48</listID>"
          "<antSatID>160E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Optus D1</name>"
          "<region>Australia</region>"
          "<lon>159.98</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>51</listID>"
          "<antSatID>110E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Sinosat-1</name>"
          "<region>Asia</region>"
          "<lon>110.50</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>52</listID>"
          "<antSatID>5E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Sirius-4</name>"
          "<region>Europe</region>"
          "<lon>4.87</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>53</listID>"
          "<antSatID>88E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>ST1</name>"
          "<region>Asia</region>"
          "<lon>87.98</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>50</listID>"
          "<antSatID>144E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>SuperBird C2</name>"
          "<region>Asia</region>"
          "<lon>144.02</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>54</listID>"
          "<antSatID>76E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Telstar 10</name>"
          "<region>Asia</region>"
          "<lon>76.53</lon>"
          "<favorite>TRUE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>55</listID>"
          "<antSatID>15WA</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Telstar 12, Americas</name>"
          "<region>Central/South America</region>"
          "<lon>-14.92</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>76</listID>"
          "<antSatID>15WE</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Telstar 12, Europe, South Africa</name>"
          "<region>Europe</region>"
          "<lon>-14.92</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>66</listID>"
          "<antSatID>63WM</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Telstar 14, Estrella Brasil, Mercosul</name>"
          "<region>Central/South America</region>"
          "<lon>-62.99</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>56</listID>"
          "<antSatID>138E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Telstar 18</name>"
          "<region>Asia</region>"
          "<lon>137.94</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>57</listID>"
          "<antSatID>78E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Thiacom</name>"
          "<region>Asia</region>"
          "<lon>78.55</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>58</listID>"
          "<antSatID>0W</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Thor-2, Thor-3</name>"
          "<region>Europe</region>"
          "<lon>0.00</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>59</listID>"
          "<antSatID>42E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Turksat 1C</name>"
          "<region>Europe</region>"
          "<lon>42.01</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>78</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Circular 1</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>80</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Circular 2</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>82</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Circular 3</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>79</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Linear 1</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>81</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Linear 2</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>83</listID>"
          "<antSatID>USER</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>User Linear 3</name>"
          "<region></region>"
          "<lon>0.0</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>FALSE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
        "<satellite>"
          "<listID>77</listID>"
          "<antSatID>90E</antSatID>"
          "<triSatID>FALSE</triSatID>"
          "<name>Yamal 201</name>"
          "<region>Asia</region>"
          "<lon>90.02</lon>"
          "<favorite>FALSE</favorite>"
          "<enabled>TRUE</enabled>"
          "<select>TRUE</select>"
        "</satellite>"
      "</sat_list>"
    "</ipacu_response>"];

    RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];

    [satListXml iterateWithRootXPath:@"//satellite" usingBlock: ^(RXMLElement *satElement) {
      Satellite* sat = [[Satellite alloc] initWithListID:[satElement child:@"listID"].text
                                          withAntSatID:[satElement child:@"antSatID"].text
                                          withTriSatID:[satElement child:@"triSatID"].text
                                          withName:[satElement child:@"name"].text
                                          withRegion:[satElement child:@"region"].text
                                          withDegLon:[[satElement child:@"lon"].text floatValue]
                                          isFavorite:[[satElement child:@"favorite"].text boolValue]
                                          isEnabled:[[satElement child:@"enabled"].text boolValue]
                                          isSelectable:[[satElement child:@"select"].text boolValue]];

      [satList addObject:sat];
    }];

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

    //  DEBUGGING
    deviceLat = 34.043918;
    deviceLon = -118.252480;
    deviceTilt = 25.271421;
    deviceHeading = 125.611473;
  }

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

  //  start the timer
  if (timer == nil) {
    timer = [NSTimer timerWithTimeInterval:(1.0 / 5.0) target:self selector:@selector(timerAction) userInfo:nil repeats:YES];
    [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)viewDidAppear:(BOOL)animated {
  NSLog(@":: viewDidAppear");
  [self.view addSubview:overlayView];

  // show the camera!
  // if (showPicker) {
  //   if (picker == nil) picker = [[UIImagePickerController alloc] init];
  //   [picker setSourceType:UIImagePickerControllerSourceTypeCamera]; // << choose camera
  //   [picker setShowsCameraControls:NO];
  //   [picker setNavigationBarHidden:YES];
  //   [picker setWantsFullScreenLayout:YES];
  //   [picker setCameraOverlayView:overlayView];
  //   [self presentModalViewController:picker animated:NO];
  //   showPicker = false;
  // }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (BOOL)shouldAutorotate {
  NSLog(@":: shouldAutorotate");
  return false;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (NSUInteger)supportedInterfaceOrientations {
  NSLog(@":: shouldAutorotate");
  return UIInterfaceOrientationMaskPortrait;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation {
  NSLog(@":: preferredInterfaceOrientationForPresentation");
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
  // deviceLat = newLocation.coordinate.latitude;
  // deviceLon = newLocation.coordinate.longitude;
  // if (deviceLat == 0.0) deviceLat = 0.000001;
  // if (deviceLon == 0.0) deviceLon = 0.000001;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)locationManager:(CLLocationManager*)manager didUpdateHeading:(CLHeading*)newHeading {
  // NSLog(@"-----------------------------------");
  // NSLog(@":: locationManager didUpdateHeading");
  // NSLog(@"-----------------------------------");
  // if (0 < newHeading.headingAccuracy) {
		// if (deviceTilt > 45.0)	deviceHeading = fabsf(newHeading.trueHeading - 180.0);
		// else deviceHeading = newHeading.trueHeading;
  // } else {
  //   deviceHeading = -999.0;
  // }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager {
  // NSLog(@"-------------------------------------------------");
  // NSLog(@":: locationManagerShouldDisplayHeadingCalibration");
  // NSLog(@"-------------------------------------------------");
	[manager dismissHeadingCalibrationDisplay];
  return NO;
}


//=========================================================================================================================================================
#pragma mark -
#pragma mark UIAccelerometer Delegate Methods

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:(UIAcceleration *)acceleration {
  // NSLog(@"------------------------------");
  // NSLog(@":: accelerometer didAccelerate");
  // NSLog(@"------------------------------");
 //  [accelerometerFilter addAcceleration:acceleration];
 //  double y = accelerometerFilter.y;
	// double z = accelerometerFilter.z;    
	// deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
}

@end