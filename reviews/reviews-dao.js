import reviewsModel from "./reviews-model.js"

export const createReview = (review) => {
    return reviewsModel.create(review)
}

export const findReviewsByGame = (gameId) => {
    return reviewsModel.find({gameId}).populate("author").exec()
}

export const findReviewsByAuthor = (author) => {
    reviewsModel.find({author})
}