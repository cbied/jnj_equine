


const getClientSchedules = async (req,res) => {
    const db = req.app.get('db')
    const pendingMeetings = await db.get_all_pending_meetings();
    return res.status(200).send(pendingMeetings)
}

const getClientMeetingsApproved = async (req,res) => {
    const db = req.app.get('db')
    const approvedMeetings = await db.get_all_approved_meetings();
    return res.status(200).send(approvedMeetings)
}

const clientHorseInfoApproved = async (req,res) => {
    const db = req.app.get('db')
    const clientHorseInfo = await db.get_client_horse_info_approved();
    return res.status(200).send(clientHorseInfo)
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

    db.edit_meeting( id, meeting_date, meeting_time, price, pending )
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).send(`adminController-updateMeetingInfo: ${error}`))
}

const updatePaid = (req,res) => {
    const db = req.app.get('db'),
    { id, paid } = req.body;
    console.log(req.body)

    db.update_paid( id, paid)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).send(`adminController-updatePaid: ${error}`))
}

const getClientHorseInfoAdmin = async (req,res) => {
    const db = req.app.get('db')
    
    const info = await db.get_client_horse_info_admin()
    return res.status(200).send(info)
}


module.exports = {
    getClientSchedules,
    getClientMeetingsApproved,
    clientHorseInfoApproved,
    deleteOneSchedule,
    updateMeetingInfo,
    updatePaid,
    getClientHorseInfoAdmin
}