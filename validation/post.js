const isEmpty = require('../util/is-empty');

module.exports = function validatePostInput (data) {
    const errors = {};
    
    if (isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }
    
    if (isEmpty(data.subtitle)) {
        errors.subtitle = 'Subtitle field is required';
    }

    if (isEmpty(data.content)) {
        errors.content = 'Content is empty';
    }

    if (isEmpty(data.tag)) {
        errors.tag = 'Tag field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}