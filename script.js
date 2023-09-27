'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

function initial() {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0,0];

  document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

//Rolling Dice  Functionality
btnRoll.addEventListener(`click`, function () {
  if(playing) {
  //1. Generating random number
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Displaying the dice
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1
  if (dice !== 1) {
    //Add to current score
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
}
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Check if active player is >= 100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add(`hidden`);
      playing = false;
      diceEl.classList.add(`hidden`);
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      //3. Function of hold button
      switchPlayer();
    }
  }
});

  //For New Game
  btnNew.addEventListener(`click`, initial);

