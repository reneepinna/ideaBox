// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');

// global variables

var userIdeas = [];

// event listeners

saveButton.addEventListener('click', function(event) {
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event);
    addUserIdeaCard(event);
    toggleSaveButtonState();
  }

});
bodyInput.addEventListener('keyup', toggleSaveButtonState);
titleInput.addEventListener('keyup', toggleSaveButtonState);
ideaGrid.addEventListener('click', function(event) {
  if (event.target.className === 'delete-button') {
    deleteUserIdeaCard(event) 
  }else if (event.target.className === 'favorite-button') {
    favoriteUserIdeaCard(event)
  }
}) 

  


// functions

function favoriteUserIdeaCard(event) {
 for (var i = 0; i < userIdeas.length; i++) {
  if(parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
    userIdeas[i].isFavorite = true;
    event.target.closest('.favorite-button').classList.toggle('active');
    console.log(userIdeas[i])
    }
  }
}

function deleteUserIdeaCard(event) {
  for(var i = 0; i < userIdeas.length; i++) {
    if(parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
    console.log(event.target.closest('.user-idea-card').id)
  }
  addUserIdeaCard();
}

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
    isFavorite: false,
    }
}

function clearUserInput(){
    titleInput.value ='';
    bodyInput.value='';
}

function addUserIdeaCard(){
  ideaGrid.innerHTML = '';
    for (var i = 0; i < userIdeas.length; i++) {
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${userIdeas[i].id}'>
            <header>
              <button class="favorite-button"></button>
              <button class="delete-button">Delete</button>
            </header>
            <h2>${userIdeas[i].title}</h2>
            <h4>${userIdeas[i].body}</h4></article>`
    }
     clearUserInput()
}

function toggleSaveButtonState() {
  if (titleInput.value && bodyInput.value) {
    saveButton.classList.add("inputs-filled");
  } else {
    saveButton.classList.remove('inputs-filled');
  }
}