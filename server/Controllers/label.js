let mongoose = require('mongoose');

let Label = mongoose.model('Label');

exports.addLabel = function(req, res) {
    let _label = req.body;
    let label = new Label(_label);

    label.save(function(err, label) {
        if(err) {
            console.log(err);
        }

        res.json({
            code: 0,
            status: 'ok'
        });
    })
};

exports.getLabels = function(req, res) {
    Label.find({})
        .sort('meta.createAt')
        .exec()
        .then((labels) => {
            res.json({
                code: 0,
                status: 'ok',
                labels: labels
            });
        })
        .catch((err) => {
            console.log(err);
        });
}