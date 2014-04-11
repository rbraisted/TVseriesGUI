//
//  BonjourTableViewCell.h
//  TVRO
//
//  Created by Thomas on 4/9/14.
//
//

#import <UIKit/UIKit.h>

@interface BonjourTableViewCell : UITableViewCell
{
    UIImage* selectedBG;
    UIImage* selectedArrow;
    UIImage* unselectedArrow;
}

@property (nonatomic, weak) IBOutlet UILabel *hubLabel;
@property (nonatomic, weak) IBOutlet UILabel *ipLabel;
@property (nonatomic, weak) IBOutlet UIImageView *arrowImage;
@property (nonatomic, weak) IBOutlet UIImageView *backgroundImage;

@end
