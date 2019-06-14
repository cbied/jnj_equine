
const scheduleOne = (req,res) => {
    const db = req.app.get('db'),
        { date, time } = req.body;


    db.create_meeting( [date, time, req.session.user.id] )
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`Client_createOne: ${error}`))
}

module.exports = {
    scheduleOne
}