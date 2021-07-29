let userPic = document.getElementById('userPic');
let name1 = document.getElementById('name1');
let email1 = document.getElementById('email1');
let signOutBtn = document.getElementById('signOut');
let signInBtn = document.getElementById('signIn');
//let createAccBtn = document.getElementById('createAccBtn');
let dataMap;
let notesMap;
async function createAcc() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  stateChange();
}
function signIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

function signOut() {
  firebase.auth().signOut();
  profile();
  notesContainer.innerHTML = '';
  document.getElementById('totalNotes').innerHTML = `<span>Total Notes : </span>&nbsp;0`;
  document.getElementById('categoryNotes').innerHTML = `
  <div class="notesClass1 category0">
  <p>
  0
  </p>
  </div>
  <div class="notesClass1 category1">
  <p>
  0
  </p>
  </div>
  <div class="notesClass1 category2">
  <p>
  0
  </p>
  </div>
  <div class="notesClass1 category3">
  <p>
  0
  </p>
  </div>
  <div class="notesClass1 category4">
  <p>
  0
  </p>
  </div>`
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userPic.src = user.photoURL;
    name1.innerHTML = user.displayName;
    email1.innerHTML = user.email;
    signOutBtn.style.display = 'flex';
    signInBtn.style.display = 'none';
    // createAccBtn.style.display = 'none';
    displayNotesD(user.email);
  } else {
    userPic.src = '';
    name1.innerHTML = 'Please Sign In';
    email1.innerHTML = '';
    signOutBtn.style.display = 'none';
    signInBtn.style.display = 'flex';
    // createAccBtn.style.display = 'flex';
  }
});

function stateChange() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dataMap = {
        Name: user.displayName,
        Email: user.email,
        photoURL: user.photoURL,
      }
      let db = firebase.firestore().doc(`users/${user.email}/data/UserData`).set(dataMap)
      .then(function() {
        alertFunction('Signed In');
      })
      .catch(function(error) {
        console.log(error);
      })
      notesMap = {
        colorId: '',
        title: '',
        text: '',
      }
    } else {
      userPic.src = '';
      name1.innerHTML = 'Please Sign In';
      email1.innerHTML = '';
    }
  });
};