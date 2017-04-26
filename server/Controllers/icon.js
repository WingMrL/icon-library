let mongoose = require('mongoose');

let Icon = mongoose.model('Icon');
let Label = mongoose.model('Label');
let Group = mongoose.model('Group');
let path = require('path');
let serier = require('async/series');
let config = require('../../config/config');
let fs = require('fs');

exports.addIcon = function(req, res) {
    let fileName = req.body.trueName;
    let groupId = req.body.groupId;
    let labelsString = req.body.labels;
    let labels = labelsString == '' ? [] : labelsString.split(',');
    let iconObj = {
        fileName: fileName,
        iconUrl: path.join(groupId, fileName),
        width: req.body.width,
        height: req.body.height,
        group: groupId,
    };

    let _icon = new Icon(iconObj);

    // 保存icon
    _icon.save(function(err, icon) {
        if(err) {
            console.log(err);
        }

        serier([
            function(callback) {
                // label
                if(labels.length > 0) {
                    let saveCount = labels.length;
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
                                            callback(null, '1');
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
                                            callback(null, '1');
                                        }
                                    });
                                });
                                
                            }
                        });
                    });
                } else {
                    callback(null, '1');
                }
            },
            function(callback) {
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
                        callback(null, '2');
                    });
                })
            }
        ], function(err, result) {
            console.log(result);
            res.json({
                code: 0,
                status: 'ok'
            });
        });
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

exports.deleteIcons = function(req, res) {
    let iconsId = req.body.iconsId;

    serier([
        function(callback) {
            Icon.find({ _id: { $in: iconsId } })
                .exec()
                .then(function(icons) {
                    let iconsLength = icons.length;
                    icons.forEach(function(icon) {
                        fs.unlink(`${config.uploadPath}/${icon.iconUrl}`, function(err) {
                            if(err) {
                                console.log(err);
                            }
                            iconsLength --;
                            if(iconsLength == 0) {
                                callback(null, '1');
                            }
                        });
                    });
                })
        },
        function(callback) {
            let count = iconsId.length * 2;
            iconsId.forEach(function(iconId) {
                Icon.findOne({ _id: iconId })
                    .exec()
                    .then(function(icon) {
                        Group.update({ _id: icon.group }
                                ,{ $pull: { "icons": icon._id } }
                                ,{ multi: true })
                            .exec()
                            .then(function(result) {
                                console.log(result);
                                count --;
                                if(count == 0) {
                                    callback(null, '2');
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                                res.json({
                                    code: -2,
                                    msg: 'delete failed'
                                });
                            });
                        Label.update({ icons: icon._id }
                                ,{ $pull: { "icons": icon._id } }
                                ,{ multi: true })
                            .exec()
                            .then(function(result) {
                                console.log(result);
                                count --;
                                if(count == 0) {
                                    callback(null, '2');
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                                res.json({
                                    code: -2,
                                    msg: 'delete failed'
                                });
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.json({
                            code: -2,
                            msg: err
                        });
                    });
            });
        },
        function(callback) {
            Icon.remove({_id: { $in: iconsId }}, function(err, icons) {
                if(err) {
                    console.log(err);
                    res.json({
                        code: -2,
                        msg: 'delete failed'
                    });
                }
                callback(null, '3');
            });
        },
        
    ],
    function(err, result) {
        console.log(result);
        res.json({
            code: 0,
            msg: 'ok'
        });
    });
}