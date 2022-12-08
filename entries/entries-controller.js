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
    app.post("/entries/create", createEntry)
    app.get("/entries/find/:user", findEntryByUser)
}
export default EntriesController