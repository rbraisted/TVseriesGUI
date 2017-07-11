//
//  BonjourTableViewCell.m
//  TVRO
//
//  Created by Thomas on 4/9/14.
//
//

#import "BonjourTableViewCell.h"

@interface BonjourTableViewCell()

@end

@implementation BonjourTableViewCell

@synthesize hubLabel = _hubLabel;
@synthesize ipLabel = _ipLabel;
@synthesize arrowImage = _arrowImage;
@synthesize backgroundImage = _backgroundImage;

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self)
    {
        // Initialization code
    }
    return self;
}

- (void) setHubName: (NSString*)hubNameText
{
    [self.hubLabel setText:hubNameText];
}

- (void) setIPLabel: (NSString*)ipAddress
{
    [self.ipLabel setText:ipAddress];
}

- (void) setUnselectedBackgroundImage: (UIImage*)unselectedBGImage
{
    unselectedBG = unselectedBGImage;
}

- (void)awakeFromNib
{
    [super awakeFromNib];
    selectedBG       =  [UIImage imageNamed:@"tableCellBGSelected.png"];
    selectedArrow    =  [UIImage imageNamed:@"tableCellArrowSelected.png"];
    unselectedArrow  =  [UIImage imageNamed:@"tableCellArrow.png"];
}

- (void)tableView:(UITableView *)tableView didHighlightRowAtIndexPath:(NSIndexPath *)indexPath
{
    BonjourTableViewCell *cell = (BonjourTableViewCell*)[tableView cellForRowAtIndexPath:indexPath];
    
    [cell.arrowImage setImage: selectedArrow];
}

- (void)setHighlighted:(BOOL)highlighted animated:(BOOL)animated
{
    [super setHighlighted:highlighted animated:animated];

    // Configure the view for the selected state
    if(highlighted)
    {
        [_backgroundImage setImage: selectedBG];
        [_arrowImage setImage: selectedArrow];
    }
    else
    {
        [_backgroundImage setImage: unselectedBG];
        [_arrowImage setImage: unselectedArrow];
    }
}

@end
