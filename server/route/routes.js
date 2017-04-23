let Group = require('../Controllers/group');
// var router = express.Router();

module.exports = function(app) {

    app.post('/api/addGroup', Group.addGroup);
    app.get('/api/getGroups', Group.getGroups);

    /* GET home page. */
    app.get('/*', function(req, res, next) {
        res.render('index');
    });
};