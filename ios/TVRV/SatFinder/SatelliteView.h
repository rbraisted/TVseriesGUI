
#import <UIKit/UIKit.h>


@interface SatelliteView : UIView {
	NSString* satelliteName;
	int type;
	BOOL closest;
}

@property (nonatomic, retain) NSString* satelliteName;
@property (nonatomic) BOOL closest;

- (id)initWithType:(int)_type;

@end