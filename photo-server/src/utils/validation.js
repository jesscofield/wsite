const { generateUniqueId } = require('./common');

function validateCommentText(text) {
    if (!text) {
        throw new Error('Необходимо указать текст комментария');
    }
}

function validateCommentId(id) {
    if (isNaN(id)) {
        throw new Error('Некорректный ID комментария');
    }
}

function validateBlogFields(title, description, text, image) {
       if (!title || !description || !text || !image) {
        throw new Error('Все поля блога должны быть заполнены');
    }
}

function validateBlogId(id) {
    if (isNaN(id)) {
        throw new Error('Некорректный ID блога');
    }
}

module.exports = {
    validateCommentText,
    validateCommentId,
    validateBlogFields,
    validateBlogId,
    generateUniqueId,
};
