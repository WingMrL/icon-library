let mongoose = require('mongoose');

let Group = mongoose.model('Group');

exports.addGroup = function(req, res) {
    let _group = req.body;
    let group = new Group(_group);

    group.save(function(err, group) {
        if(err) {
            console.log(err);
        }

        res.json({
            code: 0,
            status: 'ok'
        });
    })
};

exports.getGroups = function(req, res) {
    let options = {
        limit: 9,
        sort: {
            'meta.updateAt': -1
        }
    }
    Group.find({})
        .populate('icons', ['iconUrl'], {}, options)
        .exec(function(err, groups) {
            if(err) {
                console.log(err);
            }

            res.json({
                code: 0,
                status: 'ok',
                groups: groups
            });
        });
}

exports.getGroup = function(req, res) {
    let _id = req.query._id;
    let options = {
        sort: {
            'meta.updateAt': -1
        }
    }
    if(_id) {
        Group.findOne({_id: _id})
            .populate({
                path: 'icons',
                select: 'fileName iconUrl width height labels',
                model: 'Icon',
                options: options,
                populate: {
                    path: 'labels',
                    select: 'labelName',
                    model: 'Label'
                }
            })
            .exec(function(err, group) {
                if(err) {
                    console.log(err);
                }
                res.json({
                    code: 0,
                    status: 'ok',
                    group: group
                });
            });
    } else {
        res.json({
            code: -1,
            status: 'params error',
            group: {}
        });
    }
}