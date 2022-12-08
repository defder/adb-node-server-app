import entriesModel from "./entries-model.js"

export const createEntry = (entry) =>
    entriesModel.create(entry)

export const findEntriesByUser = (user) =>
    entriesModel.find({user})