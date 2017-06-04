let mongoose = require('mongoose');

let Icon = mongoose.model('Icon');
let Label = mongoose.model('Label');
let Group = mongoose.model('Group');
let serier = require('async/series');
let config = require('../../config/config');

exports.suggestion = function(req, res) {
    let searchName = req.body.searchName;
    if(searchName == '') {
        res.json({
            code: -1,
            data: []
        });
    } else {
        // 搜索建议必须是以搜索词开头的的模糊搜索
        let reg = new RegExp(`^${searchName}`, 'i');
        serier({
            groups: function(callback) {
                Group.find({ groupName: reg }
                    , { groupName: 1 })
                    .exec()
                    .then(function(result) {
                        result = result.map(function(value) {
                            return {
                                text: value.groupName,
                                _id: value._id
                            };
                        });
                        callback(null, result);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
            labels: function(callback) {
                Label.find({ labelName: reg }
                    , { labelName: 1 })
                    .exec()
                    .then(function(result) {
                        result = result.map(function(value) {
                            return {
                                text: value.labelName,
                                _id: value._id
                            };
                        });
                        callback(null, result);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
            icons: function(callback) {
                Icon.find({ fileName: reg }
                    , { fileName: 1 })
                    .exec()
                    .then(function(result) {
                        
                        result = result.map(function(value) {
                            return {
                                text: value.fileName.replace(/-timestamp\d+/, '').replace(config.fileSuffixReg, ''),
                                _id: value._id
                            };
                        });
                        callback(null, result);
                        
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        }, function(err, result) {
            result = result.groups.concat(result.labels, result.icons);
            // console.log(result);
            let resultNameArr = result.map(function(v) {
                return v.text;
            });
            let uniqueNameArr = [];
            let repetitiveIndexes = [];
            resultNameArr.forEach(function(v, i) {
                if(uniqueNameArr.indexOf(v) > -1) {
                    repetitiveIndexes.push(i);
                } else {
                    uniqueNameArr.push(v);
                }
            });
            repetitiveIndexes.reverse();
            repetitiveIndexes.forEach(function(v) {
                result.splice(v, 1);
            });
            res.json({
                code: 0,
                data: result,
            });
        });
    }
};

exports.search = function(req, res) {
    let { searchName, currentPage, numbersInPage, filterObj } = req.body;
    // 模糊搜索
    let reg = new RegExp(`${searchName}`, 'i');
    serier({
        group: function(callback) {
            Group.find({ groupName: searchName }
                    , { groupName: 1 })
                .exec()
                .then(function(result) {
                    if(result.length > 0) {
                        Group.findOne({ _id: result[0]._id })
                            .populate({
                                path: 'icons',
                                options: {
                                    sort: {
                                        'meta.updateAt': -1
                                    }
                                },
                                populate: {
                                    path: 'labels',
                                    select: 'labelName classification',
                                    model: 'Label'
                                }})
                            .exec()
                            .then(function(result) {
                                callback(null, result);
                            })
                            .catch(function(err) {
                                console.log(err);
                            })
                    } else {
                        callback(null, {});
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        label: function(callback) {
            Label.find({ labelName: searchName }
                    , { labelName: 1 })
                .exec()
                .then(function(result) {
                    if(result.length > 0) {
                        Label.findOne({ _id: result[0]._id })
                            .populate({
                                path: 'icons',
                                options: {
                                    sort: {
                                        'meta.updateAt': -1
                                    }
                                },
                                populate: {
                                    path: 'labels',
                                    select: 'labelName classification',
                                    model: 'Label'
                                }})
                            .exec()
                            .then(function(result) {
                                callback(null, result);
                            })
                            .catch(function(err) {
                                console.log(err);
                            })
                    } else {
                        callback(null, {});
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        icons: function(callback) {
            Icon.find({ fileName: reg })
                .populate({
                    path: 'labels',
                    options: {
                        sort: {
                            'meta.updateAt': -1
                        }
                    }})
                .exec()
                .then(function(result) {
                    callback(null, result);
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
    }, function(err, result) {
        let icons = []; // 要给前端显示的所有icons
        let group = {}; // 要给前端显示的组对象
        let iconsInGroup; // 组内的icons， 只包含iconUrl字段

        // 如果有groupName，则查找到了group
        if(result.group.groupName) {

            // 搜索到的组，组里面的所有icons都要显示在搜索结果中
            icons = icons.concat(result.group.icons);

            // 前端显示组对象只要显示前9个icons，并且每个icon只要包含iconUrl就可以了。
            iconsInGroup = result.group.icons.slice(0, 9).map(function(value) {
                return {
                    _id: value._id,
                    iconUrl: value.iconUrl
                }
            });
            group = { // 重新封装group对象
                _id: result.group._id,
                groupName: result.group.groupName,
                groupEngName: result.group.groupEngName,
                groupIconUrl: result.group.groupIconUrl,
                icons: iconsInGroup,
                meta: result.group.meta
            };
        }

        // 如果有搜索到标签，则把标签里的图标添加到要显示的icons里面
        if(result.label.labelName) {
            icons = icons.concat(result.label.icons);
        }

        // 把模糊搜索到的图标添加到icons里
        icons = icons.concat(result.icons);

        // 按标签进行过滤
        if(filterObj && (filterObj.size || filterObj.platform)) {
            icons = icons.filter(function(icon) {
                let returnFlag = false;
                icon.labels.forEach(function(label) {
                    console.log(label);
                    if((label.classification == '尺寸' && label.labelName == filterObj.size) 
                        || (label.classification == '平台' && label.labelName == filterObj.platform)) {
                        returnFlag = true;
                    }
                });
                return returnFlag
            });
        }

        // 分页处理
        let iconsIdArr = icons.map(function(v) {
            return v._id;
        });
        let iconsIdArrTemp = [];
        let indexArr = [];
        iconsIdArr.forEach(function(v, i) {
            if(iconsIdArrTemp.indexOf(v) > -1) {
                indexArr.push(i);
            } else {
                iconsIdArrTemp.push(v);
            }
        });
        indexArr.reverse();
        indexArr.forEach(function(v) {
            icons.splice(v, 1);
        });
        let totalIcons = icons.length;
        let totalPages = Math.ceil(totalIcons / numbersInPage);
        if(totalPages == 0) {
            totalPages ++;
        }
        let startIndex = (currentPage - 1) * numbersInPage;
        let endIndex = startIndex + numbersInPage;
        icons = icons.slice(startIndex, endIndex);
        res.json({
            code: 0,
            result: {
                group,
                icons,
            },
            totalPages,
            totalIcons
        });
    });
}