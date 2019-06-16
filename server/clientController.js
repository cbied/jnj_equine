
const registerHorse = (req,res) => {
    const db = req.app.get('db'),
        { name, age, breed, discipline, past_injuries, 
        behavioral_issues, gender, pregnant, expected_pregnancy_date} = req.body,
        { id } = req.session.user;

    db.register_horse( [name, age, breed, discipline, past_injuries, 
        behavioral_issues, gender, pregnant, expected_pregnancy_date, id] )
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`Client_registerHorse: ${error}`))
}

const scheduleOne = (req,res) => {
    const db = req.app.get('db'),
        { date, time } = req.body;

    db.create_meeting( [date, time, req.session.user.id] )
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`Client_createOne: ${error}`))
}

const getClientSchedule = async (req,res) => {
    const db = req.app.get('db')
    const userMeeting = await db.get_user_meeting([req.session.user.id]);
    return res.status(200).send(userMeeting);
}

module.exports = {
    registerHorse,
    scheduleOne,
    getClientSchedule
}