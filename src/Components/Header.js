import React from 'react';
import ClientDashboard from './ClientSide/ClientDashboard'
import AdminDashboard from './AdminSide/AdminDashboard'
import ClientProfile from './ClientSide/ClientProfile'
import ListClientHorsesForUpdate from './ClientSide/ListClientHorsesForUpdate'
import ClientSchedulerMeeting from './ClientSide/ClientScheduleMeeting'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUsername, handlePassword, handleUpdateUser } from '../redux/loginReducer'
import axios from 'axios'

class Header extends React.Component {
constructor(props) {
super(props);

this.state = {
    collapsed: true,
    modalProfile: false,
    modalHorseProfile: false,
    modal: false,
    
    };
}

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleProfile = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    modalProfile = () => {
        this.setState(prevState => ({
            modalProfile: !prevState.modal
        }));
    }

    toggleHorseProfile = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    modalHorseProfile = () => {
        this.setState(prevState => ({
            modalHorseProfile: !prevState.modal
        }));
    }

    toggleSchedule = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    modalSchedule = () => {
        this.setState(prevState => ({
            modalSchedule: !prevState.modal
        }));
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
    console.log(this.state.modalHorseProfile)
return (
                !user.id ? 
                (
                <Navbar color="faded" className="nav" light>
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
            : 
            user.id && !user.isAdmin ?
            (
            <div className="center">
            <ClientDashboard 
            logout={this.logout}
            />

            <Navbar color="faded" className="center" light>
            <NavbarBrand href="/" >JnJ Equine Massage</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mb-2"/>
            <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            
            {/*  edit client info */}
            <Button color='outline-secondary' className='mb-3' onClick={this.modalProfile}>Client Profile</Button>
                
                <Modal isOpen={this.state.modalProfile} toggle={this.toggleProfile} className={this.props.className}>
                    <ModalHeader toggle={this.toggleProfile}>Update Profile</ModalHeader>
                    <ModalBody>
                        <ClientProfile 
                        modalProfileFn={this.modalProfile}
                        toggleProfileFn={this.toggleProfile}
                        />
                    </ModalBody>
                </Modal>

                {/* edit client horse */}
                <Button color='outline-secondary' className='mb-3' onClick={this.modalHorseProfile}>Horse Profile</Button>
                
                <Modal isOpen={this.state.modalHorseProfile} toggle={this.toggleHorseProfile} className={this.props.className}>
                    <ModalHeader>Update Horse Profile</ModalHeader>
                        
                    <ModalBody>

                    <ListClientHorsesForUpdate 
                            modalHorseProfileFn={this.modalHorseProfile}
                            toggleHorseProfileFn={this.toggleHorseProfile}
                    />
                    </ModalBody>
                </Modal>

            
                {/* schedule meeting */}
                <Button color='outline-secondary' className='mb-3' onClick={this.modalSchedule}>Schedule</Button>
                
                <Modal isOpen={this.state.modalSchedule} toggle={this.toggleSchedule} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Schedule an Appointment</ModalHeader>
                    <ModalBody>
                        <ClientSchedulerMeeting 
                        modalScheduleFn={this.modalSchedule}
                        toggleScheduleFn={this.toggleSchedule}
                        />
                    </ModalBody>
                </Modal>

                {/* logout */}
                <Button type="submit" color='outline-danger'
                onClick={() => this.logout()}>
                    Logout
                </Button>
            </Nav>
            </Collapse>
            </Navbar>
           
            
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
            
            <Button type="submit" color='outline-danger'
                onClick={() => this.logout()}>
                    Logout
            </Button>

            </Nav>
            </Collapse>
            </Navbar>
            <AdminDashboard 
            logout={this.logout}
            />
            </div>
            )
            
    
        :

        null
        
            );
    }
}

function mapStateToProps(state) {
    const { loggedIn, username, password, user} = state
    return {loggedIn, username, password, user }
}

export default connect(mapStateToProps, { handleUsername, handlePassword, handleUpdateUser })(Header)