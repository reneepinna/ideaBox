var titleInput = document.querySelector('#title')

var bodyInput = document.querySelector('#body');

var saveButton = document.querySelector('.save-button');

var userTitles = [];
var userBodies = [];

console.log(titleInput.value);

// event listeners

saveButton.addEventListener('click', saveUserInput);



// functions

function saveUserInput() {
   
    
    userTitles.push(titleInput.value);
    userBodies.push(bodyInput.value);
    console.log(userBodies, userTitles)
}

// function createUserObject(titleInput, bodyInput) {
//     console.log(bodyInput);
    
//     var currentIdeaObject = {
//     title: titleInput,
//     body: bodyInput,
//     id: Date.now(),
//     }
// }