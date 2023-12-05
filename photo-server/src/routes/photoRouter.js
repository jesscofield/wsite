const express = require('express');
const multer = require('multer');
const {validateBlogId, generateUniqueId } = require('../utils/validation');
const photo = require('../photo');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos');
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
    handleRequest(req, res, photo.getPhotos, 'Список фото отримано успішно');
});

router.post('/', upload.single('image'), (req, res) => {
    handleRequest(req, res, () => {
        const image = req.file ? `../public/photos/${req.file.filename}` : null;



        const newBlog = {
            id: generateUniqueId(),
            image,
            createdAt: new Date(),
        };


        photo.addPhoto(newBlog);
        return newBlog;
    }, 'Фото створено успішно');
});


router.delete('/:id', (req, res) => {
    handleRequest(req, res, (req) => {
        const id = parseInt(req.params.id);
        validateBlogId(id);

        return photo.deletePhoto(id);
    }, `Фото ID ${req.params.id} видалено успішно`);
});

module.exports = router;
