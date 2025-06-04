window.addCard = function(front, back) {
  if (window.cordova && cordova.plugins && cordova.plugins.ankidroid) {
    cordova.plugins.ankidroid.addCard(front, back, function() {
      console.log('Card added');
    }, function(err) {
      console.error('Failed to add card', err);
    });
  } else {
    console.log('AnkiDroid plugin not available');
  }
};
