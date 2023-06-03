// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');
var showStarredButton = document.querySelector('.show-starred-button');

// global variables

var userIdeas = []; //save ALL user ideas
var favoriteUserIdeas = [];

// event listeners

saveButton.addEventListener('click', function(event) {
// when the save button is clicked, IF title and input are filled
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event); // creates a userIdeaObject and pushes it into userIdeas array (title, body, date.now id, isFavorite = false, class = '')
    displayIdeaCards(userIdeas); // display ALL of the userIdeas array
    clearUserInput() // clears the user input
    toggleSaveButtonState(); // The button is a lighter color and not a pointer while inputs are empty
  }
});

bodyInput.addEventListener('keyup', toggleSaveButtonState); //check if BOTH inputs are filled when user types in body input

titleInput.addEventListener('keyup', toggleSaveButtonState); //check if BOTH inputs are filled when user types in title input


ideaGrid.addEventListener('click', function(event) {
  console.log(event.target.className)
  if (event.target.className === 'delete-button') { //if the user clicks a delete button
    deleteUserIdeaCard(event); // remove the card from the user idea array and display ALL user ideas
  }else if (event.target.className.includes('favorite-button')) { //if the user clicks a favorite button
    favoriteUserIdeaCard(event);
  }
});

showStarredButton.addEventListener('click', function() {
  displayIdeaCards(favoriteUserIdeas);
});

// functions

function favoriteUserIdeaCard(event) {
 for (var i = 0; i < userIdeas.length; i++) {
  if(parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
    if  (userIdeas[i].isFavorite) { //if the card is already favorites and user clicks the star button
      userIdeas[i].isFavorite = false; //it should be unfavorited
      favoriteUserIdeas.splice( i, 1); //it should be removed from the favorite user ideas array
      event.target.closest('.favorite-button').classList.remove('active'); //it should show a white star
      userIdeas[i].class = ''; //the class for interpolation should be changed so it will always render correctly

    } else {
      userIdeas[i].isFavorite = true; //if it is not favorited it should be favorited
      favoriteUserIdeas.push(userIdeas[i]); //it should be added to the favorite user ideas array
      event.target.closest('.favorite-button').classList.add('active'); // it should show with an orange star
      userIdeas[i].class = " active"; // it should have the active class for interpolation for rendering

    }
        
    console.log(userIdeas[i])
  }
  }
}

function deleteUserIdeaCard(event) { //possible rename???
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
  }
  displayIdeaCards(userIdeas);
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
}

function toggleSaveButtonState() {
  if (titleInput.value && bodyInput.value) {
    saveButton.classList.add("inputs-filled");
  } else {
    saveButton.classList.remove('inputs-filled');
  }
}

