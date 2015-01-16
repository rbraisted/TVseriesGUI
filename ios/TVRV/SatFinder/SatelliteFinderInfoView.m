//≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅≅
//=========================================================================================================================================================
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//·························································································································································

#import "SatelliteFinderInfoView.h"


@implementation SatelliteFinderInfoView

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
  if (IS_IPAD) self = [super initWithFrame:CGRectMake(423.0, 0.0, 345.0, 514.0)];
  else self = [super initWithFrame:CGRectMake(0.0, 0.0, 320.0, 426.0)];

  if (self) {
		[self setOpaque:NO];
		[self setBackgroundColor:[UIColor clearColor]];

		UITextView* textView;
    if (IS_IPAD) textView = [[UITextView alloc] initWithFrame:CGRectMake(20.0, 85.0, 281.0, 350.0)];
    else textView = [[UITextView alloc] initWithFrame:CGRectMake(20.0, 65.0, 281.0, 280.0)];

		NSString* text = [[NSString alloc] initWithFormat:@"SatTrac® Satellite Locater\n"];
		text = [text stringByAppendingString:@"SatTrac uses your mobile device’s camera to display the location of television satellites in the sky. This can be very useful when checking for possible blockage, selecting a satellite, or choosing a docking location with good signal reception.\n\n"];
		text = [text stringByAppendingString:@"Before you begin\n"];
		text = [text stringByAppendingString:@"Ideally, you should use this feature while standing near the antenna and at a similar level. This way, you have a similar view of the satellite as the antenna while using the application. The further you are from the antenna, the less accurately the position of the satellite in the viewfinder matches the view of the antenna.\n\n"];
		text = [text stringByAppendingString:@"Locating the satellite\n"];
		text = [text stringByAppendingString:@"To begin, simply hold up your mobile device to the sky and follow the arrow indicators toward the Clark Belt, which is the belt of satellites located over the equator. Within the belt, satellites are identified by their longitudinal position over the equator. For example, the Hispasat 1C satellite is located at 30°West. To find this satellite using SatTrac, follow the onscreen indicators to the Clark Belt. Then find the satellite labeled 30W on the belt and position it in the center of the screen.\n\n"];
		text = [text stringByAppendingString:@"Checking for blockage\n"];
		text = [text stringByAppendingString:@"Since the antenna requires a clear view of the satellite, objects such as masts, buildings, bridges, trees, and other mounted hardware might interfere with the antenna’s signal collection. If you determine blockage is present, move the vessel, source of blockage, or switch to a different satellite.\n\n"];
		text = [text stringByAppendingString:@"Custom settings\n"];
		text = [text stringByAppendingString:@"Once launched while connected to the TV-series system, satellites displayed are based on what is installed in your TV-series system.\n\n"];
		[textView setText:text];
		[textView setEditable:NO];
		[textView setTextColor:[UIColor whiteColor]];
		[textView setBackgroundColor:[UIColor clearColor]];
		[textView setFont:[UIFont fontWithName:@"Arial" size:15.0]];
		[self addSubview:textView];
		// [textView release];
		
		okButton = [UIButton buttonWithType:UIButtonTypeCustom];
		[okButton setImage:[UIImage imageNamed:@"sf_info_ok_button.png"] forState:UIControlStateNormal];
		[okButton addTarget:self action:@selector(okButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
    if (IS_IPAD) [okButton setFrame:CGRectMake(90.0, 456.0, 135.0, 46.0)];
		else [okButton setFrame:CGRectMake(96.0, 360.0, 128.0, 43.0)];
		[self addSubview:okButton];
  }
  return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)okButtonPressed:(id)sender {
	[self setHidden:YES];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (void)drawRect:(CGRect)rect {
  if (IS_IPAD) [[UIImage imageNamed:@"sf_info_bg.png"] drawInRect:CGRectMake(0.0, 58.0, 322.0, 456.0)];
	else [[UIImage imageNamed:@"sf_info_bg.png"] drawInRect:CGRectMake(9.0, 42.0, 303.0, 374.0)];
}

@end
