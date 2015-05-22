
#import "Satellite.h"


@implementation Satellite

@synthesize listID, antSatID, triSatID, name, region, degLon, favorite, enabled, selectable, selected, rAzLook180, rElLook180;

// note to self: with vs and        andSlot:
//=========================================================================================================================================================
#pragma mark -
#pragma mark - Uh this is it.
//=========================================================================================================================================================

//---------------------------------------------------------------------------------------------------------------------------------------------------------
- (id)init {
	self = [super init];
	return self;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
//- (id)initWithRegion:(NSString*)_region withAntSatID:(NSString*)_antSatID withName:(NSString*)_name 
//          withDegLon:(float)_degLon withAzLook180:(float)_rAzLook180 withElLook180:(float)_rElLook180
//          isFavorite:(BOOL)_favorite isEnabled:(BOOL)_enabled isSelectable:(BOOL)_selectable isTriSat:(NSString*)_triSat {
- (id)initWithListID:(NSString*)_listID
		withAntSatID:(NSString*)_antSatID
		withTriSatID:(NSString*)_triSatID
			withName:(NSString*)_name 
		  withRegion:(NSString*)_region
          withDegLon:(float)_degLon
		  isFavorite:(BOOL)_favorite
		   isEnabled:(BOOL)_enabled
		isSelectable:(BOOL)_selectable
          isSelected:(BOOL)_selected {

	self = [super init];
	if (self) {
		listID = [_listID copy];
		antSatID = [_antSatID copy];
		name = [_name copy];
		region = [_region copy];
        degLon = _degLon;
		favorite = _favorite;
		enabled = _enabled;
        selectable = _selectable;
        selected = _selected;
        triSatID = _triSatID;
	}
	return self;
}

@end