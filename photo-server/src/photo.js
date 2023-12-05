let blogs = [];
let nextBlogId = 1;

function getPhotos() {
    return blogs;
}

function getPhotoById(id) {
    return blogs.find(blog => blog.id === id) || null;
}

function addPhoto(blog) {
    const newPhoto = { id: nextBlogId++, ...blog };
    blogs.push(newPhoto);
}

function editPhoto(id, updatedBlog) {
    const index = blogs.findIndex(blog => blog.id === id);

    if (index !== -1) {
        blogs = blogs.map(blog => (blog.id === id ? { ...blog, ...updatedBlog } : blog));
    } else {
        throw new Error(`Фото з ID ${id} не існує`);
    }
}

function deletePhoto(id) {
    const index = blogs.findIndex(blog => blog.id === id);

    if (index !== -1) {
        blogs = blogs.filter(blog => blog.id !== id);
    } else {
        throw new Error(`Фото з ID ${id} не існує`);
    }
}

module.exports = { getPhotos, addPhoto,  deletePhoto, };

