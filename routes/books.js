const express = require("express")
const router = express.Router()

const {
    getAllBooks,
    getRecommendedBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require("../controllers/books")

router.route('/').post(createBook).get(getAllBooks)
router.route('/recommended_books').get(getRecommendedBooks)
router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)

module.exports = router