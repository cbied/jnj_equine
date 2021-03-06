import React, { Component } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, 
    Input, UncontrolledCollapse, CardBody, Card } from 'reactstrap'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../../redux/loginReducer'
import axios from 'axios'

export class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meetings: [],
            approvedMeetings: [],
            modal: false,
            modalApproved: false,
            activeMeeting: 0,
            activeApprovedMeeting: 0,
            meeting_time: '',
            meeting_date: '',
            price: null,
            pending: null,
            meetingDetails: {},
            paidDetails: {},
            paid: true
        }
    }

    componentDidMount() {
        this.getClientMeeting()
        this.getClientApprovedMeetings()
        this.props.toggleNav()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.meetings.length !== prevState.meetings.length) {
    //         this.setState({activeMeeting: 0})
    //     }
    // }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getClientMeeting = () => {
        axios
            .get('/api/schedules')
            .then(response => {
                    this.setState({ meetings: response.data })
            })
            .catch(err => console.log(`admin-getClientMeeting ${err}`))
    }

    getClientApprovedMeetings = () => {
        axios
        .get('/api/approvedSchedules')
            .then(response => this.setState({ approvedMeetings: response.data }))
            .catch(err => console.log(`admin-getClientApprovedMeeting ${err}`))
    }


    updateMeeting = (index, bool) => {
        let { meeting_time, meeting_date, price, pending, meetings } = this.state
        let { id } = meetings[index]
        pending = bool
        this.setState({activeMeeting: 0})
        axios
            .put('/api/schedule', { id, meeting_date, meeting_time, price, pending })
            .then(user => {  
                this.meetingUpdate(user.data);
                this.getClientApprovedMeetings()
                this.getClientMeeting()
            })
            .catch(err => {
                alert(err);
            });
    }

    meetingUpdate = (meetingDetails) => {
        this.setState({
            meetingDetails, 
        })
    }

    updatePaid = (index) => {
        let { paid, approvedMeetings} = this.state,
            { id } = approvedMeetings[index];
            // this.setState({ paid: false })
            if(paid === true) {
                this.setState({ paid: false })
            } else {
                this.setState({ paid: true })
            }
        axios
            .put('/api/meetingPaid', { id, paid })
            .then(user => {
                this.paidUpdate(user.data)
                this.getClientApprovedMeetings()
            })
            .catch(err => {
                alert(err.response.request.response);
            });
    }

    paidUpdate = (paidDetails) => {
        this.setState({
            paidDetails,
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

    toggleApproved = (index) => {
        this.setState(prevState => ({
            modalApproved: !prevState.modal,
        }));
        if(typeof index === 'number') {
            this.setState({ 
                activeApprovedMeeting: index,
            })
        }
        }

    render() {
        let { meetings, activeMeeting, 
            approvedMeetings, activeApprovedMeeting} = this.state
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

        let displayApprovedMeetings = approvedMeetings.map((meeting, index) => {
            let now = new Date()
            let nowString = JSON.stringify(now)
            let currentDate = nowString.slice(1,11)
            
            return (
                
                meeting.paid && meeting.meeting_date >= currentDate  ? 
                    (
                    <tr key={meeting.id} className="paid"
                    onClick={() => {
                        this.toggleApproved(index)}}
                    >
                        <td>{meeting.horse}</td>
                        <td>{meeting.meeting_date}</td>
                        <td>{meeting.meeting_time}</td>
                        <td>{meeting.select_payment}</td>
                    </tr>
                    )
                    : !meeting.paid && meeting.meeting_date >= currentDate ?
                    (
                    <tr key={meeting.id} className="unpaid"
                    onClick={() => {
                        this.toggleApproved(index)}}
                    >
                        <td>{meeting.horse}</td>
                        <td>{meeting.meeting_date}</td>
                        <td>{meeting.meeting_time}</td>
                        <td>{meeting.select_payment}</td>
                    </tr>
                    )
                    : null
            )
            
                
            
        })

        let displayMeetingDetails = meetings.map(meeting => {
            return (
                <CardBody key={meeting.id}>
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
                </CardBody>  
            )
        })

        let displayApprovedMeetingDetails = approvedMeetings.map(meeting => {
            return (
                <CardBody key={meeting.id}>
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
                </CardBody>  
            )
        })


        return (
            <div className="adminDash">
                <h2>Welcome {this.props.username}</h2>
                <h3>Pending meetings</h3>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
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

                                <Button color="primary" id="togglerMeetingInfo" style={{ marginBottom: '1rem' }}>
                                Meeting Info
                                </Button>


                                <UncontrolledCollapse toggler="#togglerMeetingInfo">
                                <Card>
                                    
                                    {displayMeetingDetails[activeMeeting]}
                                    
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

                
                <h3>Approved Meetings</h3>
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
                    {displayApprovedMeetings}
                    </tbody>
                </Table> 
                {/* display green if approvedMeetings[activeApprovedMeeting].paid === true */}
                <Modal isOpen={this.state.modalApproved} toggle={this.toggleApproved}>
                    <ModalBody>
                        {approvedMeetings.length ? (
                            <div>
                                <ModalHeader toggle={this.toggleApproved}>{approvedMeetings[activeApprovedMeeting].horse}</ModalHeader>
                                <Table striped>
                                <tbody>
                                    <tr>
                                    <td>Meeting Date</td>
                                    <td>{approvedMeetings[activeApprovedMeeting].meeting_date}</td>
                                    </tr>
                                    <tr>
                                    <td>Meeting Time</td>
                                    <td>{approvedMeetings[activeApprovedMeeting].meeting_time}</td>
                                    </tr>
                                    <tr>
                                    <td>Price</td>
                                    <td>${approvedMeetings[activeApprovedMeeting].price}</td>
                                    </tr>
                                    
                                </tbody>

                                <Button 
                                        onClick={() => {
                                            this.updatePaid(activeApprovedMeeting)
                                        }}
                                        >
                                        Paid
                                        </Button>
                                </Table>
                                <div>

                                <Button color="primary" id="togglerApprovedMeetingInfo" style={{ marginBottom: '1rem' }}>
                                Meeting Info
                                </Button>


                                <UncontrolledCollapse toggler="#togglerApprovedMeetingInfo">
                                <Card>
                                    <CardBody>
                                    {displayApprovedMeetingDetails[activeApprovedMeeting]}
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

                        <Button color="secondary" 
                        onClick={() => this.setState({modalApproved: false})}
                        >Cancel</Button>

                    </ModalFooter>
                </Modal>
                </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state
    return user
}

export default connect(mapStateToProps, { handleUpdateUser })(AdminDashboard)
