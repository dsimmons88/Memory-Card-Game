/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');
console.log(cards);

// global variables
const deck = document.querySelector(".deck");
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let timer;
let matched = 0;
let matchedCards = [];

// event target for click on card
deck.addEventListener('click', event => {
const clickTarget = event.target;
if (isClickValid(clickTarget)) {
      if(clockOff) {
        startClock();
        clockOff = false;
      }

        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
            }
  }
});


// function for when an card is click
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

//add click card to toggledCards

function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

//checks for match
function checkForMatch() {
  if (toggledCards[0].firstElementChild.className ===
      toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle("match");
    toggledCards[1].classList.toggle("match");
    matchedCards.push(toggledCards);

    console.log(matchedCards);
    toggledCards = [];

    matched++;
    const TOTAL_PAIRS = 8;
    if (matched == TOTAL_PAIRS) {
      setTimeout (() => {
        gameOver();
      }, 2000);
}
  } else {
    setTimeout (() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];


    }, 1000);
}
}

// to make my if statment in the event target function cleaner
function isClickValid(clickTarget) {
    return (clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
      );
}

//loop to remove matchedCards
function removeCards() {


  for(let i = 0; i < matchedCards.length; i++){
    for(let y = 0; y < matchedCards[i].length; y++){
      matchedCards[i][y].classList.remove("match");
      matchedCards[i][y].classList.remove("open");
      matchedCards[i][y].classList.remove("show");
      }
    }
}
//shuffle cards in matching game

function shuffleDeck() {
  const  cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  const  shuffleCards = shuffle(cardsToShuffle);
  for (card of shuffleCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

//counts moves and adds them to the HTML
function addMove() {
    moves++
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

//checks score to know when to remove star

function checkScore() {
if (moves === 16 || moves === 24) {
  hideStar();
  }
}

// hides the star using style

function hideStar() {
  const starList = document.querySelectorAll('.stars li')
  for (star of starList){
      if (star.style.display !== 'none'){
          star.style.display = 'none';
          break;
      }
  }
}


//stars the clock and displays it

function startClock() {
   timer = setInterval(function() {
time++;

const minutes = Math.floor(time/60);
const seconds = time % 60;


document.querySelector('.clock').innerHTML = minutes+ ":" + seconds;

if (seconds < 10) {
  document.querySelector('.clock').innerHTML = `${minutes}:0${seconds}`;
} else {
  document.querySelector('.clock').innerHTML = `${minutes}:${seconds}`;
}
}, 1000);
}

//stops clock
function stopClock() {
  clearInterval(timer);
}


function toggleModal() {
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}

function displayTime() {
  console.log(document.querySelector('.clock').innerHTML);

}


// writes the stats for the modal after a game over.
function writeModalStats() {
  const timeStat = document.querySelector('.modal__time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal__moves');
  const starsStat = document.querySelector('.modal__stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`
  starsStat.innerHTML = `Stars = ${stars}`
}

// gets the numbers of stars for the modal
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

//cancel button
document.querySelector('.modal__cancel').addEventListener('click', () =>{
  toggleModal();
});
// replay button
document.querySelector('.modal__replay').addEventListener('click', () => {
  //make function for replay
});


//reset game

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  removeCards();
  shuffleDeck();
//window.location.reload(false)

}



function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  document.querySelector('.clock').innerHTML = "0:00";
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';

  }
}

//resets the game
document.querySelector('.restart').addEventListener('click', resetGame);
//replays the game
document.querySelector('.modal__replay').addEventListener('click', replayGame);


//game over
function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}

function replayGame() {
  resetGame();
  toggleModal();
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
Big Thanks to Matthew Crawford for the walk-through of this project. It was a big help.
*/



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
