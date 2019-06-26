import { createStore, combineReducers } from 'redux'
import loginReducer from './loginReducer'
// import { sessionReducer, sessionService } from 'redux-react-session'

// const rootReducer = combineReducers({
//     session: sessionReducer,
//     loginReducer: loginReducer
// })

// const reducer = combineReducers(rootReducer);
// const store = createStore(reducer)

// sessionService.initSessionService(store);

// const validateSession = (session) => {
//     // check if your session is still valid
//     return true;
//   }
//   const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession };
//   sessionService.initSessionService(store, options)
//     .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
//     .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

export default createStore(loginReducer)