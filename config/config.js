let path = require('path');

let config = {
    serverHost: 'http://localhost:3000',
    fileSuffixReg: /\.(png|jpg|svg|jpeg)$/i,
    dbUrl: 'mongodb://localhost:27017/icon',
    uploadPath: path.join(__dirname, '..', 'dist', 'upload'),
}

module.exports = config;