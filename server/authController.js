const bcrypt = require('bcrypt')

async function register(req,res) {
    const db = req.app.get('db'),
        { firstName, lastName, address, city, state, phoneNumber, email, username, password, isAdmin } = req.body;

    const result = await db.get_user([ username ])
    const existingUser = result[0]

    if(existingUser) {
        return res.status(409).send('Username taken, try again')
    }

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)
    const registeredUser = await db.register_user([ username, hash, isAdmin, firstName, lastName, address, city, state, phoneNumber, email ])
    const user = registeredUser[0]
    if(user) {
        req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id }
    }
    

    return res.status(201).send(req.session.user)
}

async function login(req,res) {
    const db = req.app.get('db'),
        { username, password } = req.body;

    const foundUser = await db.get_user([username]);
    const user = foundUser[0];

    if (!user) {
        return res.status(401).send('User not found. Please register as a new user before logging in.');
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password');
    }

    req.session.user = { isAdmin: user.isadmin, id: user.id, username: user.username };
        
    return res.send(req.session.user);
}

    const session = async (req,res) => {
        const db = req.app.get('db'),
        { username } = req.session.user;

        const foundUser = await db.get_user([username]);
        const user = foundUser[0];
        if (req.session) {
            req.session.user = { isAdmin: user.isadmin, id: user.id, username: user.username };
        
            return res.send(req.session.user);
        }
    }

const logout = (req,res) => {
    req.session.destroy();
    return res.sendStatus(200);
}


module.exports = {
    register,
    login,
    session,
    logout
}