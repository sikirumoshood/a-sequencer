# A-sequencer
A-sequencer is a light-weight promise based library  for executing methods that return promises. Results from a promise may be passed to the other automatically when configured to do so. It ensures the methods are executed in the order they were provided. It allows methods that return promises to be chained in a manner that either all runs to completion (in order) or the execution gets terminated. It supports promise returning methods that take arguments and those without arguments.

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
    .then( results => console.log(results)); // [ {firstname: 'JOHN', surname: 'JOE', salary: 2500}, 5000, 150 ]
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
      .then( results => console.log(results)); // [ 'FIRST PROMISE', {firstname: 'JOHN', surname: 'JOE', salary: 2500}]
    
```

### Chaining results (First method called without parameters)
```javascript
const Sequencer = require('a-sequencer');

const sq = new Sequencer({chainResult:true});

const getUserInfo = () => new Promise((resolve, reject) => {
        setTimeout(
		() => resolve({ firstname: 'firstname'.toUpperCase(), surname: 'surname'.toUpperCase(), salary: 25000 }), 2000);
	});

const increaseSalaryBy10Percent = (info) => new Promise((resolve, reject) => {
        setTimeout(() => {
                if (info) {
                        let { salary } = info;
                        info.salary = salary + 0.1 * salary;
                }
                resolve(info.salary);
        }, 1000);
});

const displayCurrentSalary = (salary) => new Promise((resolve, reject) => {
	setTimeout(() => resolve('CURRENT SALARY: ' + salary));
});

sq.runSequence([ { name: getUserInfo, args: [] }, increaseSalaryBy10Percent, displayCurrentSalary ])
  .then((salary) => console.log(salary)); // CURRENT SALARY: 27500
  
```

### Chaining results (First method called with parameters)
```javascript
const Sequencer = require('a-sequencer');

const sq = new Sequencer({chainResult:true});

const getUserInfo = (firstname, surname, salary) => new Promise((resolve, reject) => {
        setTimeout(
		() => resolve({ firstname: firstname.toUpperCase(), surname: surname.toUpperCase(), salary }), 2000);
	});

const increaseSalaryBy10Percent = (info) => new Promise((resolve, reject) => {
        setTimeout(() => {
                if (info) {
                        let { salary } = info;
                        info.salary = salary + 0.1 * salary;
                }
                resolve(info.salary);
        }, 1000);
});

const displayCurrentSalary = (salary) => new Promise((resolve, reject) => {
	setTimeout(() => resolve('CURRENT SALARY: ' + salary));
});

sq.runSequence([ { name: getUserInfo, args: ['Moshood', 'Sikiru', 25000] }, increaseSalaryBy10Percent, displayCurrentSalary ])
  .then((salary) => console.log(salary)); // CURRENT SALARY: 27500
  
```

# API Documentation

### Constructor

> Sequencer( options )

Takes in optional ```options``` object as parameter.
- ```options``` properties include --

  ```useArgs``` (boolean): When set to ```true``` implies supplied methods take in parameters.
  
  ```chainResult``` (boolean): When set to ```true``` implies result of a method is passed to the next method in the sequence.

  ```mixed``` (boolean): When set to ```true``` implies supplied methods may take in parameters or NOT.

By default it is set to 
```{ mixed: false, useArgs: false, chainResult: false }```.


### Methods

> getChainResult

Returns ```options.chainResult``` boolean value.

> getUseArgs

Returns ```options.useArgs``` boolean value.

> getMixed

Returns ```options.useArgs``` boolean value.


> setMixed( value )

Takes in ```value``` as boolean.
Sets ```options.mixed``` to ```value```


> setUseArgs( value )

Takes in ```value``` as boolean.
Sets ```options.useArgs``` to ```value```

> setChainResult( value )

Takes in ```value``` as boolean.
Sets ```options.chainResult``` to ```value```

> runSequence([ func1, func2, ...])

Returns ```array``` containing results of each function in order if ```chainResult``` is set. Otherwise, it returns the array of the results when all promises gets resolved.

- When an ```error```  occurs during execution, the task is terminated immediately.

- When ```chainResult``` is set to```true``` the first method must be of the form:
  
```javascript
   runSequence( [{name: methodName, args:[arg1, arg2,... ]} ])
```
 NOTE:  if the method has no arguments then set args property to ```args: []```
        

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
   
