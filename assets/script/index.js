'use strict';

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return[...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

const guess = selectById('guess');
const guesses = selectById('guesses');
const userGuess = selectById('userGuess');
const submit = selectById('submit');
const reset = selectById('reset');
let randomNumber = Math.floor(Math.random() * (10)) + 1;
let guessNum = 3;
guesses.innerText = `Guesses left: ${guessNum}`;
print(randomNumber);

onEvent('click', submit, (event) => {
    event.preventDefault();
    guessNum--;
    guesses.innerText = `Guesses left: ${guessNum}`;
    let num = Number(userGuess.value);
    if (!num || isNaN(num)) {
        alert("You must enter a number!");
    } else {
            guess.innerText = num;
            guess.classList.add('visible');
        if (num === randomNumber) {
            alert(`Congratulations! You've won.`);
            userGuess.placeholder = 'You got it';
            reset.classList.add('visible');
        } else {
            if (guessNum === 0) {
                alert(`You have run out attempts, You lost`);
                location.reload();
            }
            if (num < randomNumber){
                userGuess.placeholder = 'Too low';
            } else {
                userGuess.placeholder = 'Too high';
            }
        }
    }
    userGuess.value = '';
});

onEvent('click', reset, () => {
    location.reload();
});