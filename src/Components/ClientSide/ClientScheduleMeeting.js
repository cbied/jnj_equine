import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

export class ClientScheduleMeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horses: [],
            horse: '',
            date: '',
            time1: '',
            time2: '',
            description: '',
            payment: '',
            horse_id: null
        }
    }

    componentDidMount() {
        this.getClientHorse()
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getClientHorse = () =>  {
        axios
            .get('/api/clientHorse')
            .then(horse => {
                console.log(horse.data)
                this.setState({ horses: horse.data})
                })
                .catch(() => alert('No horses'));
    }


    postMeeting = () => {
        let {horse, date, time1, time2, description, payment, horses} = this.state
        console.log(horses.indexOf(horse))
        if(date == '' || description == '' || time1 == '' || time2 == '' || horse == null || horse == '' || payment == '' || payment == null) {
            alert('fill in all required fields please')
        } else {
            axios
            .post('/api/schedule', { date, time1, time2, description, payment, horse, horses })
            .then(() => {
                alert("Your meeting is pending, Check back soon for confirmation")
                this.setState({
                    horse: '',
                    date: '',
                    time1: '',
                    time2: '',
                    description: '',
                    payment: ''
                })
                this.props.modalScheduleFn()
                this.props.toggleScheduleFn()
                this.props.modalScheduleFn()
                this.props.toggleScheduleFn()
            })
            .catch(() => alert('Something went wrong'));
        }
            
        
        
    }

 


    render() {
        let { user } = this.props
        console.log(user)
        console.log(this.props)
        let { horses } = this.state
        console.log(horses)
        let listHorses = horses.map(horse => {
                return <option value={horse.name} key={horse.horse_id}>{horse.name}</option>
        })
        return (
            <div id="scheduler">
                <Form >
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" name="date"
                        onChange={e => this.handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time range</Label>
                        <br></br>
                        <Label for="time">i.e 01:00 PM to 04:00 PM</Label>
                        <Input type="time" name="time1" 
                        onChange={e => this.handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="time" name="time2" 
                        onChange={e => this.handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Description of problem</Label>
                        <Input type="textarea" name="description" 
                        onChange={e => this.handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="payment">Payment Method</Label>
                        <Input type="select" name="payment"
                        onChange={e => this.handleChange(e)}
                        >
                            <option>Select</option>
                            <option>Credit Card</option>
                            <option>Cash</option>
                        </Input>
                    </FormGroup>
                    { this.state.payment === 'Credit Card' ?
                    <FormGroup>
                        <Label for="message">On request, your meeting will be pending.</Label>
                    </FormGroup>
                    :
                    false
                }
                    <FormGroup>
                        <Label for="horse">Horse</Label>
                        <Input type="select" name="horse"
                        onChange={e => this.handleChange(e)}
                        >
                            <option>Select</option>
                            {/* map over horses the client has */}
                            { listHorses }
                        </Input>
                    </FormGroup>
                <div className="scheduleBtns" >
                    <Button color="danger"
                onClick={() => {
                    this.props.modalScheduleFn()
                    this.props.toggleScheduleFn()
                    this.props.modalScheduleFn()
                    this.props.toggleScheduleFn()}}
                    >cancel</Button>
                    <Button color="primary"
                    onClick={() => {
                        this.postMeeting()
                        
                    }}
                    >Request meeting
                    </Button>
                </div>
                    
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps)(ClientScheduleMeeting)
