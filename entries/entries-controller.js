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
        if (req.session['currentUser']) {
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
        } else {
            res.sendStatus(404)
        }
    }

    const getEntryByUserAndGameId = async (req, res) => {
        if (req.session['currentUser']) {
            const uid = req.session['currentUser']._id
            const gameId = req.params.gameId
            const existingEntry = await entriesDao.findEntryByUserAndGameId(uid, gameId)
            res.json(existingEntry)
        } else {
            res.send(null)
        }
    }

    const deleteEntryByGameId = async (req, res) => {
        if (req.session['currentUser']) {
            const uid = req.session['currentUser']._id
            const gameId = req.params.gameId
            const deleteStatus = await entriesDao.deleteEntry(uid, gameId)
            res.json(deleteStatus)
        } else {
            res.sendStatus(404)
        }
    }

    const findUserEntryByPlaying = async (req, res) => {
        if (req.session['currentUser']) {
            const uid = req.session['currentUser']._id
            const playingEntries = await entriesDao.findUserPlayingEntries(uid)
            console.log("Currently Playing", playingEntries)
            res.json(playingEntries)
        } else {
            res.send(null)
        }
    }

    app.post("/entries/create", createEntry)
    app.get("/entries/find/:user", findEntryByUser)
    app.get("/entries/count", getEntryCategoryCount)
    app.get("/entries/exists/:gameId", getEntryByUserAndGameId)
    app.delete("/entries/delete/:gameId", deleteEntryByGameId)
}
export default EntriesController