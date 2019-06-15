
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
    scheduleOne,
    getClientSchedule
}