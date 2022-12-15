import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, default: ""},
    phoneNumber: {type: String, default: ""},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    role: {type: String, enum: ["REVIEWER", "REGULAR"], default: "REGULAR"}
}, {collection: "users"})

export default usersSchema