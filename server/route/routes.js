let Group = require('../Controllers/group');
let Icon = require('../Controllers/icon');
// var router = express.Router();

module.exports = function(app) {

    app.post('/api/addGroup', Group.addGroup);
    app.get('/api/getGroups', Group.getGroups);

    app.post('/api/addIcon', Icon.addIcon);
    app.get('/api/getIcons', Icon.getIcons);

    /* GET home page. */
    app.get('/*', function(req, res, next) {
        res.render('index');
    });
};