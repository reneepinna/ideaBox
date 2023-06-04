// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');
var toggleFavoriteViewButton = document.querySelector('.show-starred-button');

// global variables

var userIdeas = [];
var favoriteView = false;

// event listeners

saveButton.addEventListener('click', function(event) {
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event);
    determineView();
    clearUserInput();
    toggleSaveButtonState();
  }
});

bodyInput.addEventListener('keyup', toggleSaveButtonState);

titleInput.addEventListener('keyup', toggleSaveButtonState);

ideaGrid.addEventListener('click', function(event) {
  if (event.target.className === 'delete-button') {
    deleteUserIdeaCard(event);
  }else if (event.target.className.includes('favorite-button')) {
    console.log("You clicked a favorite button");
    favoriteUserIdeaCard(event);
  }
});

toggleFavoriteViewButton.addEventListener('click', function() {
  if (favoriteView) {
    favoriteView = false;
    determineView();
    toggleFavoriteViewButton.innerText = "Show Starred Ideas";
  } else {
    favoriteView = true;
    determineView();
    toggleFavoriteViewButton.innerText = "Show All Ideas";
  }
});

// functions

function favoriteUserIdeaCard(event) {
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      if (userIdeas[i].isFavorite) {
        userIdeas[i].isFavorite = false;
        userIdeas[i].class = '';
        determineView();
      } else {
        userIdeas[i].isFavorite = true;
        userIdeas[i].class = " active";
        determineView();
      }
    }
  }
}

function deleteUserIdeaCard(event) {
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
  }
  determineView();
}

function saveUserInput() {
  var newUserIdea = createUserObject(titleInput.value, bodyInput.value);
  userIdeas.push(newUserIdea); 
}

function createUserObject(titleInput, bodyInput) {
  return {
    title: titleInput,
    body: bodyInput,
    id: Math.floor(Math.random() * Date.now()),
    isFavorite: false,
    class: '',
  }
}

function clearUserInput(){
  titleInput.value ='';
  bodyInput.value='';
}

function renderCards(i){  
  ideaGrid.innerHTML +=
    `<article class='user-idea-card' id='${userIdeas[i].id}'>
      <header>
        <button class="favorite-button${userIdeas[i].class}"></button>
        <button class="delete-button"></button>
      </header>
      <h2>${userIdeas[i].title}</h2>
      <h4>${userIdeas[i].body}</h4>
    </article>`
}

function determineView() {
  ideaGrid.innerHTML = '';
  if (favoriteView) {
    for (var i = 0; i < userIdeas.length; i++) {
      if (userIdeas[i].isFavorite) {
        renderCards(i);
      }
    }
  } else {
    for (var i = 0; i < userIdeas.length; i++) {
      renderCards(i);
    }
  }
}

function toggleSaveButtonState() {
  if (titleInput.value && bodyInput.value) {
    saveButton.classList.add("inputs-filled");
  } else {
    saveButton.classList.remove('inputs-filled');
  }
}