import React from 'react';
import ClientDashboard from './ClientSide/ClientDashboard'
import AdminDashboard from './AdminSide/AdminDashboard'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Header extends React.Component {
constructor(props) {
super(props);

this.state = {
    collapsed: true,
    username: '',
    password: '',
    user: {}
};
}

toggleNavbar = () => {
this.setState({
    collapsed: !this.state.collapsed
});
}

handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}

updateUser = user => {
    this.setState({user});
}

login = () => {
    const { username, password } = this.state;
    axios
        .post('/auth/login', { username, password })
        .then(user => {
        this.updateUser(user.data)
        this.setState({ username: '', password: '' });
        })
        .catch(() => alert('Incorrect username or password'));
}

logout = () => {
    axios
        .post('/auth/logout')
        .then(() => {
        this.updateUser({});
        })
        .catch(err => console.log(err));
}



render() {
    const { username, password, user } = this.state
return (
    <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">JnJ Equine Massage</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
        <Nav navbar>
        {user.id && !user.isAdmin ? 
        (
        <div>
            <div>
                <ClientDashboard 
                userId={user.id}
                username={user.username}
                isAdmin={user.isAdmin}
            />
            </div>
            <div>
                <Button type="submit" color='outline-danger'
                onClick={this.logout}>
                    Logout
                </Button>
            </div>
            
        </div>
        )

            :

        user.id && user.isAdmin ?
        <div>
            <div className="welcomeMessage">
                <h4>Welcome {user.username}</h4>
                <h3>admin login</h3>
                <Button type="submit" onClick={this.logout}>
                    Logout
                </Button>
            </div>
            <div>
                <AdminDashboard 
                userId={user.id}
                username={user.username}
                isAdmin={user.isAdmin}
            />
            </div>
        </div>

            :

        (
            <div>
                <h3>Username</h3>
                <Input placeholder="username" name="username" value={username} 
                onChange={e => this.handleChange(e)}
                />
                <h3>Password</h3>
                <Input placeholder="password" name="password" value={password} type="password"
                onChange={e => this.handleChange(e)}
                />
                <Link to="/wizard/step_one"><p>Not a member yet? register here</p></Link>
                <Button
                onClick={() => this.login()}
                >Login</Button>
            </div>
        )}
        
        </Nav>
        </Collapse>
    </Navbar>
);
}
}
