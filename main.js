// query selectors

var titleInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('.user-ideas-grid');
var toggleFavoriteViewButton = document.querySelector('.show-starred-button');

// global variables

var userIdeas = []; //save ALL user ideas

// event listeners

saveButton.addEventListener('click', function(event) {
// when the save button is clicked, IF title and input are filled
  if (titleInput.value && bodyInput.value) {
    saveUserInput(event); // creates a userIdeaObject and pushes it into userIdeas array (title, body, date.now id, isFavorite = false, class = '')
    // displayIdeaCards(userIdeas); // display ALL of the userIdeas array
    displayIdeaCards();
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
  // if (favoriteView) {
  //   favoriteView = false;
  //   displayIdeaCards(userIdeas);
  // } else {
  //   favoriteView = true;
  //   displayIdeaCards(favoriteUserIdeas);
  // }
});

// functions

function favoriteUserIdeaCard(event) {
//  for (var i = 0; i < userIdeas.length; i++) { 
//   if(parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) { //find out what we clicked on

    // console.log("the useridea isFavorite", userIdeas[i].isFavorite);
    // if  (userIdeas[i].isFavorite) { //if the card is already favorites and user clicks the star button

    //   removeIdeaFromFavorites(userIdeas[i].id);

    //   event.target.closest('.favorite-button').classList.remove('active'); //it should show a white star
    //   userIdeas[i].class = ''; //the class for interpolation should be changed so it will always render correctly
      
    // } else if (!userIdeas[i].isFavorite){

    //   addIdeaToFavorites(userIdeas[i].id)

    //   event.target.closest('.favorite-button').classList.add('active'); // it should show with an orange star
    //   userIdeas[i].class = " active"; // it should have the active class for interpolation for rendering

    // } else {
  //   //   console.log("this conditional failed");
  //   }
  // }
  // }

  for (var i = 0; i < userIdeas.length; i++) {
    console.log("entering the for loop");
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      console.log("identify which care was clicked", userIdeas[i]);
      if (userIdeas[i].isFavorite) {
        
        userIdeas[i].isFavorite = false;
        userIdeas[i].class = '';

        displayIdeaCards();
        
      } else {

        userIdeas[i].isFavorite = true;
        userIdeas[i].class = " active";
       
        displayIdeaCards();
      }
    }
  }
}

// function removeIdeaFromFavorites(ideasId) {
//   //console.log("in the remove idea from favorite buttons")
//   for (var i = 0; i < favoriteUserIdeas.length; i++) {
//     if (favoriteUserIdeas[i].id === ideasId) {
//       userIdeas[i].isFavorite = false; //it should be unfavorited
//       favoriteUserIdeas.splice( i, 1); //it should be removed from the favorite user ideas array
//       //console.log("i am in the for loop in remove function", userIdeas[i])
//     }
//   }
// }

// function addIdeaToFavorites(ideasID) {
//   console.log ("in the add idea to favorites function")

//   for (var i = 0; i < userIdeas.length; i++) {
//     if (userIdeas[i].id === ideasID) {

//       userIdeas[i].isFavorite = true; //if it is not favorited it should be favorited
//       favoriteUserIdeas.push(userIdeas[i]); //it should be added to the favorite user ideas array
//       console.log("i am in the loop in add favorites fucntion", favoriteUserIdeas)
//     }
//   }

// }

function deleteUserIdeaCard(event) { //possible rename???
  for (var i = 0; i < userIdeas.length; i++) {
    if (parseInt(event.target.closest('.user-idea-card').id) === userIdeas[i].id) {
      userIdeas.splice(i, 1);
    } 
  }
  //if (favoriteView){
    //displayIdeaCards(favoriteUserIdeas)
  // else
  // displayIdeaCards(userIdeas);
  displayIdeaCards();
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

function displayIdeaCards(){
  ideaGrid.innerHTML = '';
    for (var i = 0; i < userIdeas.length; i++) {
        ideaGrid.innerHTML +=
            `<article class='user-idea-card' id='${userIdeas[i].id}'>
            <header>
              <button class="favorite-button${userIdeas[i].class}"></button>
              <button class="delete-button"></button>
            </header>
            <h2>${userIdeas[i].title}</h2>
            <h4>${userIdeas[i].body}</h4></article>`
    }
}

function toggleSaveButtonState() {
  if (titleInput.value && bodyInput.value) {
    saveButton.classList.add("inputs-filled");
  } else {
    saveButton.classList.remove('inputs-filled');
  }
}

