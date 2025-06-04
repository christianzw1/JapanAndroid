var exec = require('cordova/exec');

exports.addCard = function(front, back, success, error) {
    exec(success, error, 'AnkiDroid', 'addCard', [front, back]);
};
