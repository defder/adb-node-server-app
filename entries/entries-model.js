import mongoose from "mongoose"
import entriesSchema from "./entries-schema.js";

const entriesModel = mongoose.model('EntryModel', entriesSchema)
export default entriesModel