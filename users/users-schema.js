import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    email: String,
    phoneNumber: String,
    firstName: String,
    lastName: String,
    role: {type: String, enum: ["REVIEWER", "REGULAR"], default: "REGULAR"}
}, {collection: "users"})

export default usersSchema