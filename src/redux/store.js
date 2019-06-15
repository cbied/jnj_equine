import { createStore } from 'redux'
import registerReducer from './registerReducer'

export default createStore(registerReducer)