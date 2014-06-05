
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
	if(self == [SatelliteView class]) {
		blackDot = [UIImage imageNamed:@"sf_sat_black.png"];
		blueDot = [UIImage imageNamed:@"sf_sat_blue.png"];
		purpleDot = [UIImage imageNamed:@"sf_sat_purple.png"];
		redDot = [UIImage imageNamed:@"sf_sat_red.png"];
		yellowDot = [UIImage imageNamed:@"sf_line_dot.png"];
		nameBg = [UIImage imageNamed:@"sf_sat_name_bg.png"];
	}
}

- (id)initWithType:(int)_type {
//    self = [super initWithFrame:CGRectMake(0.0, 0.0, 80.0, 80.0)];
	self = [super initWithFrame:CGRectMake(0.0, 0.0, 126.0, 46.0)];
    if (self) {
		[self setOpaque:NO];
		[self setBackgroundColor:[UIColor clearColor]];
		type = _type;
		closest = NO;
    }
    return self;
}   

/*
- (void)drawRect:(CGRect)rect {
    CGContextRef context = UIGraphicsGetCurrentContext();
	CGRect circle = (type ? CGRectMake(33.0, 33.0, 14.0, 14.0) : CGRectMake(37.5, 37.5, 5.0, 5.0));
    
	if(type == 0)       [[UIColor greenColor] set];  // clarke belt
	else if(type == 1)  [[UIColor purpleColor] set]; // favorite and enabled
	else if(type == 2)  [[UIColor blueColor] set];    // enabled
	else if(type == 3)  [[UIColor redColor] set];   // favorite
	else if(type == 4)  [[UIColor blackColor] set];  // currently selected

    CGContextFillEllipseInRect(context, circle);
    [[UIColor whiteColor] set];
    CGContextStrokeEllipseInRect(context, circle);

	if(type) {
		[[UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.25] set];
		CGRect rectangle = CGRectMake(0.0, 0.0, 80.0, 30.0);
		CGContextFillRect(context, rectangle);
		[[UIColor colorWithRed:0.25 green:0.25 blue:0.25 alpha:1.0] set];
		[satelliteName drawInRect:CGRectMake(0.0, 4.0, 80.0, 20.0) withFont:[[UIFont fontWithName:@"Helvetica" size:20.0] retain] lineBreakMode:UILineBreakModeTailTruncation alignment:UITextAlignmentCenter];
	}
}
 */

/*
- (void)drawRect:(CGRect)rect {
//    CGContextRef context = UIGraphicsGetCurrentContext();
	if(!type) {
		[yellowDot drawInRect:CGRectMake(36.0, 36.0, 8.0, 8.0)];
	} else {
		if(closest)	[nameBg drawAtPoint:CGPointMake(40.0, 17.0) blendMode:kCGBlendModeNormal alpha:1.0];
		else		[nameBg drawAtPoint:CGPointMake(40.0, 17.0) blendMode:kCGBlendModeNormal alpha:0.25];
		
		if(type == 1)		[purpleDot drawInRect:CGRectMake(31.5, 31.5, 17.0, 17.0)];
		else if(type == 2)	[blueDot drawInRect:CGRectMake(31.5, 32.0, 17.0, 16.0)];
		else if(type == 3)	[redDot drawInRect:CGRectMake(31.5, 32.0, 17.0, 16.0)];
		else if(type == 4)	[blackDot drawInRect:CGRectMake(31.5, 32.0, 17.0, 16.0)];
		
		[[UIColor colorWithRed:0.25 green:0.25 blue:0.25 alpha:1.0] set];
		[satelliteName drawInRect:CGRectMake(0.0, 4.0, 80.0, 20.0) withFont:[[UIFont fontWithName:@"Helvetica" size:20.0] retain] lineBreakMode:UILineBreakModeTailTruncation alignment:UITextAlignmentCenter];
	}
}
*/

- (void)drawRect:(CGRect)rect {
	if(!type) {
		[yellowDot drawInRect:CGRectMake(59.0, 19.0, 8.0, 8.0)];
	} else {
		if(closest)	[nameBg drawAtPoint:CGPointMake(63.0, 0.0) blendMode:kCGBlendModeNormal alpha:1.0];
		else		[nameBg drawAtPoint:CGPointMake(63.0, 0.0) blendMode:kCGBlendModeNormal alpha:0.25];
		
		if(type == 1)		[purpleDot drawInRect:CGRectMake(54.5, 14.5, 17.0, 17.0)];
		else if(type == 2)	[blueDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		else if(type == 3)	[redDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		else if(type == 4)	[blackDot drawInRect:CGRectMake(54.5, 15.0, 17.0, 16.0)];
		
		[[UIColor colorWithRed:0.25 green:0.25 blue:0.25 alpha:1.0] set];
		[satelliteName drawInRect:CGRectMake(63.0, 2.0, 63.0, 21.0) withFont:[UIFont fontWithName:@"Helvetica" size:15.0] lineBreakMode:UILineBreakModeTailTruncation alignment:UITextAlignmentCenter];
	}
}


@end