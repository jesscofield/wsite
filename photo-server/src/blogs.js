let blogs = [];
let nextBlogId = 1;

function getBlogs() {
    return blogs;
}

function getBlogById(id) {
    return blogs.find(blog => blog.id === id) || null;
}

function addBlog(blog) {
    const newBlog = { id: nextBlogId++, ...blog };
    blogs.push(newBlog);
}

function editBlog(id, updatedBlog) {
    const index = blogs.findIndex(blog => blog.id === id);

    if (index !== -1) {
        blogs = blogs.map(blog => (blog.id === id ? { ...blog, ...updatedBlog } : blog));
    } else {
        throw new Error(`Блог з ID ${id} не існує`);
    }
}

function deleteBlog(id) {
    const index = blogs.findIndex(blog => blog.id === id);

    if (index !== -1) {
        blogs = blogs.filter(blog => blog.id !== id);
    } else {
        throw new Error(`Блог з ID ${id} не існує`);
    }
}

module.exports = { getBlogs, addBlog, editBlog, deleteBlog, getBlogById };

