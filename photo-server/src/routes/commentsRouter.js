const express = require('express');
const multer = require('multer');
const { validateCommentText, validateCommentId, generateUniqueId } = require('../utils/validation');
const comments = require('../comments');

const router = express.Router();


function handleRequest(req, res, operation, successMessage) {
    try {
        const result = operation(req);
        res.json({ message: successMessage, result });
    } catch (error) {
        console.error('Error in handleRequest:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

router.get('/', (req, res) => {
    handleRequest(req, res, comments.getComments, 'Список коментарів отримано успішно');
});

router.post('/', (req, res) => {
    handleRequest(req, res, () => {
        const { text } = req.body;
        validateCommentText(text);

        const newComment = {
            id: generateUniqueId(),
            text,
            createdAt: new Date(),
        };

        comments.addComment(newComment);
        return newComment;
    }, 'Коментар створено успішно');
});

router.put('/:id', (req, res) => {
    handleRequest(req, res, () => {
        const id = parseInt(req.params.id);
        validateCommentId(id);

        const { text } = req.body;
        validateCommentText(text);

        comments.editComment(id, { text });

        return { id, text };
    }, `Коментар з ID ${req.params.id} відредаговано успішно`);
});

router.delete('/:id', (req, res) => {
    handleRequest(req, res, (req) => {
        const id = parseInt(req.params.id);
        validateCommentId(id);

        return comments.deleteComment(id);
    }, `Коментар з ID ${req.params.id} видалено успішно`);
});

module.exports = router;
