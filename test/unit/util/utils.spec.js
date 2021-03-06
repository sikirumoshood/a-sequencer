/* eslint-env mocha */
const {
    processPromisesWithArgs,
    processPromisesWithNoArgs,
    processPromises,
    processPromisesAndChainResults
} = require('../../../util/utils');
const chai = require('chai');

describe('UNIT TEST FOR UTILS MODULE', () => {
    it('Should FAIL processPromisesWithArgs method, NO arg passed ', async() => {
        try {
            await processPromisesWithArgs();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromisesWithArgs method, arg NOT an array ', async() => {
        try {
            await processPromisesWithArgs({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesWithArgs method, elements of array arg not an object', async() => {
        try {
            await processPromisesWithArgs([ 'Something' ]);
        } catch (e) {
            chai.expect(e.message).to.equal('Object of form { name:[Func], args: [Array] } expected');
        }
    });

    it('Should PASS processPromisesWithArgs method', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1));

        const results = await processPromisesWithArgs([
            { name: arg1, args: [ 'First' ] },
            { name: arg2, args: [ 'Second' ] },
            { name: arg3, args: [ 'Third' ] },
            { name: arg4, args: [ 'Fourth' ] }
        ]);
        chai.expect(results).to.be.an('array');
        chai.expect(results.length).to.equal(4);
    });

    it('Should STOP processPromisesWithArgs method execution when one gets rejected', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => reject(new Error(arg)), 100));
        const arg3 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1));
        try {
            const results = await processPromisesWithArgs([
                { name: arg1, args: [ 'First' ] },
                { name: arg2, args: [ 'Second' ] },
                { name: arg3, args: [ 'Third' ] },
                { name: arg4, args: [ 'Fourth' ] }
            ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.not.equal('null');
        }
    });

    it('Should FAIL processPromisesWithNoArgs method, NO arg passed ', async() => {
        try {
            await processPromisesWithNoArgs();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromisesWitNohArgs method, arg NOT an array ', async() => {
        try {
            await processPromisesWithNoArgs({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesWithNoArgs method, elements of array arg not a FUNCTION ', async() => {
        try {
            await processPromisesWithNoArgs([ 'Should be a function' ]);
        } catch (e) {
            chai.expect(e.message).to.equal('Array of function(s) that returns a promise was expected');
        }
    });

    it('Should PASS processPromisesWithNoArgs method', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('SECOND'), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        const arg4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FOURTH'), 1));

        const results = await processPromisesWithNoArgs([ arg1, arg2, arg3, arg4 ]);
        chai.expect(results).to.be.an('array');
        chai.expect(results.length).to.equal(4);
    });

    it('Should STOP processPromisesWithNoArgs method execution if one promise gets rejected', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('SECOND'), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('THIRD')), 10));
        const arg4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FOURTH'), 1));
        try {
            const results = await processPromisesWithNoArgs([ arg1, arg2, arg3, arg4 ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.not.equal(null);
        }
    });

    it('Should FAIL processPromises method, NO arg passed ', async() => {
        try {
            await processPromises();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromises method, arg NOT an array ', async() => {
        try {
            await processPromisesWithArgs({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromises method, INVALID ARG', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromises([ arg1, { name: arg2, args: [ 'SECOND' ] }, arg3, 'Call Me' ]);
        } catch (e) {
            chai
                .expect(e.message)
                .to.equal(
                    'Object of form { name:[Func], args: [Array] } or a function that returns a promise was expected'
                );
        }
    });

    it('Should FAIL processPromises method, ARG NOT AN ARRAY', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromises({ arg1, arg2, arg3 });
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromises method, PROMISE REJECTED', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => reject(new Error('arg')), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromises([ arg1, { name: arg2, args: [ 'SECOND' ] }, arg3 ]);
        } catch (e) {
            chai.expect(e.message).to.not.equal(null);
        }
    });

    it('Should STOP processPromises method execution if one promise gets rejected', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('THIRD')), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        try {
            await processPromises([
                arg1,
                { name: arg2, args: [ 'SECOND' ] },
                arg3,
                { name: arg4, args: [ 'FOURTH' ] }
            ]);
        } catch (e) {
            chai.expect(e.message).to.not.equal(null);
        }
    });

    it('Should PASS processPromises method', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));

        const results = await processPromises([
            arg1,
            { name: arg2, args: [ 'SECOND' ] },
            arg3,
            { name: arg4, args: [ 'FOURTH' ] }
        ]);
        chai.expect(results).to.be.an('array');
        chai.expect(results.length).to.equal(4);
        chai.expect(results).to.eql([ 'FIRST', 'SECOND', 'THIRD', 'FOURTH' ]);
    });

    it('Should FAIL processPromisesAndChainResults method, NO arg passed ', async() => {
        try {
            await processPromisesAndChainResults();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromisesAndChainResults method, arg NOT an array ', async() => {
        try {
            await processPromisesAndChainResults({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesAndChainResults method, INVALID ARG', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromisesAndChainResults([ arg1, { name: arg2, args: [ 'SECOND' ] }, arg3, 'Call Me' ]);
        } catch (e) {
            chai
                .expect(e.message)
                .to.equal('The first argument to processPromisesAndChainResults method must be an object');
        }
    });

    it('Should FAIL processPromisesAndChainResults method, ARG NOT AN ARRAY', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromisesAndChainResults({ arg1, arg2, arg3 });
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesAndChainResults method, PROMISE REJECTED', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => reject(new Error(arg)), 1000));
        const arg2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        try {
            await processPromisesAndChainResults([ { name: arg1, args: [ 'SECOND' ] }, arg2 ]);
        } catch (e) {
            chai.expect(e.message).to.not.equal(null);
        }
    });

    it('Should STOP processPromisesAndChainResults method execution if one promise gets rejected', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 100)
            );
        const arg3 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return reject(arg.toUpperCase());
                }, 1000)
            );
        const arg4 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 500)
            );
        try {
            await processPromisesAndChainResults([ { name: arg1, args: [ 'FIRST' ] }, arg2, arg3, arg4 ]);
        } catch (e) {
            chai.expect(e.message).to.not.equal(null);
        }
    });

    it('Should FAIL processPromisesAndChainResults method, INVALID METHOD PROVIDED', async() => {
        try {
            const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
            const arg2 = (arg) =>
                new Promise((resolve, reject) =>
                    setTimeout(() => {
                        console.log(`RECIEVED: ${arg}`);
                        return resolve(arg.toLowerCase());
                    }, 100)
                );
            const arg3 = (arg) =>
                new Promise((resolve, reject) =>
                    setTimeout(() => {
                        console.log(`RECIEVED: ${arg}`);
                        return resolve([ arg.toUpperCase() ]);
                    }, 1000)
                );
            const arg4 = (arg) =>
                new Promise((resolve, reject) =>
                    setTimeout(() => {
                        console.log(`RECIEVED: ${arg}`);
                        return resolve(arg.toLowerCase());
                    }, 500)
                );

            const result = await processPromisesAndChainResults([
                { name: arg1, args: [ 'FIRST' ] },
                arg2,
                arg3,
                arg4,
                'INVALID'
            ]);
            chai.expect(result).to.be.a('string');
            chai.expect(result).to.equal('first');
        } catch (e) {
            chai.expect(e.message).to.equal('A function that returns a promise was expected');
        }
    });

    it('Should PASS processPromisesAndChainResults method', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 100)
            );
        const arg3 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toUpperCase());
                }, 1000)
            );
        const arg4 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 500)
            );

        const result = await processPromisesAndChainResults([ { name: arg1, args: [ 'FIRST' ] }, arg2, arg3, arg4 ]);
        chai.expect(result).to.be.a('string');
        chai.expect(result).to.equal('first');
    });

    it('Should PASS processPromisesAndChainResults method', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 100)
            );
        const arg3 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve([ arg.toUpperCase() ]);
                }, 1000)
            );
        const arg4 = (arg) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    console.log(`RECIEVED: ${arg}`);
                    return resolve(arg.toLowerCase());
                }, 500)
            );

        const result = await processPromisesAndChainResults([ { name: arg1, args: [ 'FIRST' ] }, arg2, arg3, arg4 ]);
        chai.expect(result).to.be.a('string');
        chai.expect(result).to.equal('first');
    });
});
