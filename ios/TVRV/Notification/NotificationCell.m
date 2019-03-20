//
//  NotificationCell.m
//  hd7_icontrol
//
//  Created by Nandpal Jethanand on 7/31/17.
//
//

#import "NotificationCell.h"

@implementation NotificationCell

- (void)awakeFromNib {
    [super awakeFromNib];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

- (void)setBounds:(CGRect)bounds {
    [super setBounds:bounds];
    self.contentView.frame = self.bounds;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    // Auto increase height depends on notification text
    [self.contentView updateConstraintsIfNeeded];
    [self.contentView layoutIfNeeded];
    self.notificationTextLabel.preferredMaxLayoutWidth = CGRectGetWidth(self.notificationTextLabel.frame);
}

@end
