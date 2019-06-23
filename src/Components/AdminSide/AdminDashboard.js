import React, { Component } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, UncontrolledCollapse, CardBody, Card } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'

export class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meetings: [],
            clientInfo: [],
            modal: false,
            activeMeeting: 0,
            meeting_time: '',
            meeting_date: '',
            price: null,
            pending: null,
            meetingDetails: {}
        }
    }

    componentDidMount() {
        this.getClientMeeting()
        this.getClientInfo()
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getClientMeeting = () => {
        axios
            .get('/api/schedules')
            .then(response => this.setState({ meetings: response.data }))
            .catch(err => console.log(`admin-getClientMeeting ${err}`))
    }

    getClientInfo = () => {
        axios
            .get('/api/clientInfo')
            .then(response => this.setState({ clientInfo: response.data}))
            .catch(err => console.log(`admin-getClientInfo ${err}`))
    }

    updateMeeting = (index, bool) => {
        let { meeting_time, meeting_date, price, pending, meetings } = this.state
        let { id } = meetings[index]
        pending = bool
        axios
            .put('/api/schedule', { id, meeting_time, meeting_date, price, pending })
            .then(user => {  
                this.meetingUpdate(user.data);
            })
            .catch(err => {
                alert(err.response.request.response);
            });
    }

    meetingUpdate = (meetingDetails) => {
        this.setState({
            meetingDetails, 
        })
    }

    toggle = (index) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
        if(typeof index === 'number') {
            this.setState({ 
                activeMeeting: index,
            })
        }
        }
    
    render() {
        let { meetings, activeMeeting, clientInfo, activeClient } = this.state
        console.log('clientInfo')
        console.log(clientInfo)
        console.log('meetings')
        console.log(meetings)
        // console.log()
        // console.log(clientInfo[meetings[activeClient].client_id])
        let displayMeetings = meetings.map((meeting, index) => {
            return (
                <tr key={meeting.id}
                onClick={() => {
                    this.toggle(index)}}
                >
                    <td>{meeting.horse}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time_range_one} to {meeting.time_range_two}</td>
                    <td>{meeting.select_payment}</td>
                </tr>
            )
        })

        let displayClientInfo = clientInfo.map((client,index) => {

        })

        let displayHorseInfo = clientInfo.map((horse,index) => {

        })

        // does not work
        let displayMeetingDetails = meetings.map((meeting,index) => {
            return (
                <div key={meeting.id}>
                    <tr>
                        <th>Description of problem</th>
                    </tr>
                    <tr >
                        <td>{meeting.description_of_problem}</td>
                    </tr>
                    
                    <tr>
                        <th>Payment type</th>
                        <td>{meeting.select_payment}</td>
                    </tr>
                </div>
                
            )
        })

        return (
            <div>
                <h2>Welcome {this.props.username}</h2>
                <Table hover>
                    <thead>
                        <tr>
                            <th scope="row">Horse</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment Type</th>
                        </tr>
                        </thead>
                    <tbody>
                    {displayMeetings}
                    </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        {meetings.length ? (
                            <div>
                            <ModalHeader toggle={this.toggle}>{meetings[activeMeeting].horse}</ModalHeader>
                            <Table striped>
                            <thead>
                                <tr>
                                <th>Requested Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{meetings[activeMeeting].date}</td>
                                <td><Input type="date" name="meeting_date"
                                onChange={e => this.handleChange(e)}
                                /></td>
                                </tr>
                                <tr>
                                <td>{meetings[activeMeeting].time_range_one} to {meetings[activeMeeting].time_range_two}</td>
                                <td><Input type="time" name="meeting_time"
                                onChange={e => this.handleChange(e)}
                                /></td>
                                </tr>
                                <tr>
                                <td>Price:</td>
                                <td><Input type="number" name="price"  
                                onChange={e => this.handleChange(e)}
                                /></td>
                                </tr>
                            </tbody>
                            </Table>
                            <div>

                                <Button color="primary" id="togglerHorseInfo" style={{ marginBottom: '1rem', marginRight:'1rem' }}>
                                Horse Info
                                </Button>
                                <Button color="success" id="togglerClientInfo" style={{ marginBottom: '1rem', marginRight:'1rem' }}>
                                Client Info
                                </Button>
                                <Button color="primary" id="togglerMeetingInfo" style={{ marginBottom: '1rem' }}>
                                Meeting Info
                                </Button>


                                <UncontrolledCollapse toggler="#togglerHorseInfo">
                                <Card>
                                    <CardBody>
                                    {/* {clientInfo[meetings[activeClient]]} */}
                                    </CardBody>
                                </Card>
                                </UncontrolledCollapse>
                                
                                <UncontrolledCollapse toggler="#togglerClientInfo">
                                <Card>
                                    <CardBody>
                                    {/* Horse Info clientInfo */}
                                    </CardBody>
                                </Card>
                                </UncontrolledCollapse>

                                <UncontrolledCollapse toggler="#togglerMeetingInfo">
                                <Card>
                                    <CardBody>
                                    {displayMeetingDetails}
                                    </CardBody>
                                </Card>
                                </UncontrolledCollapse>
                            </div>
                            </div>
                        )
                        :
                        null}
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button
                        onClick={() => {
                            this.toggle()
                            this.updateMeeting(this.state.activeMeeting, false)
                        }}
                        >Deny</Button>


                        <Button color="primary" onClick={() => {
                            this.toggle()
                            this.updateMeeting(this.state.activeMeeting, true)
                            }}>Accept</Button>
                            
                            {' '}

                        <Button color="secondary" 
                        onClick={this.toggle}
                        >Cancel</Button>
                    </ModalFooter>
                </Modal>

                
                {/* <Button type="submit" color='outline-danger'
                onClick={() => this.props.logout()}>
                    Logout
                </Button> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state
    return user
}

export default connect(mapStateToProps)(AdminDashboard)
