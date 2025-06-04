var exec = require('cordova/exec');

exports.addCard = function(front, back, success, error) {
    exec(success, error, 'AnkiDroid', 'addCard', [front, back]);
};

exports.addNote = function(note, success, error) {
    exec(success, error, 'AnkiDroid', 'addNote', [note]);
};

exports.getModelFields = function(modelName, success, error) {
    exec(success, error, 'AnkiDroid', 'getModelFields', [modelName]);
};
