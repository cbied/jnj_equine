require('dotenv').config()
const express = require('express'),
    cors = require("cors"),
{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_SECRET_KEY } = process.env,
    stripe = require("stripe")(STRIPE_SECRET_KEY),
    uuid = require("uuid/v4"),
    massive = require('massive'),
    session = require('express-session'),
    app = express(),
    clientController = require('./clientController'),
    adminController = require('./adminController'),
    authController = require('./authController');



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

// stripe checkout

    app.post("/checkout", async (req, res) => {

    let error;
    let status;
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create(
        {
            amount: 150 * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `1 hour equine massage`,
            shipping: {
            name: 'equine massage',
            address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
            }
            }
        },
        {
            idempotency_key
        }
        );
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
    });

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})