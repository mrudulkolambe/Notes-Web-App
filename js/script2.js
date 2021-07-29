let notesContainer = document.getElementById('notesContainer');
let notesTitle = [];
let notesTxt = [];
let notesColorId = [];

function domLoaded() {
  let classesContainer = document.getElementById('classesContainer');
  let notesContainer = document.getElementById('notesContainer');
  for (var i = 0; i <= 4; i++) {
    classesContainer.innerHTML += `<div id="${i}" onclick="addNote(this.id)" class="noteClass category${i}"></div>`;
  };
};

function addNote(colorId) {
  notesColorId.push(colorId);
  let title = 'Title';
  let text = 'Enter The Note';
  createNote(colorId, title, text);
  notesTitle.push(title);
  notesTxt.push(text);
  takeIn();
};

function search() {
  let query = document.getElementById('searchBar').value;
  query = query.toLowerCase();
  document.getElementById('searchBtn').style.display = 'block'
  for (var i = notesColorId.length-1; i >= 0; i--) {
    document.getElementById(`notes${i}`).style.display = 'none';
    let notesSearchTitle = notesTitle[i];
    let noteSearchTxt = notesTxt[i];
    if (notesSearchTitle.includes(query) || noteSearchTxt.includes(query)) {
      document.getElementById(`notes${i}`).style.display = 'flex';
    }
  }
}

function empty() {
  let query = document.getElementById('searchBar');
  query.innerHTML = '';
  query.value = '';
}