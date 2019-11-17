# Sequencer
Sequencer is a light-weight promise based library  for executing methods that return promises. It ensures the methods are executed in the order they were provided. It allows methods that return promises to be chained in a manner that either all runs to completion (in order) or the execution gets terminated. Sequencer supports promise returning methods that take arguments and those without arguments.

# Installation Guide
To install sequencer, run the following in your terminal:

> npm install sequencer --save

# Basic Usage

```javascript

const Sequencer = require('sequencer');

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
   .then((results) => results.forEach((result) =>
            console.log(result)
        )
    );

```

# API Documentation

### Constructor

> Sequencer( options )

Takes in optional ```options``` object as parameter.
- ```options``` (optional) properties
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


- When ```useArgs``` is set to ```false``` then method must be of the form:
  
```javascript 
runSequence( [() => Promise.resolve('First Function'), () => Promise.resolve('Second Function') ])

``` 
   
