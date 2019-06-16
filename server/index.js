require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    session = require('express-session')
    app = express(),
    clientController = require('./clientController')
    adminController = require('./adminController')
    authController = require('./authController'),
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

// authController 
app.post('/auth/register', authController.register)
app.post('/auth/login', authController.login)
app.post('/auth/logout', authController.logout)

// clientController
app.post('/api/schedule', clientController.scheduleOne)
app.post('/api/horse', clientController.registerHorse)
app.get('/api/schedule', clientController.getClientSchedule)
// ** add after MVP
// app.put(`api/clientInfo/:id`, clientController.updateClientInfo)

// adminController
app.get('/api/schedules', adminController.getClientSchedules)
app.delete(`/api/schedule/:id`, adminController.deleteOneSchedule)
app.put(`/api/schedule/:id`, adminController.updateMeetingInfo)


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})