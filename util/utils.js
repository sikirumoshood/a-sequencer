const { isFunction } = require('../helpers/helpers');
const { isExpectedObject } = require('../helpers/helpers');

async function processPromises(promises) {
    const results = [];

    if (arguments.length <= 0 && !arguments[0]) {
        return Promise.reject(new Error('An argument is expected'));
    }

    if (!Array.isArray(promises)) {
        return Promise.reject(new Error('Argument must be a type of array'));
    }

    for (let i = 0; i < promises.length; ++i) {
        if (isExpectedObject(promises[i])) {
            try {
                results.push(await promises[i].name.apply(undefined, promises[i].args));
            } catch (e) {
                return Promise.reject(new Error(e.message));
            }
        } else if (isFunction(promises[i])) {
            try {
                results.push(await promises[i]());
            } catch (e) {
                return Promise.reject(new Error(e.message));
            }
        } else {
            return Promise.reject(
                new Error(
                    'Object of form { name:[Func], args: [Array] } or a function that returns a promise was expected'
                )
            );
        }
    }

    return results;
}

async function processPromisesWithArgs(promises) {
    const results = [];

    if (arguments.length <= 0 && !arguments[0]) {
        return Promise.reject(new Error('An argument is expected'));
    }

    if (!Array.isArray(promises)) {
        return Promise.reject(new Error('Argument must be a type of array'));
    }

    for (let i = 0; i < promises.length; ++i) {
        if (isExpectedObject(promises[i])) {
            try {
                results.push(await promises[i].name.apply(undefined, promises[i].args));
            } catch (e) {
                return Promise.reject(new Error(e.message));
            }
        } else {
            return Promise.reject(new Error('Object of form { name:[Func], args: [Array] } expected'));
        }
    }

    return results;
}

async function processPromisesWithNoArgs(promises) {
    const results = [];
    if (arguments.length <= 0 && !arguments[0]) {
        return Promise.reject(new Error('An argument is expected'));
    }

    if (!Array.isArray(promises)) {
        return Promise.reject(new Error('Argument must be a type of array'));
    }

    for (let i = 0; i < promises.length; ++i) {
        if (isFunction(promises[i])) {
            try {
                results.push(await promises[i]());
            } catch (e) {
                return Promise.reject(new Error(e.message));
            }
        } else {
            return Promise.reject(new Error('Array of function(s) that returns a promise was expected'));
        }
    }
    return results;
}

// @Returns the result for the last promise called.
// @Each method must return an array if the result is greater than one.
async function processPromisesAndChainResults(promises) {
    if (arguments.length <= 0 && !arguments[0]) {
        return Promise.reject(new Error('An argument is expected'));
    }

    if (!Array.isArray(promises)) {
        return Promise.reject(new Error('Argument must be a type of array'));
    }

    if (!isExpectedObject(promises[0])) {
        return Promise.reject(
            new Error('The first argument to processPromisesAndChainResults method must be an object')
        );
    }

    let result;

    for (let i = 0; i < promises.length; ++i) {
        if (i === 0) {
            try {
                result = await promises[i].name.apply(undefined, promises[i].args);
            } catch (e) {
                return Promise.reject(new Error(e.message));
            }
        } else {
            if (isFunction(promises[i])) {
                try {
                    if (Array.isArray(result)) {
                        result = await promises[i](...result);
                    } else {
                        result = await promises[i](result);
                    }
                } catch (e) {
                    return Promise.reject(new Error(e.message));
                }
            } else {
                return Promise.reject(new Error('A function that returns a promise was expected'));
            }
        }
    }
    return result;
}
module.exports.processPromises = processPromises;
module.exports.processPromisesWithArgs = processPromisesWithArgs;
module.exports.processPromisesWithNoArgs = processPromisesWithNoArgs;
module.exports.processPromisesAndChainResults = processPromisesAndChainResults;
