'use strict';

const greet = function (greeting) {
    const data = greeting;

    return function (name) {
        console.log(`${data} ${name}`);
    };
};

// console.log(greet('Hey'));
greet('Hey')('boy');

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book: function (flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name: name,
        });
    },
};

lufthansa.book(239, 'Me');
lufthansa.book(635, 'She');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;
// Can use book func now like this
eurowings.book = book;
eurowings.book(23, 'He');
console.log(eurowings);

// or this
book.call(eurowings, 24, 'Call');
console.log(eurowings);

// Bind
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(23, 'Stewen');
console.log(eurowings);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const pool = {
    answers: [0, 0, 0, 0],
    registerNewAnswer: function (val) {
        let answer = prompt(
            'What is your favourite programming language?\n \
            0: JavaScript\n \
            1: Python\n \
            2: Rust\n \
            3: C++\n'
        );
        if (isNaN(answer)) {
            alert('Answer is not a number!');
            return;
        }
        if (answer < 0 && answer > 3) {
            alert('wrong number. Should be from 0 to 3.');
            return;
        }
        this.answers[Number(answer)]++;
        this.displayResults('string');
        this.displayResults(typeof this.answers);
    },
    displayResults: function (type) {
        if (type === 'string') {
            console.log(this.answers.join('|'));
        } else if (type === 'object') {
            console.log(this.answers);
        } else {
            console.log('i am dummy');
        }
    },
};

document
    .querySelector('.poll')
    .addEventListener('click', pool.registerNewAnswer.bind(pool));

pool.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
