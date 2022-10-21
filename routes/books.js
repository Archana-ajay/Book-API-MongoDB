const express = require('express');
const router = express.Router();
const { bodyMiddleware, queryMiddleware } = require('../middleware/validator');

const {
    getAllBooks,
    getRecommendedBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook,
} = require('../controllers/books');

router
    .route('/')
    .post(bodyMiddleware('book'), createBook)
    .get(queryMiddleware('query'), getAllBooks);
router
    .route('/recommended_books')
    .get(queryMiddleware('query'), getRecommendedBooks);
router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook);

module.exports = router;
