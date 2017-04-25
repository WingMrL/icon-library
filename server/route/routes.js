let Group = require('../Controllers/group');
let Icon = require('../Controllers/icon');
let Label = require('../Controllers/label');
let upload = require('../Controllers/uploadFile');
// var router = express.Router();

module.exports = function(app) {

    app.post('/api/addGroup', Group.addGroup);
    app.get('/api/getGroups', Group.getGroups);

    // app.post('/api/addIcon', Icon.addIcon);
    app.get('/api/getIcons', Icon.getIcons);

    app.post('/api/addLabel', Label.addLabel);
    app.get('/api/getLabels', Label.getLabels);

    app.post('/api/uploadIcon', upload.single('icon'), Icon.addIcon);

    /* GET home page. */
    app.get('/*', function(req, res, next) {
        res.render('index');
    });
};