const Sequencer = require('./src');
const sq = new Sequencer();

const promise1 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('FIRST PROMISE'), 2000);
    });

const promise2 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('SECOND PROMISE'), 1000);
    });

const promise3 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('THIRD PROMISE'), 500);
    });

// Run sequence NO ARGS
sq.runSequence([ promise1, promise2, promise3 ]).then((results) => results.forEach((result) => console.log(result)));

const pa1 = (firstname, surname, salary) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve({ firstname: firstname.toUpperCase(), surname: surname.toUpperCase(), salary }), 2000);
    });

const pa2 = (a, b) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(a / b), 1000);
    });

const pa3 = (a, b) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(a * b), 500);
    });

// Run sequence WITH ARGS
