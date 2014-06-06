//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteViewCrosshairView.h"


@implementation SatelliteViewCrosshairView

@synthesize state;

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
  if (IS_IPAD) self = [super initWithFrame:CGRectMake(277.0, 405.0, 214.0, 214.0)];
  else self = [super initWithFrame:CGRectMake(89.0, 142.0, 143.0, 142.0)];

  if (self) {
		state = 0;
		[self setOpaque:NO];
		[self setBackgroundColor:[UIColor clearColor]];
  }
  return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)setState:(int)_state {
	state = _state;
	[self setNeedsDisplay];
}

//~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
	CGContextRef context = UIGraphicsGetCurrentContext();
  if (IS_IPAD) CGContextClearRect(context, CGRectMake(0.0, 0.0, 214.0, 214.0));
	else CGContextClearRect(context, CGRectMake(0.0, 0.0, 143.0, 142.0));

  CGRect pointerRect;
  if (IS_IPAD) pointerRect = CGRectMake(0.0, 0.0, 214.0, 214.0);
  else pointerRect = CGRectMake(0.0, 0.0, 143.0, 142.0);

	if (!state)          [[UIImage imageNamed:@"sf_crosshair.png"] drawInRect:pointerRect];
	else if (state == 1) [[UIImage imageNamed:@"sf_pointer_up.png"] drawInRect:pointerRect];
	else if (state == 2) [[UIImage imageNamed:@"sf_pointer_right.png"] drawInRect:pointerRect];
	else if (state == 3) [[UIImage imageNamed:@"sf_pointer_left.png"] drawInRect:pointerRect];
	else if (state == 4) [[UIImage imageNamed:@"sf_pointer_down.png"] drawInRect:pointerRect];
}
//-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

/*	STATES ARE:
	0	CROSSHAIR
	1	POINTERS NORTH HIGHLIGHT
	2	POINTERS EAST HIGHLIGHT
	3	POINTERS WEST HIGHLIGHT
	4	POINTERS SOUTH HIGHLIGHT
	5	POINTERS NO DIRECTION HIGHLIGHT
*/

@end
