import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../../redux/registerReducer'
import { Link } from 'react-router-dom'


class StepOne extends Component {

    componentDidMount() {
        this.props.register();
      }

    render() {
        return (
        <Form className="App">
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" name="email" placeholder="first name" />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input type="text" name="email" placeholder="last name" />
                </FormGroup>
                </Col>
            </Row>
            <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" placeholder="1234 Main St"/>
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" placeholder="Topsail"/>
                </FormGroup>
            </Col>
            <Col md={1}>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" placeholder="NC"/>
                </FormGroup>
            </Col>
            </Row>
            
            <Row form>
                <Col md={4}>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" placeholder="(910)-867-5309"/>
                </FormGroup>
                </Col>
                <Col md={4}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" placeholder="yourEmail@gmail.com"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" placeholder="iHeartMyHorse"/>
                </FormGroup>  
                </Col>
                <Col md={2}>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" />
                </FormGroup>  
                </Col>
            </Row>
            <Link to="/wizard/step_two">
            <Button
            onClick={() => this.props.register(this.props.firstName, this.props.lastName, this.props.address, this.props.city, 
                this.props.state, this.props.phoneNumber, this.props.email , this.props.username, 
                this.props.password, this.props.idAdmin)}
            >Next</Button>
            </Link>
        </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps, { register })(StepOne)
