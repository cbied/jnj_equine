import axios from 'axios'

const initialState = {
    username: '',
    password: '',
    isAdmin: null,
    userId: '',
    loggedIn: false,
    user: {}
}

const HANDLE_USERNAME = 'HANDLE_USERNAME'
const HANDLE_PASSWORD = 'HANDLE_PASSWORD'
const HANDLE_IS_ADMIN = 'HANDLE_IS_ADMIN'
const HANDLE_USER_ID = 'HANDLE_USER_ID'
const HANDLE_UPDATE_USER = 'HANDLE_UPDATE_USER'



export const handleUsername = (username) => {
    return {
        type: HANDLE_USERNAME,
        payload: username
    }
}

export const handlePassword = (password) => {
    return {
        type: HANDLE_PASSWORD,
        payload: password
    }
}

export const handleIsAdmin = (isAdmin) => {
    return {
        type: HANDLE_IS_ADMIN,
        payload: isAdmin
    }
}

export const handleUserId = (userId) => {
    return {
        type: HANDLE_USER_ID,
        payload: userId
    }
}

export const handleUpdateUser = (user) => {
    return {
        type: HANDLE_UPDATE_USER,
        payload: user
    }
}

export default function reducer(state=initialState,action) {
    const { type, payload } = action

    switch(type) {
        case HANDLE_USERNAME:
                return { ...state, username: payload}
        case HANDLE_PASSWORD:
            return { ...state, password: payload}
        case HANDLE_UPDATE_USER:
            return { ...state, user: payload }
        case HANDLE_IS_ADMIN:
            return { ...state, isAdmin: payload}
        case HANDLE_USER_ID:
            return { ...state, userId: payload}
        default: return state
    }
}