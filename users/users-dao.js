import usersModel from "./users-model.js";

export const findAllUsers = async () => {
    return usersModel.find();
}

export const updateUsers = async (uid, updates) => {
    return usersModel.findByIdAndUpdate({_id: uid}, updates, {new: true})
}

export const findUserByCredentials = async (username, password) => {
    return usersModel.findOne({username, password})
}

export const findUserByUsername = async (username) => {
    await usersModel.findOne({username})
}

export const createUser = async (user) => {
    return usersModel.create(user)
}

export const findUserById = (uid) => {
    return usersModel.findById(uid)
}