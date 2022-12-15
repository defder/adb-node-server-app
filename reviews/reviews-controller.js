import * as reviewsDao from "./reviews-dao.js"

const ReviewsController = (app) => {
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']
        review.author = currentUser._id
        const createdReview = await reviewsDao.createReview(review)
        res.json(createdReview)
    }
    const findReviewsByGame = async (req, res) => {
        const gameId = req.params.gameId
        const reviews = await reviewsDao.findReviewsByGame(gameId)
        res.json(reviews)
    }
    const findReviewsByAuthor = async (req, res) => {
        const author = req.params.author
        const reviews = await reviewsDao.findReviewsByAuthor(author)
        res.json(reviews)
    }
    app.post("/reviews", createReview)
    app.get("/reviews/:gameId", findReviewsByGame)
    app.get("/reviews/:author", findReviewsByAuthor)
}
export default ReviewsController