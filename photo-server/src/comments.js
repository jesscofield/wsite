let comments = [];
let nextCommentId = 1;

function getComments() {
    return comments;
}

function addComment(comment) {
    const newComment = { id: nextCommentId++, ...comment };
    comments.push(newComment);
}

function editComment(id, updatedComment) {
    const index = comments.findIndex(comment => comment.id === id);

    if (index !== -1) {
        comments = comments.map(comment => (comment.id === id ? { ...comment, ...updatedComment } : comment));
    } else {
        throw new Error(`Коментар з ID ${id} не існує`);
    }
}

function deleteComment(id) {
    const index = comments.findIndex(comment => comment.id === id);

    if (index !== -1) {
        comments = comments.filter(comment => comment.id !== id);
    } else {
        throw new Error(`Коментар з ID ${id} не існує`);
    }
}

module.exports = { getComments, addComment, editComment, deleteComment };
