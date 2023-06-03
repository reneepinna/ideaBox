// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');
var showStarredButton = document.querySelector('.show-starred-button');

// global variables

var userIdeas = [];
var favoriteUserIdeas = [];

// event listeners

saveButton.addEventListener('click', function(event) {
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event);
    displayIdeaCards(userIdeas);
    toggleSaveButtonState();
  }

});
bodyInput.addEventListener('keyup', toggleSaveButtonState);
titleInput.addEventListener('keyup', toggleSaveButtonState);
ideaGrid.addEventListener('click', function(event) {
  console.log(event.target.className)
  if (event.target.className === 'delete-button') {
    deleteUserIdeaCard(event) 
  }else if (event.target.className.includes('favorite-button')) {
    favoriteUserIdeaCard(event)
  }
});

showStarredButton.addEventListener('click', function() {
  displayIdeaCards(favoriteUserIdeaCard);
});

// functions

function favoriteUserIdeaCard(event) {
 for (var i = 0; i < userIdeas.length; i++) {
  if(parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
    if  (userIdeas[i].isFavorite) {
      userIdeas[i].isFavorite = false;
      favoriteUserIdeas.splice( i, 1);
      event.target.closest('.favorite-button').classList.remove('active');

    } else {
      userIdeas[i].isFavorite = true;
      favoriteUserIdeas.push(userIdeas[i]);
      event.target.closest('.favorite-button').classList.add('active');
      userIdeas[i].class = " active"

    }
        
    console.log(userIdeas[i])
  }
  }
}

function deleteUserIdeaCard(event) {
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
  }

  for (var i = 0; i < favoriteUserIdeaCard.length; i++){
    if(parseInt(event.target.closest('.user-idea-card').id) === favoriteUserIdeas[i].id) {
      favoriteUserIdeas.splice(i, 1);
    } 
  }
  displayIdeaCards(userIdeas);
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
    class: ''
    }
}

function clearUserInput(){
    titleInput.value ='';
    bodyInput.value='';
}

function displayIdeaCards(ideas){
  ideaGrid.innerHTML = '';
    for (var i = 0; i < ideas.length; i++) {
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${ideas[i].id}'>
            <header>
              <button class="favorite-button${ideas[i].class}"></button>
              <button class="delete-button"></button>
            </header>
            <h2>${ideas[i].title}</h2>
            <h4>${ideas[i].body}</h4></article>`
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

