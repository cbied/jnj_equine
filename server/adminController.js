


const getClientSchedules = async (req,res) => {
    const db = req.app.get('db')
    const allMeetings = await db.get_all_meetings();
    return res.status(200).send(allMeetings)
}

const deleteOneSchedule = (req,res) => {
    const db = req.app.get('db'),
        { id } = req.params

    db.delete_meeting(id)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(`adminController-delete_meeting: ${error}`))
}

// const updateClientInfo = (req,res) => {
//     const db = req.app.get('db'),
//     { name, hash } = req.body,
//     { id } = req.params

//     db.editOne( id, name, address, city, state, zipcode, image_url, monthly_rent, monthly_mortgage )
//         .then(response => res.status(200).json(response))
//         .catch(error => res.status(500).send(`controller-updateOne: ${error}`))
// }

module.exports = {
    getClientSchedules,
    deleteOneSchedule,
    // updateClientInfo
}