const { processPromisesWithArgs, processPromisesWithNoArgs } = require('./util/utils');

function Sequencer(options = {}) {
    const _options = options;
    if (!_options.useArgs || typeof _options.useArgs !== 'boolean') {
        _options.useArgs = false;
    }

    this.runSequence = function(promises) {
        if (_options.useArgs) {
            return processPromisesWithArgs(promises);
        } else {
            return processPromisesWithNoArgs(promises);
        }
    };

    this.getUseArgs = function() {
        return _options.useArgs;
    };
}

module.exports = Sequencer;
