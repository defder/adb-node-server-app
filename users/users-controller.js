import * as userDao from "./users-dao.js";

const UsersController = (app) => {
    // Primary just for testing database connection
    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        res.json(users)
    }

    const register = async (req, res) => {
        const user = req.body
        if (!user.username || !user.password) {
            res.sendStatus(403)
            return
        }
        const userExists = await userDao.findUserByCredentials(user.username, user.password)
        if (userExists) {
            res.sendStatus(403)
            return
        }
        const newUser = await userDao.createUser(user)
        req.session['currentUser'] = newUser
        res.json(newUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao.findUserByCredentials(credentials.username, credentials.password)
        if (existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
        } else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const getCurrentUser = async (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const findUserById = async (req, res) => {
        const uid = req.params.uid
        const user = await userDao.findUserById(uid)
        if (user) {
            res.json(user)
        } else {
            res.sendStatus(404)
        }
    }

    const updateUser = async (req, res) => {
        const uid = req.session['currentUser']._id
        const updates = req.body
        const updatedUser = await userDao.updateUsers(uid, updates)
        req.session['currentUser'] = updatedUser
        res.json(updatedUser)
    }

    // Endpoints
    app.get('/users', findAllUsers)
    app.get('/users/:uid', findUserById)

    // Related to logging in and signing out
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', getCurrentUser)
    app.put('/profile/:uid', updateUser)
}
export default UsersController;