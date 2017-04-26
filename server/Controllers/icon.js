let mongoose = require('mongoose');

let Icon = mongoose.model('Icon');
let Label = mongoose.model('Label');
let Group = mongoose.model('Group');
let path = require('path');

exports.addIcon = function(req, res) {
    let fileName = req.body.trueName;
    let groupId = req.body.groupId;
    let labels = req.body.labels.split(',');
    let iconObj = {
        fileName: fileName,
        iconUrl: path.join(groupId, fileName),
        width: req.body.width,
        height: req.body.height,
        group: groupId,
    };

    let _icon = new Icon(iconObj);


    let saveCount = labels.length + 1;
    // 保存icon
    _icon.save(function(err, icon) {
        if(err) {
            console.log(err);
        }
        // label
        if(labels.length > 0) {
            // 对每一个label进行查找
            labels.forEach(function(value) {
                Label.findByLabelName(value, function(err, label) {
                    if(label == null) {
                        // 新建 label
                        let _label = new Label({
                            labelName: value,
                            icons: [icon._id] //保存icon到label中
                        });
                        _label.save(function(err, label) {
                            if(err) {
                                console.log(err);
                            }
                            // 保存label到icon中
                            icon.labels.push(label._id);
                            icon.save(function(err, icon) {
                                if(err) {
                                    console.log(err);
                                }
                                saveCount --;
                                if(saveCount == 0) {
                                    res.json({
                                        code: 0,
                                        status: 'ok',
                                        icon: icon
                                    });
                                }
                            });
                        });
                    } else {
                        label.icons.push(icon._id);//保存icon到label中
                        label.save(function(err, label) {
                            if(err) {
                                console.log(err);
                            }
                            // 保存label到icon中
                            icon.labels.push(label._id);
                            icon.save(function(err, icon) {
                                if(err) {
                                    console.log(err);
                                }
                                saveCount --;
                                if(saveCount == 0) {
                                    res.json({
                                        code: 0,
                                        status: 'ok',
                                        icon: icon
                                    });
                                }
                            });
                        });
                        
                    }
                });
            });
        }

        // group
        Group.findById(groupId, function(err, group) {
            if(err) {
                console.log(err);
            }
            group.icons.push(icon._id);
            group.save(function(err, group) {
                if(err) {
                    console.log(err);
                }
                saveCount --;
                if(saveCount == 0) {
                    res.json({
                        code: 0,
                        status: 'ok'
                    });
                }
            });
        })
    });
};

exports.getIcons = function(req, res) {
    Icon.fetch(function(err, icons) {
        if(err) {
            console.log(err);
        }

        res.json({
            code: 0,
            status: 'ok',
            icons: icons
        });
    });
}