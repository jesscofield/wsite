const express = require('express');
const bodyParser = require('body-parser');
const blogsRouter = require('./routes/blogsRouter');
const commentsRouter = require('./routes/commentsRouter');
const photosRouter = require('./routes/photoRouter');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

app.use(bodyParser.json());
app.use('/public/photos', express.static('public/photos'));
app.use('/public/uploads', express.static('public/uploads'));



app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter);
app.use('/photo', photosRouter);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
