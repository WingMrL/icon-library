let mongoose = require('mongoose');

let Icon = mongoose.model('Icon');

exports.addIcon = function(req, res) {
    let _icon = req.body;
    let icon = new Icon(_icon);

    icon.save(function(err, icon) {
        if(err) {
            console.log(err);
        }

        res.json({
            code: 0,
            status: 'ok'
        });
    })
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