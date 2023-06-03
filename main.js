// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');
var toggleFavoriteViewButton = document.querySelector('.show-starred-button');

// global variables

var userIdeas = []; //save ALL user ideas
var favoriteView = false;

// event listeners

saveButton.addEventListener('click', function(event) {
// when the save button is clicked, IF title and input are filled
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event); // creates a userIdeaObject and pushes it into userIdeas array (title, body, date.now id, isFavorite = false, class = '')
    determineView();
    clearUserInput() // clears the user input
    toggleSaveButtonState(); // The button is a lighter color and not a pointer while inputs are empty
  }
});

bodyInput.addEventListener('keyup', toggleSaveButtonState); //check if BOTH inputs are filled when user types in body input

titleInput.addEventListener('keyup', toggleSaveButtonState); //check if BOTH inputs are filled when user types in title input


ideaGrid.addEventListener('click', function(event) {
  if (event.target.className === 'delete-button') { //if the user clicks a delete button
    deleteUserIdeaCard(event); // remove the card from the user idea array and display ALL user ideas
  }else if (event.target.className.includes('favorite-button')) { //if the user clicks a favorite button
    console.log("You clicked a favorite button");
    favoriteUserIdeaCard(event);
  }
});

toggleFavoriteViewButton.addEventListener('click', function() {

  if (favoriteView) {
    favoriteView = false;
    determineView();
  } else {
    favoriteView = true;
    determineView();
  }
});

// functions

function favoriteUserIdeaCard(event) {
  for (var i = 0; i < userIdeas.length; i++) {
    console.log("entering the for loop");
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      console.log("identify which care was clicked", userIdeas[i]);
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

function deleteUserIdeaCard(event) { //possible rename???
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
  }
  determineView();
}

function saveUserInput() {
    var newUserIdea = createUserObject(titleInput.value, bodyInput.value); //creates a new object
    userIdeas.push(newUserIdea); 
    console.log(userIdeas); 
}

function createUserObject(titleInput, bodyInput) {
    return {
    title: titleInput,
    body: bodyInput,
    id: Math.floor(Math.random() * Date.now()),
    isFavorite: false,
    class: ''
    }
}

function clearUserInput(){
    titleInput.value ='';
    bodyInput.value='';
}

function renderCards(i){  
  console.log(i)
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${userIdeas[i].id}'>
            <header>
              <button class="favorite-button${userIdeas[i].class}"></button>
              <button class="delete-button"></button>
            </header>
            <h2>${userIdeas[i].title}</h2>
            <h4>${userIdeas[i].body}</h4></article>`
}

function determineView() {
  ideaGrid.innerHTML = '';

  if (favoriteView) {
    console.log("you actually made it to the fav veiw")
    for (var i = 0; i < userIdeas.length; i++) {
      console.log("you are in the fav view render for loop")
      if(userIdeas[i].isFavorite){
        renderCards(i);
      }
    }
  } else {
    console.log("you are in the main view render for loop")

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

