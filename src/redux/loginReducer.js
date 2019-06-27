
const initialState = {
    username: '',
    password: '',
    user: []
}

const HANDLE_USERNAME = 'HANDLE_USERNAME'
const HANDLE_PASSWORD = 'HANDLE_PASSWORD'
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
        default: return state
    }
}