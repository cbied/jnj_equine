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

export const register = ( firstName, lastName, address, city, 
                            state, phoneNumber, email ,username, 
                            password, idAdmin) => {
    let user = axios
        .post('/auth/register', { firstName, lastName, address, city, 
                                    state, phoneNumber, email ,username, 
                                    password, idAdmin })
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

        default: return state
    }
}