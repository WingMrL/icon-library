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
    Group.fetch(function(err, groups) {
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