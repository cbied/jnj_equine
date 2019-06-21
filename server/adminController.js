


const getClientSchedules = async (req,res) => {
    const db = req.app.get('db')
    const allMeetings = await db.get_all_pending_meetings();
    return res.status(200).send(allMeetings)
}

const deleteOneSchedule = (req,res) => {
    const db = req.app.get('db'),
        { id } = req.params

    db.delete_meeting(id)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(`adminController-delete_meeting: ${error}`))
}

const updateMeetingInfo = (req,res) => {
    const db = req.app.get('db'),
    { id, meeting_time, meeting_date, price, pending } = req.body;
        // { id } = req.params;
    console.log(req.body)
    db.edit_meeting( id, meeting_time, meeting_date, price, pending )
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).send(`controller-updateOne: ${error}`))
}


module.exports = {
    getClientSchedules,
    deleteOneSchedule,
    updateMeetingInfo
}