const express = require('express');
const multer = require('multer');
const { validateBlogFields, validateBlogId, generateUniqueId } = require('../utils/validation');
const blogs = require('../blogs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});



const upload = multer({ storage: storage });

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
    handleRequest(req, res, blogs.getBlogs, 'Список блогів отримано успішно');
});

router.post('/', upload.single('image'), (req, res) => {
    handleRequest(req, res, () => {
        const {title, description, text} = req.body;
        const image = req.file ? `../public/uploads/${req.file.filename}` : null;
        validateBlogFields(title, description, text, image);

        const newBlog = {
            id: generateUniqueId(),
            title,
            description,
            text,
            image,
            createdAt: new Date(),
        };

        blogs.addBlog(newBlog);
        return newBlog;
    }, 'Блог створено успішно');
});

router.put('/:id', (req, res) => {
    handleRequest(req, res, () => {
        const id = parseInt(req.params.id);
        validateBlogId(id);

        const { title, description, text, image } = req.body;

        const currentBlog = blogs.getBlogById(id);

        const updatedBlog = {
            title: title || currentBlog.title,
            description: description || currentBlog.description,
            text: text || currentBlog.text,
            image: image || currentBlog.image,
        };

        blogs.editBlog(id, updatedBlog);

        return { id, ...updatedBlog };
    }, `Блог з ID ${req.params.id} відредаговано успішно`);
});

router.delete('/:id', (req, res) => {
    handleRequest(req, res, (req) => {
        const id = parseInt(req.params.id);
        validateBlogId(id);

        return blogs.deleteBlog(id);
    }, `Блог з ID ${req.params.id} видалено успішно`);
});

module.exports = router;
