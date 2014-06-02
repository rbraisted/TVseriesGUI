
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
    } else {
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
	
  if ((satelliteElevation > bottomBound) && (satelliteElevation < topBound)) {
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

// - (void)drawClarkeBelt:(CGPoint)position withContext:(CGContextRef)context {
// 	CGRect rect = CGRectMake(position.x - 2.0, position.y - 2.0, 4.0, 4.0);
// 	[[UIColor yellowColor] set];
// 	CGContextFillEllipseInRect(context, rect);
// 	[[UIColor whiteColor] set];
// 	CGContextStrokeEllipseInRect(context, rect);
// }

- (void)drawRect:(CGRect)rect {
	CGContextRef context = UIGraphicsGetCurrentContext();
	CGContextClearRect(context, self.bounds);
	
	//	draw the clarke belt
	double d = -180.0;
	while (d <= 180.0) {
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
	NSArray* satList = [delegate satList];
	for (int i = 0; i < [satList count]; i++) {
		Sat* sat = (Sat*)[satList objectAtIndex:i];
  		NSArray* satelliteAzimuthAndElevation = [self azimuthAndElevationOfSatelliteAtLongitude:sat.lon];
  		if (satelliteAzimuthAndElevation) {
			double satelliteAzimuth = [[satelliteAzimuthAndElevation objectAtIndex:0] doubleValue];
			double satelliteElevation = [[satelliteAzimuthAndElevation objectAtIndex:1] doubleValue];
			double x = [self xPositionForSatelliteWithAzimuth:satelliteAzimuth];
			double y = [self yPositionForSatelliteWithElevation:satelliteElevation];
			if (satelliteElevation > 0.0 && !isNaN(x) && !isNaN(y)) {
				CGRect rect = CGRectMake(x - 5.0, y - 5.0, 10.0, 10.0);
				[[UIColor redColor] set];
				CGContextFillEllipseInRect(context, rect);
				[[UIColor whiteColor] set];
				CGContextStrokeEllipseInRect(context, rect);
			}
		}
	}
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

  NSLog(@"%@", satListXmlString);
  NSLog(@"\n");

  RXMLElement* satListXml = [RXMLElement elementFromXMLString:satListXmlString encoding:NSUTF8StringEncoding];

  NSLog(@"%@", satListXml);
  NSLog(@"\n");

  [satListXml iterateWithRootXPath:@"//satellite" usingBlock: ^(RXMLElement *satElement) {
    Sat* sat = [[Sat alloc] init];
    [sat setName:[satElement child:@"name"].text];
    [sat setRegion:[satElement child:@"region"].text];
    [sat setListId:[satElement child:@"listID"].text];
    [sat setAntSatId:[satElement child:@"antSatID"].text];
    [sat setTriSatId:[satElement child:@"triSatID"].text];
    [sat setLon:[[satElement child:@"lon"].text floatValue]];
    [sat setFavorite:[[satElement child:@"favorite"].text boolValue]];
    [sat setEnabled:[[satElement child:@"enabled"].text boolValue]];
    [sat setSelectable:[[satElement child:@"select"].text boolValue]];
    [satList addObject:sat];

    NSLog(@"%@", sat);
    NSLog(@"\n");

  }];

  NSLog(@"%@", satList);
  NSLog(@"\n");

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

  //  SATFINDERDEBUG
  deviceLat = 34.043918;
  deviceLon = -118.252480;
  deviceTilt = 25.271421;
  deviceHeading = 125.611473;

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

//  use these values to debug from a single location
//  (los angeles, looking towards the clarke belt)
//
//  IMMA DRAWING! -80
//  lat: 34.043918
//  lon: -118.252480
//  hdg: 125.611473
//  tlt: 25.271421
//  ele: 125.377627
//  azi: 33.333587
//    x: 158.105549
//    y: 148.198437

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation {
  NSLog(@"locationManager didUpdateToLocation:%@ fromLocation:%@", newLocation, oldLocation);
  //  SATFINDERDEBUG
  // deviceLat = newLocation.coordinate.latitude;
  // deviceLon = newLocation.coordinate.longitude;
  if (deviceLat == 0.0) deviceLat = 0.000001;
  if (deviceLon == 0.0) deviceLon = 0.000001;
	[satFinderView setNeedsDisplay];
}

- (void)locationManager:(CLLocationManager*)manager didUpdateHeading:(CLHeading*)newHeading {
  NSLog(@"locationManager didUpdateHeading:%@", newHeading);
  if (0 >= newHeading.headingAccuracy) deviceHeading = -999.0;
  //  SATFINDERDEBUG
  // else if (deviceTilt < 45.0) deviceHeading = newHeading.trueHeading;
  // else deviceHeading = fabsf(newHeading.trueHeading - 180.0);
  else deviceHeading += 1.0;  // !
	[satFinderView setNeedsDisplay];
}

- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager {
  NSLog(@"locationManagerShouldDisplayHeadingCalibration");
	[manager dismissHeadingCalibrationDisplay];
  return NO;
}

#pragma mark - UIAccelerometerDelegate protocol methods

- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:(UIAcceleration *)acceleration {
  NSLog(@"accelerometer didAccelerate:%@", acceleration);
  [accelerometerFilter addAcceleration:acceleration];
  double y = accelerometerFilter.y;
	double z = accelerometerFilter.z;
  //  SATFINDERDEBUG
  // deviceTilt = radiansToDegrees(atan2(y, z)) + 90.0;
	// deviceTilt += 0.5; // !
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

- (NSArray*)satList {
	return satList;
}

@end