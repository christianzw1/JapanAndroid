// Global settings for AnkiDroid integration. They can be configured by the user
// through the settings modal in the app. Defaults are provided so that the
// feature works even if the configuration was never changed.
window.ankiSettings = JSON.parse(localStorage.getItem('ankiSettings') || '{}');
if (!window.ankiSettings.deckName) window.ankiSettings.deckName = 'Default';
if (!window.ankiSettings.modelName) window.ankiSettings.modelName = 'Basic';
if (!window.ankiSettings.fields) window.ankiSettings.fields = ['Front', 'Back'];
if (!window.ankiSettings.mapping) {
  window.ankiSettings.mapping = {
    word: 0,
    sentence: 1,
    explanation: 1
  };
}

window.addNote = function(note) {
  if (window.cordova && cordova.plugins && cordova.plugins.ankidroid && cordova.plugins.ankidroid.addNote) {
    cordova.plugins.ankidroid.addNote(note, function() {
      console.log('Note added');
    }, function(err) {
      console.error('Failed to add note', err);
    });
  } else {
    console.log('AnkiDroid plugin not available');
  }
};

window.getModelFields = function(modelName, callback) {
  if (window.cordova && cordova.plugins && cordova.plugins.ankidroid && cordova.plugins.ankidroid.getModelFields) {
    cordova.plugins.ankidroid.getModelFields(modelName, callback, function(err) {
      console.error('Failed to fetch model fields', err);
      callback(['Front', 'Back']);
    });
  } else {
    callback(['Front', 'Back']);
  }
};

// Backwards compatibility with the old addCard helper
window.addCard = function(front, back) {
  window.addNote({
    deckName: window.ankiSettings.deckName,
    modelName: window.ankiSettings.modelName,
    fields: [front, back],
    tags: ['JapanAnime']
  });
};
