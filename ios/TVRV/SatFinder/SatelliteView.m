
#import "SatelliteView.h"

@implementation SatelliteView

static UIImage *blackDot = nil;
static UIImage *blueDot = nil;
static UIImage *purpleDot = nil;
static UIImage *redDot = nil;
static UIImage *yellowDot = nil;
static UIImage *nameBg = nil;

@synthesize satelliteName, closest;

+ (void)initialize {
	if (self == [SatelliteView class]) {
		blackDot = [UIImage imageNamed:@"sf_sat_black.png"];
		blueDot = [UIImage imageNamed:@"sf_sat_blue.png"];
		purpleDot = [UIImage imageNamed:@"sf_sat_purple.png"];
		redDot = [UIImage imageNamed:@"sf_sat_red.png"];
		yellowDot = [UIImage imageNamed:@"sf_line_dot.png"];
		nameBg = [UIImage imageNamed:@"sf_sat_name_bg.png"];
	}
}

- (id)initWithType:(int)_type {
	self = [super initWithFrame:CGRectMake(0.0, 0.0, 126.0, 46.0)];
    if (self) {
		[self setOpaque:NO];
		[self setBackgroundColor:[UIColor clearColor]];
		type = _type;
		closest = NO;
  }
  return self;
}   

- (void)drawRect:(CGRect)rect {
	if (!type) {
		[yellowDot drawInRect:CGRectMake(59.0, 19.0, 8.0, 8.0)];
	} else {
		if (closest)  [nameBg drawAtPoint:CGPointMake(63.0, 0.0) blendMode:kCGBlendModeNormal alpha:1.0];
		else          [nameBg drawAtPoint:CGPointMake(63.0, 0.0) blendMode:kCGBlendModeNormal alpha:0.25];
		
		if(type == 1)       [purpleDot drawInRect:CGRectMake(54.5, 14.5, 17.0, 17.0)];
		else if(type == 2)  [blueDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		else if(type == 3)  [redDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		else if(type == 4)  [blackDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		
		[[UIColor colorWithRed:0.25 green:0.25 blue:0.25 alpha:1.0] set];
		[satelliteName drawInRect:CGRectMake(63.0, 2.0, 63.0, 21.0) withFont:[UIFont fontWithName:@"Helvetica" size:15.0] lineBreakMode:UILineBreakModeTailTruncation alignment:UITextAlignmentCenter];
	}
}


@end