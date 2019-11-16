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

> Sequencer( options )

Takes in optional ```javascript options``` object as parameter.
- options (optional) properties
  _useArgs_ (boolean): true when the supplied methods take in parameters.
  _mixed_ (boolean): true when the supplied methods may take in parameters or NOT.

By default it is set to ```javascript mixed:false, useArgs:false }```.


### Methods

> getMixed()
Returns ```javascript options.useArgs``` boolean value.



> getUseArgs ()
Returns ```javascript options.mixed``` boolean value.


> setMixed( value )
Takes in ```javascript value``` as boolean.
Sets ```javascript options.mixed ``` to ```javascript value```

> setUseArgs( value )
Takes in ```javascript value``` as boolean.
Sets ```javascript options.useArgs ``` to ```javascript value```


> runSequence([ func1, func2, ...])

Returns ```javascript array``` of  containing results of each function in order.
- When an ```javascript error```  occurs during execution, the task is terminated immediately.


- When _useArgs_ is set to```javascript true``` then method must be of the form:
  ```javascript  runSequence( [{name:() => Promise.resolve('Awesome'), args:[arg1, arg2,... ]} ])```
   
   _name_ is the function name or the Function itself.

   _args_ is the array of arguments to be supplied to the Function.


- When _useArgs_ is set to```javascript false ``` then method must be of the form:
  ```javascript  runSequence( [() => Promise.resolve('Method_1'), () => Promise.resolve('Method_2') ])``` 
   
