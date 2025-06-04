let dictionaryData = {};

fetch('dictionary.json')
  .then(res => res.json())
  .then(data => { dictionaryData = data; });

function lookupDictionary(word) {
  return dictionaryData[word];
}

function showDictionary(word) {
  const entry = lookupDictionary(word);
  if (entry) {
    document.getElementById('dictionary-word').textContent = word;
    document.getElementById('dictionary-meaning').textContent = entry.meaning;
    document.getElementById('dictionary-popup').classList.add('show');
  }
}

document.getElementById('close-dictionary').addEventListener('click', () => {
  document.getElementById('dictionary-popup').classList.remove('show');
});

document.getElementById('add-to-anki').addEventListener('click', () => {
  const word = document.getElementById('dictionary-word').textContent;
  const meaning = document.getElementById('dictionary-meaning').textContent;
  if (window.addCard) {
    window.addCard(word, meaning);
  }
});
