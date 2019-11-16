const { processPromisesWithArgs, processPromisesWithNoArgs, processPromises } = require('./util/utils');

function Sequencer(options = {}) {
    const _options = options;
    if (!_options.useArgs || typeof _options.useArgs !== 'boolean') {
        _options.useArgs = false;
    }

    if (!_options.mixed || typeof _options.mixed !== 'boolean') {
        _options.mixed = false;
    }

    this.runSequence = function(promises) {
        if (_options.mixed) {
            return processPromises(promises);
        } else if (_options.useArgs) {
            return processPromisesWithArgs(promises);
        } else {
            return processPromisesWithNoArgs(promises);
        }
    };

    this.getUseArgs = function() {
        return _options.useArgs;
    };

    this.getMixed = function() {
        return _options.mixed;
    };

    this.setUseArgs = function(value) {
        if (typeof value === 'boolean') {
            _options.useArgs = value;
        }
    };

    this.setMixed = function(value) {
        if (typeof value === 'boolean') {
            _options.mixed = value;
        }
    };
}

module.exports = Sequencer;
