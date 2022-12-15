import * as entriesDao from "./entries-dao.js"

const EntriesController = (app) => {
    const createEntry = async (req, res) => {
        const entry = req.body
        const currentUser = req.session['currentUser']
        entry.user = currentUser._id
        const dbEntry = await entriesDao.createEntry(entry)
        res.json(dbEntry)
    }
    const findEntryByUser = async (req, res) => {
        const user = req.params.user
        if (user) {
            const entries = await entriesDao.findEntriesByUser(user)
            res.json(entries)
        }
    }

    const getEntryCategoryCount = async (req, res) => {
        const uid = req.session['currentUser']._id
        const completedCount = await entriesDao.countCompleted(uid)
        const playingCount = await entriesDao.countPlaying(uid)
        const planToPlayCount = await entriesDao.countPlanToPlay(uid)
        const droppedCount = await entriesDao.countDropped(uid)

        res.json({
            completed: completedCount,
            playing: playingCount,
            planToPlay: planToPlayCount,
            dropped: droppedCount
        })
    }

    const getEntryByUserAndGameId = async (req, res) => {
        if (req.session['currentUser']) {
            const uid = req.session['currentUser']._id
            const gameId = req.params.gameId
            const existingEntry = await entriesDao.findEntryByUserAndGameId(uid, gameId)
            console.log("entry", existingEntry)
            res.json(existingEntry)
        } else {
            res.send(null)
        }
    }

    app.post("/entries/create", createEntry)
    app.get("/entries/find/:user", findEntryByUser)
    app.get("/entries/count", getEntryCategoryCount)
    app.get("/entries/exists/:gameId", getEntryByUserAndGameId)
}
export default EntriesController