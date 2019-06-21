import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

export class ClientProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            clientInfo: 
                {
                firstname: null,
                lastname: null, 
                address: null, 
                city: null, 
                state: null,
                phonenumber: null, 
                email: null
                }

            
        }

        
    }

    componentDidMount() {
            this.getClientInfo()
    }

    handleChange = e => {
        let { clientInfo } = this.state
        this.setState({clientInfo: {...clientInfo, [e.target.name]: e.target.value}})
    }

    getClientInfo = () => {
    axios
        .get('/api/oneClientInfo')
        .then(response => this.setState({ clientInfo: response.data[0]}))
        .catch(err => console.log(`ClientProfile-getClientInfo ${err}`))
    }

    updateUser = () => {
        const { firstname, lastname, address, city, state,
                phonenumber, email } = this.state.clientInfo
        axios
            .put('/api/clientInfo', { firstname, lastname, address, city, state,
                phonenumber, email })
            .then(user => {  
                this.userUpdate(user.data);
            })
            .catch(err => {
                alert(err.response.request.response);
            });
    }

    userUpdate = user => {
        this.setState({
            user,
        });
    }


    render() {
        const { clientInfo } = this.state         
        return (
            <Form className="App">
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" name="firstname"  value={clientInfo.firstname}  
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input type="text" name="lastname" value={clientInfo.lastname}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" value={clientInfo.address}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" value={clientInfo.city}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={1}>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" value={clientInfo.state}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            </Row>
            
            <Row form>
                <Col md={4}>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phonenumber" value={clientInfo.phonenumber}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={4}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={clientInfo.email}
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Button
                onClick={() => {
                    this.props.modalProfileFn()
                    this.props.toggleProfileFn()
                }}
            >cancel</Button>
            <Button
                onClick={() => {
                    this.updateUser()
                    this.props.modalProfileFn()
                    this.props.toggleProfileFn()
                    alert('Your information was updated!')
                }}
            >Save</Button>
        </Form>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps)(ClientProfile)
