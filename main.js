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
    displayAllIdeaCards();
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
  displayFavoriteIdeaCards();
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

    }
        
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
  displayAllIdeaCards();
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

function displayAllIdeaCards(){
  ideaGrid.innerHTML = '';
    for (var i = 0; i < userIdeas.length; i++) {
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${userIdeas[i].id}'>
            <header>
              <button class="favorite-button"></button>
              <button class="delete-button"></button>
            </header>
            <h2>${userIdeas[i].title}</h2>
            <h4>${userIdeas[i].body}</h4></article>`
    }

     clearUserInput()
}

function displayFavoriteIdeaCards() {
  ideaGrid.innerHTML = '';
  for (var i = 0; i < favoriteUserIdeas.length; i++) {
      ideaGrid.innerHTML +=
          `<article class='user-idea-card' id='${favoriteUserIdeas[i].id}'>
          <header>
            <button class="favorite-button active"></button>
            <button class="delete-button"></button>
          </header>
          <h2>${favoriteUserIdeas[i].title}</h2>
          <h4>${favoriteUserIdeas[i].body}</h4></article>`
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

