//  Copyright 2011 KVH Industries, Inc. All rights reserved.

#import <Foundation/Foundation.h>

@interface Satellite : NSObject {
    NSString* listID;
    NSString* antSatID;
    NSString* triSatID;
    NSString* name;
    NSString* region;
    
    float     degLon;
    
    BOOL      favorite;
    BOOL      enabled;
    BOOL      selectable;
    BOOL      selected;
    
    float     rAzLook180;
    float     rElLook180;
}

//<listID>21</listID>
//<antSatID>61W</antSatID>
//<name>Amazonas-2</name>
//<region>North America</region>
//<lon>-61.00</lon>
//<enable>TRUE</enable>
//<favorite>TRUE</favorite>
//<select>TRUE</select>
//<triSatID>FALSE</triSatID>

@property (nonatomic, copy) NSString* listID;
@property (nonatomic, copy) NSString* antSatID;
@property (nonatomic, copy) NSString* triSatID;
@property (nonatomic, copy) NSString* name;
@property (nonatomic, copy) NSString* region;

@property (nonatomic) float degLon;

@property (nonatomic) BOOL  favorite;
@property (nonatomic) BOOL  enabled;
@property (nonatomic) BOOL  selectable;
@property (nonatomic) BOOL  selected;

@property (nonatomic) float rAzLook180;
@property (nonatomic) float rElLook180;

- (id)initWithListID:(NSString*)_listID
        withAntSatID:(NSString*)_antSatID
        withTriSatID:(NSString*)_triSatID
            withName:(NSString*)_name
          withRegion:(NSString*)_region
          withDegLon:(float)_degLon
          isFavorite:(BOOL)_favorite
           isEnabled:(BOOL)_enabled
        isSelectable:(BOOL)_selectable
          isSelected:(BOOL)_selected;

@end
