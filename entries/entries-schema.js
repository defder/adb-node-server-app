import mongoose from "mongoose"

const entriesSchema = mongoose.Schema({
    status: String,
    gameId: String,
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: 'entries'})
export default entriesSchema