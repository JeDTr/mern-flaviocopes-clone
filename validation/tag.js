const isEmpty = require('../util/is-empty');

// validate name and description
module.exports = function validateTagInput (data) {
    const errors = {}

    if (isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}