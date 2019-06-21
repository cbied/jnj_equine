import React, { Component } from 'react';
import ClientSchedulerMeeting from './ClientScheduleMeeting'
import StripeCheckout from 'react-stripe-checkout';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../../redux/loginReducer'
import axios from 'axios';

toast.configure();

export class ClientDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            name: "",
            meetings: [],
            modalSchedule: false,
        }
    }

    componentDidMount() {
        this.getClientMeeting()
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleToken = async token => {
        const response = await axios  
            .post('/checkout', { token })

        const { status } = response.data
        if(status === 'success') {
            toast('Success! Check email for details', { type: "success" })
        } else {
            toast('Something went wrong', { type: "error" })
        }
    }

    getClientMeeting = () => {
        axios
            .get('/api/schedule')
            .then(response => this.setState({ meetings: response.data }))
            .catch(err => console.log(err))
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
        let { name, meetings } = this.state
        console.log(meetings)
        let displayMeetings = meetings.map(meeting => {   
            console.log(meeting.pending)
            if(meeting.pending === null) {
                return (
                <tr key={meeting.id} className='pending'>
                    <td>{meeting.horse}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time_range_one} to {meeting.time_range_two}</td>
                    <td>{meeting.select_payment}</td>
                    <td>Pending</td>
                </tr>
                )
            } else if (meeting.pending === true) {
                return (
                <tr key={meeting.id} className='approved'>
                    <td>{meeting.horse}</td>
                    <td>{meeting.meeting_date}</td>
                    <td>{meeting.meeting_time}</td>
                    <td>{meeting.select_payment}</td>
                    <td>Approved</td>
                </tr> 
                )
            }
            
        }
            )
        return (
            <div>
               
                <h1>Welcome {this.props.username}</h1>

                    <StripeCheckout className='mb-3'
                    stripeKey="pk_test_IkGproX6Ez7mOrXs9140j7mj00L31UfDex"
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={150 * 100}
                    name={name}
                    />
                
                <div>
                    <h3>Balance: $150</h3>
                </div>

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
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user, username } = state
    return { user, username }
}

export default connect(mapStateToProps, { handleUpdateUser })(ClientDashboard)
