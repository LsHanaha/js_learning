'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = ' ';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const direction = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${direction}">${
            i + 1
        } ${direction}</div>
                <div class="movements__value">${Math.abs(mov)}🇪🇺</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (movements) {
    const balance = movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${balance}🇪🇺`;
    return balance;
};

const calcDisplaySummary = function (movements, interestRate) {
    const income = movements
        .filter(mov => mov > 0)
        .reduce((acc, cur) => acc + cur, 0);
    labelSumIn.textContent = `${income}🇪🇺`;

    const outcome = movements
        .filter(mov => mov < 0)
        .reduce((acc, cur) => acc + cur, 0);
    labelSumOut.textContent = `${Math.abs(outcome)}🇪🇺`;

    const interest = movements
        .filter(mov => mov > 0)
        .map(val => (val * interestRate) / 100)
        .filter(val => val >= 1)
        .reduce((acc, cur) => acc + cur, 0);
    labelSumInterest.textContent = `${interest}🇪🇺`;
};

const createUsernames = function (accs) {
    accs.forEach(function (account) {
        account.username = account.owner
            .toLowerCase()
            .split(' ')
            .map(val => val[0])
            .join('');
    });
};
createUsernames(accounts);

let currentAcc = null;

// Event handler
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    currentAcc = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    if (currentAcc?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back, ${
            currentAcc.owner.split(' ')[0]
        }`;

        inputLoginUsername.value = inputLoginPin.value = '';
        // remove pointer from field
        inputLoginPin.blur();
        inputLoginUsername.blur();

        containerApp.style.opacity = 100;
        displayMovements(currentAcc.movements);
        currentAcc.balance = calcDisplayBalance(currentAcc.movements);
        calcDisplaySummary(currentAcc.movements, currentAcc.interestRate);
    }
    console.log(currentAcc);
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );

    if (
        receiverAcc &&
        amount > 0 &&
        currentAcc.balance >= amount &&
        receiverAcc.username !== currentAcc.username
    ) {
        currentAcc.movements.push(-amount);
        displayMovements(currentAcc.movements);
        currentAcc.balance = calcDisplayBalance(currentAcc.movements);
        calcDisplaySummary(currentAcc.movements, currentAcc.interestRate);
        receiverAcc.movements.push(amount);
        inputTransferAmount.value = inputTransferTo.value = '';
        inputTransferAmount.blur();
        inputTransferTo.blur();
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    let amount = Number(inputLoanAmount.value);

    if (amount > 0 && currentAcc.movements.some(val => val >= amount * 0.1)) {
        currentAcc.movements.push(amount);
        calcDisplayBalance(currentAcc.movements);
        calcDisplaySummary(currentAcc.movements, currentAcc.interestRate);
        displayMovements(currentAcc.movements);
        inputLoanAmount.value = '';
        inputLoanAmount.blur();
    }
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAcc.username &&
        Number(inputClosePin.value) === currentAcc.pin
    ) {
        const index = accounts.findIndex(
            acc => currentAcc.username === acc.username
        );
        accounts.splice(index, 1);
        inputCloseUsername.value = inputClosePin.value = '';
        inputCloseUsername.blur();
        inputClosePin.blur();
        containerApp.style.opacity = 0;
    }
});

let sortedState = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    displayMovements(currentAcc.movements, !sortedState);
    sortedState = !sortedState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const eurToUsd = 1.1;
// const movementsUsd = movements.map(function (val) {
//     return val * eurToUsd;
// });
// console.log(movements, movementsUsd);

// const movementsUsd2 = movements.map(val => val * eurToUsd);
// console.log(movements, movementsUsd2);

// const displayMovementsMap = movements.map((mov, i, arr) => {
//     const direction = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//         <div class="movements__row">
//             <div class="movements__type movements__type--${direction}">${
//         i + 1
//     } ${direction}</div>
//             <div class="movements__value">${mov}</div>
//         </div>
//     `;

//     return html;
// });

const deposits = movements.filter(function (mov) {
    return mov > 0;
});
console.log(movements);
console.log(deposits);
