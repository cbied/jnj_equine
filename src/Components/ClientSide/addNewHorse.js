import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


export class AddNewHorse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '', 
            age: '', 
            breed: '', 
            discipline: '', 
            past_injuries: '', 
            behavioral_issues: '', 
            gender: '', 
            pregnant: '', 
            expected_pregnancy_date: '',
        }
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    updateHorse = horse => {
        this.setState({
            horse,
        });
    }

    registerHorse = () => {
        const { name, age, breed, discipline, past_injuries, behavioral_issues,
                gender, pregnant, expected_pregnancy_date } = this.state
        axios
            .post('/api/horse', { name, age, breed, discipline, past_injuries, behavioral_issues,
                    gender, pregnant, expected_pregnancy_date })
            .then(horse => {
                this.updateHorse(horse.data)
                this.setState({
                    name: '', age: '', breed: '', discipline: '', 
                    past_injuries: '', behavioral_issues: '', gender: '', 
                    pregnant: '', expected_pregnancy_date: ''
                })
            }) 
            .catch(err => alert(err.response.request.response))     
    }

    render() {
        const { name, age, breed, discipline, past_injuries, behavioral_issues,
            gender, pregnant, expected_pregnancy_date } = this.state
            return (
        <Form className="App">
            <Row form>
                <Col md={4}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name"  value={name} placeholder="My horse's name" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Label for="age">Age</Label>
                    <Input type="number" name="age" value={age} placeholder="2" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
                <Col md={4}>
                <FormGroup>
                    <Label for="breed">Breed</Label>
                    <Input type="text" name="breed" value={breed} placeholder="Tennessee Walker" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row form>
            <Col md={5}>
                <FormGroup>
                    <Label for="discipline">Discipline</Label>
                    <Input type="text" name="discipline" value={discipline} placeholder="Tennessee Walker" 
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={7}>
                <FormGroup>
                    <Label for="past_injuries">Past injuries</Label>
                    <Input type="textarea" name="past_injuries" value={past_injuries} placeholder="none"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
                <FormGroup>
                    <Label for="behavioral_issues">Behavioral issues</Label>
                    <Input type="textarea" name="behavioral_issues" value={behavioral_issues} placeholder="none"
                    onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" value={gender} 
                    onChange={e => this.handleChange(e)}
                    >
                    <option>select</option>
                    <option>Stallion</option>
                    <option>Mare</option>
                    <option>Colt</option>
                    <option>Filly</option>
                    <option>Gelding</option> 
                    <option>Ridgeling</option>
                    <option>Foal</option>  
                    </Input>
                </FormGroup> 
            </Col>
            </Row>
            <Row>
            { gender === 'Mare' || gender === 'Filly' ? 
                <Col md={4}>
                    <FormGroup>
                        <Label for="pregnant">In foal?</Label>
                        <Input type="select" name="pregnant" value={pregnant}
                        onChange={e => this.handleChange(e)}
                        >
                        <option>select</option>
                        <option>No</option>
                        <option>Yes</option>     
                        </Input>
                    </FormGroup>
                </Col>

            :
            false
            }
            { pregnant === 'Yes' ? 
                <Col md={6}>
                    <FormGroup>
                        <Label for="expected_pregnancy_date">Expected foaling date</Label>
                        <Input type="date" name="expected_pregnancy_date" value={expected_pregnancy_date}
                        onChange={e => this.handleChange(e)}
                        />
                    </FormGroup>
                </Col>
            :
            false
            }
            </Row>


            <Button
                onClick={() => {
                    this.registerHorse()
                    alert("Your horse has been added")
                }}
            >Add Horse</Button>
        </Form>
        )
    }
}

export default AddNewHorse
