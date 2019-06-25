import React, { Component } from 'react';
import StepTwo from './StepTwo'
import { Col, Row, Button, Form, FormGroup, Label, Input, ModalBody, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'



class StepOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            phoneNumber: '',
            email: '',
            username: '',
            password: '',
            isAdmin: false,
            user: {},
            modalHorseRegistration: false
        }

        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    updateUser = user => {
        this.setState({
            user,
        });
    }

    register = () => {
        const { firstName, lastName, address, city, state,
                phoneNumber, email, username, password, isAdmin} = this.state
        axios
            .post('/auth/register', { firstName, lastName, address, city, state,
                phoneNumber, email, username, password, isAdmin })
            .then(user => {
                this.updateUser(user.data);
                // this.setState({ username: '', password: '' });
            })
            .catch(err => {
                this.setState({ username: '', password: '' });
                alert(err.response.request.response);
            });
    }

    toggleHorseRegistration = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
    modalHorseRegistration = () => {
        this.setState(prevState => ({
            modalHorseRegistration: !prevState.modal
        }));
    }


    render() {
        const { firstName, lastName, address, city, state,
            phoneNumber, email, username, password } = this.state
        return (
        <Form className="App">
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" name="firstName"  value={firstName} placeholder="first name" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input type="text" name="lastName" value={lastName} placeholder="last name" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" value={address} placeholder="1234 Main St"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" value={city} placeholder="Topsail"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={2}>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" value={state} placeholder="NC"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            </Row>
            
            <Row form>
                <Col md={5}>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" value={phoneNumber} placeholder="(910)-867-5309"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={email} placeholder="yourEmail@gmail.com"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                
            </Row>
            <Row>
            <Col md={5}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" value={username} placeholder="iHeartMyHorse"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>  
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" value={password}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>  
                </Col>
            </Row>


            <Button
                onClick={() => {
                    this.props.modalRegistrationFn()
                    this.props.toggleRegistrationFn()
                    this.props.modalRegistrationFn()
                    this.props.toggleRegistrationFn()
                }}
            >Cancel</Button>
        
            <Button
                onClick={() => {
                    this.register()
                    this.props.modalRegistrationFn()
                    this.props.toggleRegistrationFn()
                    this.props.modalRegistrationFn()
                    this.props.toggleRegistrationFn()
                    alert('Your are registered! Login in and add a horse to your profile.')
                }}
            >Register</Button>
        
        </Form>
        )
    }
}


export default StepOne
