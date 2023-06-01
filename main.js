// query selectors

var titleInput = document.querySelector('#title')

var bodyInput = document.querySelector('#body');

var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');

// global variables

var userIdeas = [];

// event listeners

saveButton.addEventListener('click', function(event){
    saveUserInput(event);
    addUserIdeaCard(event);
});

// functions

function saveUserInput() {
    var newUserIdea = createUserObject(titleInput.value, bodyInput.value)
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

function addUserIdeaCard(){
    ideaGrid.innerHTML = '';
    for (var i = 0; i < userIdeas.length; i++) {
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${userIdeas[i].id}'>
            <h2>${userIdeas[i].title}</h2>
            <h4>${userIdeas[i].body}</h4></article>`
    }
    clearUserInput()
}

function clearUserInput(){
    titleInput.value ='';
    bodyInput.value='';
}