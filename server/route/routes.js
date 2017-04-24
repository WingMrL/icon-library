let Group = require('../Controllers/group');
let Icon = require('../Controllers/icon');
let Label = require('../Controllers/label');
// var router = express.Router();

module.exports = function(app) {

    app.post('/api/addGroup', Group.addGroup);
    app.get('/api/getGroups', Group.getGroups);

    app.post('/api/addIcon', Icon.addIcon);
    app.get('/api/getIcons', Icon.getIcons);

    app.post('/api/addLabel', Label.addLabel);
    app.get('/api/getLabels', Label.getLabels);

    /* GET home page. */
    app.get('/*', function(req, res, next) {
        res.render('index');
    });
};