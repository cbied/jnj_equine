import React from 'react';
import ClientDashboard from './ClientSide/ClientDashboard'
import AdminDashboard from './AdminSide/AdminDashboard'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUsername, handlePassword, handleUpdateUser } from '../redux/loginReducer'
import axios from 'axios'

class Header extends React.Component {
constructor(props) {
super(props);

this.state = {
    collapsed: true,
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



// login = () => {
//     const { username, password } = this.state;
//     axios
//         .post('/auth/login', { username, password })
//         .then(user => {
//         this.updateUser(user.data)
//         this.setState({ username: '', password: '' });
//         })
//         .catch(() => alert('Incorrect username or password'));
// }

logIn = () => {
    let { username, password }= this.props
    axios
        .post('/auth/login', { username, password })
        .then(user => {
            console.log(user)
            this.props.handleUpdateUser(user.data) 
        })
        .catch(() => alert('Incorrect username or password'));
}


logout = () => {
    axios
        .post('/auth/logout')
        .then(() => {
            this.props.handleUpdateUser({}) 
        })
        .catch(err => console.log(err));
}

render() {
    const { username, password, user } = this.props
    console.log(user)
return (
                !user.id ? 
                (
                <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">JnJ Equine Massage</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                    
                <h3>Username</h3>
                <Input placeholder="username" name="username" value={username} 
                onChange={e => this.props.handleUsername(e.target.value)}
                />
                <h3>Password</h3>
                <Input placeholder="password" name="password" value={password} type="password"
                onChange={e => this.props.handlePassword(e.target.value)}
                />
                <Link to="/wizard/step_one"><p>Not a member yet? register here</p></Link>
                <Button
                onClick={() => {
                    this.logIn(username, password) 
                    
                }}
                >Login</Button>
            
                </Nav>
                </Collapse>
                </Navbar>
                )
            : user.id && !user.isAdmin ?
            (
            <div>
            <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">JnJ Equine Massage</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            
            {/* <Button type="submit" color='outline-danger'
                onClick={() => this.logout()}>
                    Logout
            </Button> */}
            </Nav>
            </Collapse>
            </Navbar>
            <ClientDashboard 
            logout={this.logout}
            />
            </div>
            )
            
            : user.id && user.isAdmin ?
            (
            <div>
            <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">JnJ Equine Massage</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            
            {/* <Button type="submit" color='outline-danger'
                onClick={() => this.logout()}>
                    Logout
            </Button> */}
            </Nav>
            </Collapse>
            </Navbar>
            <AdminDashboard 
            logout={this.logout}
            />
            </div>
            )
            
    
        :

        false
            
            

        
        
        
        
        
            );
    }
}

function mapStateToProps(state) {
    const { loggedIn, username, password, user} = state
    return {loggedIn, username, password, user }
}

export default connect(mapStateToProps, { handleUsername, handlePassword, handleUpdateUser })(Header)