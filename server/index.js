require('dotenv').config()
const express = require('express'),
    cors = require("cors"),
    massive = require('massive'),
    session = require('express-session'),
    app = express(),
    clientController = require('./clientController'),
    adminController = require('./adminController'),
    authController = require('./authController'),
    stripeController = require('./stripeController'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;



massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log(`it's ALIVE!`)
    })
    .catch(error => console.log(`oops, you have an error: ${error}`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 6 // 6 months
    }
}))

app.use(express.json())
app.use(cors());

// authController 
// registers user
app.post('/auth/register', authController.register)
// login user
app.post('/auth/login', authController.login)
// logout user
app.post('/auth/logout', authController.logout)


// clientController and AdminController 
app.get('/api/clientInfo', clientController.getClientMeetingInfo)


// clientController
app.post('/api/schedule', clientController.scheduleMeeting)
// client horse registration
app.post('/api/horse', clientController.registerHorse)
// gets clients schedule
app.get('/api/schedule', clientController.getClientSchedule)
// gets clients horse name
app.get('/api/clientHorse', clientController.getClientHorse)
// gets client's information
app.get('/api/oneClientInfo', clientController.getOneClientInfo)
// gets all clients horse information
app.get('/api/clientHorseInfo', clientController.getClientHorseInfo)
// edits clients info
app.put(`/api/clientInfo`, clientController.updateClientInfo)
// edits clients horse info
app.put('/api/clientHorseInfo', clientController.updateClientHorseInfo)
// client can delete horse
app.delete(`/api/clientHorseInfo/:id`, clientController.deleteOneHorse)

// adminController
// gets all clients schedule pending is null meetings
app.get('/api/schedules', adminController.getClientSchedules)
// get all clients schedule pening = true meetings
app.get('/api/approvedSchedules', adminController.getClientMeetingsApproved)
// update the meetings time, date and pending true/false
app.put('/api/schedule', adminController.updateMeetingInfo)




// stripe checkout
app.post("/checkout", stripeController.chargeCard);

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})