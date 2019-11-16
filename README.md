# Sequencer
Sequencer is a light-weight promise based library  for executing methods that return promises. It ensures the methods are executed in the order they were provided. It allows methods that return promises to be chained in a manner that either all runs to completion (in order) or the execution gets terminated. Sequencer supports promise returning methods that take arguments and those without arguments.

# Installation Guide
To install sequencer, run the following in your terminal:
> npm i sequencer

# Basic Usage Sample Code

```javascript

const Sequencer = require('sequencer');
//Takes in optional <options> object as parameter. defaults to {useArgs:false, mixed:false}
const sq = new Sequencer();

const promise1 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('FIRST PROMISE'), 2000);
    });

const promise2 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('SECOND PROMISE'), 1000);
    });

const promise3 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('THIRD PROMISE'), 500);
    });

sq.runSequence([ promise1, promise2, promise3 ])
   .then((results) => results.forEach((result) =>
            console.log(result)
        )
    );

```

# API Documentation

### Constructor

------------------------------------------------------------------------------------------------------------
| Constructor               |                 Parameter                |               Description         |    
------------------------------------------------------------------------------------------------------------
| Sequencer (options?)      | > Optional                               |                                   |
------------------------------------------------------------------------------------------------------------
