# A-sequencer
A-sequencer is a light-weight promise based library  for executing methods that return promises. It ensures the methods are executed in the order they were provided. It allows methods that return promises to be chained in a manner that either all runs to completion (in order) or the execution gets terminated. It supports promise returning methods that take arguments and those without arguments.

# Installation Guide
To install a-sequencer, run the following in your terminal:

> npm i a-sequencer --save

# Basic Usage

### Running functions that do not take arguments
```javascript

const Sequencer = require('a-sequencer');

//Takes in optional <options> object as parameter. defaults to {useArgs:false, mixed:false}
const sq = new Sequencer();

const funct1 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('FIRST PROMISE'), 2000);
    });

const funct2 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('SECOND PROMISE'), 1000);
    });

const funct3 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('THIRD PROMISE'), 500);
    });

sq.runSequence([ funct1, funct2, funct3 ])
   .then( results => console.log(results) ); // ['FIRST PROMISE', 'SECOND PROMISE', 'THIRD PROMISE']

```

### Running functions that take arguments

```javascript
const Sequencer = require('a-sequencer');

const sq = new Sequencer({useArgs:true});
   
const func1 = (firstname, surname, salary) => new Promise((resolve, reject) => {
        setTimeout(() => resolve({ firstname: firstname.toUpperCase(), surname: surname.toUpperCase(), salary }), 2000);
    });

const func2 = (a, b) => new Promise((resolve, reject) => {
        setTimeout(() => resolve(a / b), 1000);
    });

const funct3 = (a, b) => new Promise((resolve, reject) => {
        setTimeout(() => resolve(a * b), 500);
    });


sq.runSequence([
        { name: func1, args: [ 'John', 'Doe', 25000 ] },
        { name: func2, args: [ 10000, 2 ] },
        { name: func3, args: [ 50, 3 ] }
    ])
    .then( results => console.log(results)); // [ {firstname: 'JOHN', surname: 'JOE', salary: 2000}, 5000, 150 ]
```

### Running mixed functions

```javascript  
const Sequencer = require('a-sequencer');

const sq = new Sequencer({mixed:true});
   
const funct1 = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve('FIRST PROMISE'), 1000);
    });
   
const funct2 = (firstname, surname, salary) => new Promise((resolve, reject) => {
        setTimeout(() => resolve({ firstname: firstname.toUpperCase(), surname: surname.toUpperCase(), salary }), 2000);
    });

sq.runSequence([ funct1, { name: funct2, args: [ 'John', 'Doe', 25000 ] }])
      .then( results => console.log(results)); // [ 'FIRST PROMISE', {firstname: 'JOHN', surname: 'JOE', salary: 2000}]
    
```

# API Documentation

### Constructor

> Sequencer( options )

Takes in optional ```options``` object as parameter.
- ```options``` properties include --
  ```useArgs``` (boolean): When set to ```true``` implies supplied methods take in parameters.

  ```mixed``` (boolean): When set to ```true``` implies supplied methods may take in parameters or NOT.

By default it is set to 
```{ mixed:false, useArgs:false }```.


### Methods

> getMixed

Returns ```options.useArgs``` boolean value.

> getUseArgs

Returns ```options.mixed``` boolean value.


> setMixed( value )

Takes in ```value``` as boolean.
Sets ```options.mixed``` to ```value```


> setUseArgs( value )

Takes in ```value``` as boolean.
Sets ```options.useArgs``` to ```value```


> runSequence([ func1, func2, ...])

Returns ```array``` containing results of each function in order.

- When an ```error```  occurs during execution, the task is terminated immediately.

- When ```useArgs``` is set to```true``` then method must be of the form:
  
```javascript
   runSequence( [{name:() => Promise.resolve('Awesome'), args:[arg1, arg2,... ]} ])
```
- Where:
   
   ```name``` is the function name or the Function itself.

   ```args``` is the array of arguments to be supplied to the Function.


- When ```useArgs``` property is set to ```false``` and ```mixed``` property is set to ```false``` then method must be of the form:
  
```javascript 
runSequence( [() => Promise.resolve('First Function'), () => Promise.resolve('Second Function') ])

``` 
   
