import entriesModel from "./entries-model.js"

// If Entry exists, update that entry, otherwise create new one
export const createEntry = (entry) => {
    const filter = {user: entry.user, gameId: entry.gameId, title: entry.title}
    return entriesModel.findOneAndUpdate(filter, entry, {upsert: true, new: true});
}
export const findEntriesByUser = (user) =>
    entriesModel.find({user})

export const countCompleted = (uid) => {
    return entriesModel.countDocuments({user: uid, status: "Completed"})
}

export const countPlaying = (uid) => {
    return entriesModel.countDocuments({user: uid, status: "Playing"})
}

export const countPlanToPlay = (uid) => {
    return entriesModel.countDocuments({user: uid, status: "Plan to Play"})
}

export const countDropped = (uid) => {
    return entriesModel.countDocuments({user: uid, status: "Dropped"})
}

export const findEntryByUserAndGameId = (uid, gid) => {
    return entriesModel.findOne({user: uid, gameId: gid})
}

export const deleteEntry = (uid, gid) => {
    return entriesModel.deleteOne({user: uid, gameId: gid})
}

export const findUserPlayingEntries = (uid) => {
    return entriesModel.find({user: uid, status: "Playing"}).limit(4)
}

export const findEntryByGame = (gid) => {
    return entriesModel.find({gameId: gid}).populate("user").exec()
}