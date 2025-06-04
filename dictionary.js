let dictionaryData = {};

fetch('dictionary.json')
  .then(res => res.json())
  .then(data => { dictionaryData = data; });

function lookupDictionary(word) {
  return dictionaryData[word];
}

function showDictionary(word, sentence = '') {
  const entry = lookupDictionary(word);
  if (entry) {
    document.getElementById('dictionary-word').textContent = word;
    document.getElementById('dictionary-reading').textContent = entry.reading || '';
    document.getElementById('dictionary-meaning').textContent = entry.meaning;
    document.getElementById('dictionary-sentence').textContent = sentence;
    document.getElementById('dictionary-popup').classList.add('show');
    window.currentSentence = sentence;
  }
}

document.getElementById('close-dictionary').addEventListener('click', () => {
  document.getElementById('dictionary-popup').classList.remove('show');
});

document.getElementById('add-to-anki').addEventListener('click', () => {
  const word = document.getElementById('dictionary-word').textContent;
  const reading = document.getElementById('dictionary-reading').textContent;
  const meaning = document.getElementById('dictionary-meaning').textContent;
  const sentence = document.getElementById('dictionary-sentence').textContent;
  if (window.addNote && window.ankiSettings) {
    const fields = new Array(window.ankiSettings.fields.length).fill('');
    const map = window.ankiSettings.mapping;
    if (map.word !== undefined) fields[map.word] = word;
    if (map.explanation !== undefined) fields[map.explanation] = meaning + (reading ? ` (${reading})` : '');
    if (map.sentence !== undefined) fields[map.sentence] = sentence;
    window.addNote({
      deckName: window.ankiSettings.deckName,
      modelName: window.ankiSettings.modelName,
      fields: fields,
      tags: ['JapanAnime']
    });
  }
});
