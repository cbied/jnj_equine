import axios from 'axios'

const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    isAdmin: false,
    user: {}
}

const REGISTER = 'REGISTER'
const HANDLE_USERNAME = 'HANDLE_USERNAME'
const HANDLE_PASSWORD = 'HANDLE_PASSWORD'


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

export const register = ( username, password, idAdmin, firstName, lastName, 
                            address, city, state, phoneNumber, email ) => {
    let user = axios
        .post('/auth/register', { username, password, idAdmin, firstName, lastName, 
                                    address, city, state, phoneNumber, email })
        .then(response => response.data)
    return {
        type: REGISTER,
        payload: user
    }
}




export default function reducer(state=initialState,action) {
    const { type, payload } = action

    switch(type) {
        case REGISTER:
            return { ...state, user: payload }
        case HANDLE_USERNAME:
                return { ...state, username: payload}
        case HANDLE_PASSWORD:
            return { ...state, password: payload}
        default: return state
    }
}