/*
@Params: Function
@Returns: Boolean
@Desc: Checks if @Params is of type Function
*/
const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

/*
@Params: Object of form {name: [Function], args: [Array]}
@Returns: Boolean
@Desc: Checks if @Params is of type Object with the correct format
*/
const isExpectedObject = (obj) => {
    return obj && obj.name !== undefined && isFunction(obj.name) && obj.args !== undefined && Array.isArray(obj.args);
};

module.exports.isFunction = isFunction;
module.exports.isExpectedObject = isExpectedObject;
