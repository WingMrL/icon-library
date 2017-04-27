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
        let reg = new RegExp(`^${searchName}`, 'i');
        serier({
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
            result = result.labels.concat(result.icons);
            res.json({
                code: 0,
                data: result
            });
        });
    }
    
    
    // Label.find({ $text: { $search: searchName } }
    //         , { score: { $meta: "textScore" }})
    //         .sort({ score: { $meta: "textScore" }})
    //         .limit(20)
    //         .exec()
    //         .then(function(result) {
    //             console.log(result);
    //             res.json({
    //                 code: 0
    //             });
    //         })
    //         .catch(function(err) {
    //             console.log(err);
    //             res.json({
    //                 code: -1
    //             });
    //         });
};