let path = require('path');

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = '3000';
const DATABASE_HOST = '127.0.0.1';
const DATABASE_PORT = '27017';
const DATABASE_NAME = 'icon';
const DATABASE_USER ='';
const DATABASE_PASSWORD = '';

let userAndPass = '';
if(DATABASE_USER !== '' && DATABASE_PASSWORD !== '') {
    userAndPass = DATABASE_USER + ':' + DATABASE_PASSWORD + '@';
}

let serverHost = 'http://' + SERVER_HOST + ':' + SERVER_PORT;
if(SERVER_PORT === '80') {
    serverHost = serverHost.replace(`:${SERVER_PORT}`, '');
}
let dbUrl = 'mongodb://' + userAndPass + DATABASE_HOST + ':' + DATABASE_PORT + '/' + DATABASE_NAME;

let config = {
    serverHost,
    dbUrl,
    fileSuffixReg: /\.(png|jpg|svg|jpeg)$/i,
    uploadPath: path.join(__dirname, '..', 'dist', 'upload'),
    serverPort: SERVER_PORT,
}

module.exports = config;