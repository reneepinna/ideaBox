// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');

// global variables

var userIdeas = [];

// event listeners

saveButton.addEventListener('click', function() {
  if (titleInput.value && bodyInput.value) {
    saveUserInput();
  }

});

titleInput.addEventListener('keyup', function() {
  if (titleInput.value && bodyInput.value) {
    saveButton.style.background = "green";
  } else {
    saveButton.style.background = "#1F1F3C"
  }

})

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

//need to create a function to change the color of the button
//function should have an if statement
// give input field ID in html
//document.getElementById(idgoeshere).value !==""

