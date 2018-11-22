/*
 * Create a list that holds all of your cards
 */

//Golbal variables
let gameCards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

let noOfMoves = 0;
let matchedCounter = 0;
let noOfStars = 3;
let gameStartTime = 0;
let runTimer;
let moveCounter = document.querySelector(".moves");
let restart = document.querySelector(".restart");
let stars = document.querySelector(".stars");
let win_stars = document.querySelector(".win_stars");
let playAgain = document.getElementById("playAgain");
let win_timing = {};

//let modal_instance = M.Modal.getInstance(modal);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/**
 * @description : shuffle array items
 * @param { array } array : array of card types
 *
 * */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * @description : creating card template
 * @param { string } cardType : card type
 *
 * */
function generateCardTemplate(cardType) {
  return (
    '<li class="card" data-card="' +
    cardType +
    '"> <i class="fa' +
    "  " +
    cardType +
    '"></i> </li>'
  );
}

//Reset Moves
function resetMoves() {
  noOfMoves = 0;
  moveCounter.innerHTML = noOfMoves.toString();
  //console.log(noOfMoves);
}

//Increament Moves
function incrementMoves() {
  noOfMoves += 1;
  moveCounter.innerHTML = noOfMoves.toString();
  //console.log(noOfMoves);
}

/**
 * @description : function add number of stars
 * @param { string } which_star : whether stars from modal or from game
 * @param { int } num : number of stars
 *
 * */
function addStars(which_star, num) {
  let starsList = [];
  while (num != 0) {
    starsList.push('<li><i class="fa fa-star"></i></li>');
    num--;
  }
  return (which_star.innerHTML = starsList.join(""));
}

/**
 * @description : Ratings calculation
 * @param { string } which_star : whether stars from modal or from game
 *
 * */
function calulateRatings(which_star) {
  //rating based on number of Moves
  if (noOfMoves > 30) {
    addStars(which_star, (noOfStars = 1));
  } else if (noOfMoves >= 20 && noOfMoves <= 30) {
    addStars(which_star, (noOfStars = 2));
  } else {
    addStars(which_star, (noOfStars = 3));
  }
}

/*
*  Timer functions 
*/

//set timer
function setTimer() {
  gameStartTime = 0;
  gameStartTime = new Date().getTime();
}

// get timer
function getTime() {
  let currentTime = new Date().getTime();
  let timeElapsed = currentTime - gameStartTime;
  let hours = Math.floor(
    (timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

  //console.log(hours, minutes, seconds);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

//display timer
function displayTimer() {
  let timer = getTime();
  // Output the result in an element
  document.getElementById("timer").innerHTML =
    timer.hours + "h: " + timer.minutes + "m: " + timer.seconds + "s";
}

//start timer
function startTimer() {
  runTimer = 0;
  runTimer = setInterval(displayTimer, 1000);
}

//stop timer
function stopTimer() {
  clearInterval(runTimer);
}

/*
*  Game Prerequisite functions
*/

//Intial setup for Game
function initGame() {
  let deck = document.querySelector(".deck");

  let cardsList = shuffle(gameCards).map(function(cardType) {
    //console.log(cardType);
    return generateCardTemplate(cardType);
  });

  //console.log(cardsList);
  deck.innerHTML = cardsList.join("");
  resetMoves();
  calulateRatings(stars);
  setTimer();
  startTimer();
}

/**
 * @description : comparing last two clicked cards
 * @param { string } firstCard : card type
 * @param { string } secondCard : card type
 *
 * */
function compareCards(firstCard, secondCard) {
  return firstCard.dataset.card == secondCard.dataset.card;
}

//adding event listeaner to each card
function addEventListenerToCards() {
  var allCards = document.querySelectorAll(".card");
  var openCards = [];

  allCards.forEach(function(card) {
    card.addEventListener("click", function(ev) {
      if (ev && ev.preventDefault) {
        ev.preventDefault();
      }
      //console.log(ev);

      //if current clicked card doesnot have class open, show and matched
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {
        openCards.push(card);

        // only two card will be open
        if (openCards.length <= 2) {
          card.classList.add("open", "show", "disabled");
          incrementMoves();
        }

        //check for match
        if (openCards.length === 2) {
          // if last 2 cards matched -> show them with different color
          if (compareCards(openCards[0], openCards[1])) {
            //console.log('WE found a match!!');
            openCards[0].classList.add("open", "show", "match", "disabled");
            openCards[1].classList.add("open", "show", "match", "disabled");
            openCards = [];
            matchedCounter += 1;

            if (checkIfGameOver()) {
              //stop timer
              win_timing = getTime(); // set win_timing
              stopTimer();
              //show modal
              show_modal();
              return;
            }
          } else {
            // if last 2 cards don't match -> hide them
            setTimeout(function() {
              openCards.forEach(function(openedCard) {
                openedCard.classList.remove("open", "show", "disabled");
              });

              //empty openCards array
              while (openCards.length) {
                openCards.pop();
              }
              //console.log(openCards.length);
            }, 800);
          }
        }
      }

      calulateRatings(stars); // for each move calculate stars
    });
  });
}

//start game
function startGame() {
  initGame();
  addEventListenerToCards();
}

//check for game over
function checkIfGameOver() {
  if (matchedCounter === gameCards.length / 2) {
    return true;
  }
  return false;
}

//restart event-handler -> reset the game
restart.addEventListener("click", function(ev) {
  if (ev && ev.preventDefault) {
    ev.preventDefault();
  }
  console.log("Game Restarted!");
  matchedCounter = 0;
  startGame();
});

/*
*  Modal functions
*/

// show modal
function show_modal() {
  show_game_win_info();
  $(".modal .modal-body").css("overflow-y", "auto");
  $(".modal .modal-body").css("max-width", $(window).width() * 0.8);
  $(".modal-content").css("max-width", $(window).width() * 0.8);
  $("#game_win_modal").modal("show");
}

//hide modal
function hide_modal() {
  $("#game_win_modal").modal("hide");
}

//wining game info
function show_game_win_info() {
  // Output the result in an element
  document.getElementById("win_time").innerHTML =
    win_timing.hours +
    "h: " +
    win_timing.minutes +
    "m: " +
    win_timing.seconds +
    "s";
  document.getElementById("win_moves").innerHTML = noOfMoves.toString();
  calulateRatings(win_stars);
}

//event listener to play again button
playAgain.addEventListener("click", function(ev) {
  if (ev && ev.preventDefault) {
    ev.preventDefault();
  }

  //hide  modal
  hide_modal();
  console.log("Game Restarted Again!");
  matchedCounter = 0;
  startGame();
});

//first call
startGame();
