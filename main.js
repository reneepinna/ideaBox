// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');

// global variables

var userIdeas = [];

// event listeners

saveButton.addEventListener('click', function() {
  if(titleInput.value && bodyInput.value) {
    saveUserInput();
  }
   
});

// functions

function saveUserInput() {
    var newUserIdea = createUserObject(titleInput.value, bodyInput.value);
    userIdeas.push(newUserIdea);
    console.log(userIdeas);
}

function createUserObject(titleInput, bodyInput) {
    return {
    title: titleInput,
    body: bodyInput,
    id: Date.now(),
    }
}


