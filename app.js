import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js"
import EntriesController from "./entries/entries-controller.js";
import ReviewsController from "./reviews/reviews-controller.js"

mongoose.connect('mongodb://localhost:27017/adb').then(r => console.log("Connected!"));

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(session({
    secret: "super top secret secret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(express.json());
UsersController(app);
EntriesController(app)
ReviewsController(app)
app.listen(4000);