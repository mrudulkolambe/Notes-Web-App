function createNote(colorId, title, text) {
  firebase.auth().onAuthStateChanged(function(userData) {
    let note = {
      colorId: colorId,
      title: title,
      text: text,
    }
    if (userData) {
      let userEmail = userData.email;
      let notes = firebase.firestore().collection('users').doc(userEmail).collection('notes').doc().set(note)
      .then(function() {
        displayNotesD(userEmail);
      })
      .catch(function(error) {
        console.log(error);
      })
    } else {
      alertFunction('User Not Found');
    }
  });

}
async function displayNotesD(userEmail) {
  notesContainer.innerHTML = '';
  const snapshot = await firebase.firestore().collection('users').doc(userEmail).collection('notes').get();
  let colors0 = [];
  let colors1 = [];
  let colors2 = [];
  let colors3 = [];
  let colors4 = [];
  let i = 0;
  snapshot.forEach(doc => {
    let id = doc.id;
    i++;
    let circleData = doc.data()
    indiviualCircle(colors0, colors1, colors2, colors3, colors4, circleData);
    let colorVar = doc.data().colorId;
    let title = doc.data().title;
    let text = doc.data().text;
    displaynotes(id, colorVar, title, text, userEmail);
    document.getElementById('totalNotes').innerHTML = `<span>Total Notes : </span>&nbsp;${i}`;
  });
}
async function updateNotes(idEL) {
  let idofEl = idEL.id;
  let finalId = idofEl.slice(5,
    idofEl.length);
  let atrofEl = idEL.attributes.name.value;
  let updatedTitle = document.getElementById(`index1${finalId}`).innerHTML;
  let updatedText = document.getElementById(`index2${finalId}`).innerHTML;
  let doms = firebase.firestore().collection('users').doc(atrofEl).collection('notes').doc(finalId);
  const res = await doms.update({
    title: updatedTitle,
    text: updatedText,
  })
  .then(function() {
    displayNotesD(atrofEl);
    alertFunction('Note Updated');
  })
  .catch(function(error) {
    console.log(error);
  })
}

function displaynotes(id, colorVar, title, text, userEmail) {
  notesContainer.innerHTML += ` <div name="${userEmail}" id="notes${id}" class="notes category${colorVar}" >
  <div id="index1${id}" contenteditable="true" class="content bold">
  ${title}
  </div>
  <div id="index2${id}" contenteditable="true" class="content">
  ${text}
  </div>
  <div class="noteButtons">
  <div id="save${id}" onclick="updateNotes(notes${id})" class="buttons save">
  Save
  </div>
  <div id="edit${id}" onclick="editTxt(notes${id})" class="buttons edit">
  <i class="fas fa-pencil-alt"></i>
  </div>
  <div id="delete${id}" onclick="deleteNote(notes${id})" class="delete buttons">
  <i class="fas fa-trash"></i>
  </div>
  </div>
  </div>
  `;
  animateAddition();
};

function deleteNote(idEl) {
  let elem = idEl.id;
  promptFunction('Do You Want To Delete The Note?',
    elem)
}

function editTxt(idEl) {
  let idofEl = idEl.id;
  let finalId = idofEl.slice(5,
    idofEl.length);
  document.getElementById(`index1${finalId}`).focus();
}

function promptFunction(message, idEl) {
  let promptString = ` <div class="prompt" >
  <div class="promptTxt">
  ${message}
  </div>
  <div class="promptButtons">
  <button id="trueBool" name="${idEl}" onclick="flagFunction(trueBool)" class="pButton ok">
  OK
  </button>
  <button id="falseBool" name="${idEl}" onclick="flagFunction(falseBool)" class="pButton Cancel">
  Cancel
  </button>
  </div>
  </div>
  `;
  document.getElementById('promptId').innerHTML = promptString;
  promptBlur();
}

function flagFunction(key) {
  keyId = key.id;
  let idEl = key.attributes.name.value;
  if (keyId == 'trueBool') {
    promptBlur();
    document.getElementById('promptId').innerHTML = '';
    let finalId = idEl.slice(5,
      idEl.length);
    let atrgoo = document.getElementById(`${idEl}`).getAttribute('name');
    firebase.firestore().collection('users').doc(atrgoo).collection('notes').doc(finalId).delete()
    .then(function() {
      displayNotesD(atrgoo);
      alertId = document.getElementById('alertId').innerHTML = '';
      alertFunction(`Note is Deleted`);
    })
  } else if (keyId == 'falseBool') {
    promptBlur();
    document.getElementById('promptId').innerHTML = '';
    alertId = document.getElementById('alertId').innerHTML = '';
    alertFunction(`Deletion Of Note Cancelled!`);
  }
}

function alertFunction(message) {
  setTimeout(function() {
    let alertTxt = ` <div class="alert" >
    <div class="alertTxt">
    ${message}
    </div>
    </div>
    `;
    let alertId = document.getElementById('alertId');
    alertId.innerHTML = alertTxt;
    alertSlideIn();
    setTimeout(function() {
      alertSlideOut();
      setTimeout(function() {
        alertId.innerHTML = '';
      }, 2000);
    }, 2000);
  }, 2000);
};

function indiviualCircle(colors0, colors1, colors2, colors3, colors4, data) {
  let colors = data.colorId;
  if (colors == 0) {
    colors0.push(colors)
  } else if (colors == 1) {
    colors1.push(colors)
  } else if (colors == 2) {
    colors2.push(colors)
  } else if (colors == 3) {
    colors3.push(colors)
  } else if (colors == 4) {
    colors4.push(colors)
  }
  document.getElementById('categoryNotes').innerHTML = `
  <div class="notesClass1 category0">
  <p>
  ${colors0.length}
  </p>
  </div>
  <div class="notesClass1 category1">
  <p>
  ${colors1.length}
  </p>
  </div>
  <div class="notesClass1 category2">
  <p>
  ${colors2.length}
  </p>
  </div>
  <div class="notesClass1 category3">
  <p>
  ${colors3.length}
  </p>
  </div>
  <div class="notesClass1 category4">
  <p>
  ${colors4.length}
  </p>
  </div>
  `
}