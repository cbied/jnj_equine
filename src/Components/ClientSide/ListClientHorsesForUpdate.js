import React, { Component } from 'react'
import AddNewHorse from './AddNewHorse'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardBody, Collapse, Card,
Row, Col, FormGroup, Label, Input, Form } from 'reactstrap'
import axios from 'axios'

export class ListClientHorsesForUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horses: [{
                name: null, 
                age: null, 
                breed: null, 
                discipline: null, 
                past_injuries: null, 
                behavioral_issues: null, 
                gender: null, 
                pregnant: null, 
                expected_pregnancy_date: null,
                horse_id: null
            }],
            horse: {},
            nestedModal: false,
            collapse: false
        }
    }

    componentDidMount() {
        this.getHorseInfo()
        this.deleteHorse()
    }

    handleChange = (e,index) => {
        let tempHorses  = this.state.horses
        let tempHorse = tempHorses[index]
        tempHorse[e.target.name] = e.target.value
        tempHorses[index] = tempHorse
        this.setState({horses: tempHorses})
    }

    getHorseInfo = () => {
        axios
            .get('/api/clientHorseInfo')
            .then(response => this.setState({ horses: response.data }))
    }

    toggleNested = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
        });
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    updateHorse = (index) => {
        let { name, age, breed, discipline, past_injuries, behavioral_issues, 
            gender, pregnant, expected_pregnancy_date, horse_id } = this.state.horses[index]

        axios
            .put('/api/clientHorseInfo', { name, age, breed, discipline, past_injuries, behavioral_issues, 
                gender, pregnant, expected_pregnancy_date, horse_id  })
            .then(horse => {
                this.horseUpdate(horse.data)
            })
            .catch(err => {
                alert(err.response.request.response);
            });
    }

    horseUpdate = horse => {
        this.setState({
            horse,
        });
    }

    deleteHorse = (id) => {
        axios
            .delete(`/api/clientHorseInfo/${id}`)
    }

    render() {
        let { horses } = this.state
        let displayHorses = horses.map((horse,index) => {
            return (
                    <CardBody key={horse.horse_id} >
                        <Form className="App">
                            <Row form>
                                <Col md={4}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name"  value={horse.name}  
                                    onChange={(e) => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="age">Age</Label>
                                    <Input type="text" name="age" value={horse.age}
                                    onChange={e => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={5}>
                                <FormGroup>
                                    <Label for="breed">Breed</Label>
                                    <Input type="text" name="breed" value={horse.breed}
                                    onChange={e => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                            </Col>
                            </Row>
                            <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="discipline">Discipline</Label>
                                    <Input type="textarea" name="discipline" value={horse.discipline}
                                    onChange={e => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="behavioral_issues">Behavioral issues</Label>
                                    <Input type="textarea" name="behavioral_issues" value={horse.behavioral_issues}
                                    onChange={e => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="past_injuries">Past injuries</Label>
                                    <Input type="textarea" name="past_injuries" value={horse.past_injuries}
                                    onChange={e => this.handleChange(e,index)}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                    <Label for="gender">Gender</Label>
                                    <Input type="select" name="gender" value={horse.gender}
                                    onChange={e => this.handleChange(e,index)}
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
                                { horse.gender === 'Mare' || horse.gender === 'Filly' ? 
                                <Col md={4}>
                                <FormGroup>
                                    <Label for="pregnant">In foal?</Label>
                                    <Input type="select" name="pregnant" value={horse.pregnant}
                                    onChange={e => this.handleChange(e,index)}
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
                            { horse.pregnant === 'Yes' ? 
                                <Col md={7}>
                                    <FormGroup>
                                        <Label for="expected_pregnancy_date">Expected foaling date</Label>
                                        <Input type="date" name="expected_pregnancy_date" value={horse.expected_pregnancy_date}
                                        onChange={e => this.handleChange(e,index)}
                                        />
                                    </FormGroup>
                                </Col>
                            :
                            false
                            }
                            </Row>
                            <div className="horseEditBtns">
                            <Button
                            onClick={() => {
                                this.deleteHorse(horse.horse_id)
                                this.props.modalHorseProfileFn()
                                this.props.toggleHorseProfileFn()
                                this.props.modalHorseProfileFn()
                                this.props.toggleHorseProfileFn()
                                alert(`${horse.name} was deleted`)}}
                            >delete</Button>
                            <Button
                                onClick={() => {
                                    this.updateHorse(index)
                                    alert(`${horse.name}'s information was updated!`)
                                }}
                            >Save</Button>
                            </div>
                        </Form>
                    </CardBody>
            )
        })
        return (
            <div className="HorseProfile">

                <Button color="success" onClick={this.toggleNested}>Add Horse</Button>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined} className="margins">
                    <ModalHeader>Add Horse</ModalHeader>
                    <ModalBody>
                        {/* add alert that horse was added in ClientHorse Profile*/}
                        <AddNewHorse />
                    </ModalBody>
                    <ModalFooter>

                        <Button color="primary" 
                        onClick={this.toggleNested}>Done</Button>{' '}
 
                    </ModalFooter>
                    </Modal>

                    <Button color="primary" className="margins"
                    onClick={this.toggle}>Edit Horse Info</Button>
                    <Collapse isOpen={this.state.collapse} className="margins">
                    <Card>
                    {displayHorses}
                    </Card>
                    </Collapse>
                

                    <Button
                    onClick={() => {
                        this.props.modalHorseProfileFn()
                        this.props.toggleHorseProfileFn()
                        this.props.modalHorseProfileFn()
                        this.props.toggleHorseProfileFn()
                    }}
                    >Done</Button>
            </div>
        )
    }
}

export default ListClientHorsesForUpdate
