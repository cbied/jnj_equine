
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

const scheduleMeeting = async (req,res) => {
    const db = req.app.get('db'),
        { date, time1, time2, description, payment, horse} = req.body;
    
        const scheduleMeeting = await db.create_meeting( [req.session.user.id, date, time1, time2, description, payment, horse] )
        return res.status(200).send(scheduleMeeting)
    
    
}

const getClientSchedule = async (req,res) => {
    const db = req.app.get('db')
    const userMeeting = await db.get_user_meeting([req.session.user.id]);
    return res.status(200).send(userMeeting);
}

const getClientHorse = async (req,res) => {
    const db = req.app.get('db')
    const userHorse = await db.get_user_horse([ req.session.user.id ])
    return res.status(200).send(userHorse)
}

const getClientMeetingInfo = async (req,res) => {
    const db = req.app.get('db')
    const userInfo = await db.get_client_meeting_info()
    return res.status(200).send(userInfo)
}

const getOneClientInfo = async (req,res) => {
    const db = req.app.get('db')
    const userInfo = await db.get_user_info_by_id([req.session.user.id])
    return res.status(200).send(userInfo)
}

const getClientHorseInfo = async (req,res) => {
    const db = req.app.get('db')
    const userHorseInfo = await db.get_all_client_horse_info([req.session.user.id])
    return res.status(200).send(userHorseInfo)
}

const updateClientInfo = async (req,res) => {
        const db = req.app.get('db'),
        { firstname, lastname, address, city, state,
            phonenumber, email } = req.body,
            { id } = req.session.user;
            
    const updateClientInfo = await db.update_client_info( id, firstname, lastname, address, city, state,
        phonenumber, email )
    return res.status(200).send(updateClientInfo)
}

const updateClientHorseInfo = async (req,res) => {
    const db = req.app.get('db'),
    { name, age, breed, discipline, past_injuries, 
        behavioral_issues, gender, pregnant, expected_pregnancy_date, horse_id} = req.body,
        { id } = req.session.user;

    const updateClientHorseInfo = await db.update_client_horse_info( id, name, age, breed, discipline, past_injuries, 
        behavioral_issues, gender, pregnant, expected_pregnancy_date, horse_id )
    return res.status(200).send(updateClientHorseInfo)
}

const deleteOneHorse = (req,res) => {
    const db = req.app.get('db'),
        { id } = req.params;
        
    db.delete_one_horse( id )
    return res.sendStatus(200)
}


module.exports = {
    registerHorse,
    scheduleMeeting,
    getClientSchedule,
    getClientHorse,
    getClientMeetingInfo,
    getOneClientInfo,
    getClientHorseInfo,
    updateClientInfo,
    updateClientHorseInfo,
    deleteOneHorse
}