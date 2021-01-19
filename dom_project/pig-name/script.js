'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];

let currentScore = 0;
let currentPlayer = 0;

// starting
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const changePlayer = function () {
    currentScore = 0;
    document.querySelector(
        `#current--${currentPlayer}`
    ).textContent = currentScore;
    currentPlayer = currentPlayer ? 0 : 1;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// rolling
btnRoll.addEventListener('click', function () {
    if (diceEl.classList.contains('hidden')) {
        diceEl.classList.remove('hidden');
    }

    let randomVal = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${randomVal}.png`;

    if (randomVal === 1) {
        changePlayer();
    } else {
        currentScore += randomVal;
        document.querySelector(
            `#current--${currentPlayer}`
        ).textContent = currentScore;
    }
});

btnHold.addEventListener('click', function () {
    scores[currentPlayer] += currentScore;

    document.querySelector(`#score--${currentPlayer}`).textContent =
        scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
        document
            .querySelector(`.player--${currentPlayer}`)
            .classList.add('player--winner');
        console.log('winner here!');
        // btnHold.disabled = true;
        // btnRoll.disabled = true;
        btnHold.classList.add('hidden');
        btnRoll.classList.add('hidden');
    } else changePlayer();
});

btnNew.addEventListener('click', function () {
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
    diceEl.classList.add('hidden');
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--winner');

    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    document.querySelector(`#current--0`).textContent = 0;
    document.querySelector(`#current--1`).textContent = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    currentScore = 0;
    currentPlayer = 0;
});
