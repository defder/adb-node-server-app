import * as userDao from "./users-dao.js";

let currentUser = null

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
        const userExists = await userDao.findUserByCredentials(credentials.username, credentials.password)
        if (userExists) {
            currentUser = userExists
            res.json(userExists)
        } else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }

    const getCurrentUser = async (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    // Endpoints
    app.get('/users', findAllUsers)

    // Related to logging in and signing out
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', getCurrentUser)
}
export default UsersController;