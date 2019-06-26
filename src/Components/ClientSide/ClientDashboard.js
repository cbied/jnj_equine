import React, { Component } from 'react';
import { Table } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
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
        this.props.toggleNav()
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
        let displayMeetings = meetings.map(meeting => {   
            if(meeting.pending === null) {
                return (
                <tr key={meeting.id} className='pending'>
                    <td>{meeting.horse}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time_range_one} to {meeting.time_range_two}</td>
                    <td>Pending</td>
                    <td>{meeting.select_payment}/Pending</td>
                </tr>
                )
            } else if (meeting.pending === true) {
                return (
                <tr key={meeting.id} className='approved'>
                    <td>{meeting.horse}</td>
                    <td>{meeting.meeting_date}</td>
                    <td>{meeting.meeting_time}</td>
                    <td>Approved</td>
                    <td>{meeting.select_payment}/${meeting.price}</td>
                </tr> 
                ) 
            } else {
                return (
                <tr key={meeting.id} className='denied'>
                </tr> 
                )
                
            }
            
        }
            )
        return (
            <div className="App clientDash">

                <h1>Welcome {this.props.username}</h1>
  
                <StripeCheckout className='mb-3'
                    stripeKey="pk_test_IkGproX6Ez7mOrXs9140j7mj00L31UfDex"
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={150 * 100}
                    name={name}
                    />

                <Table hover>
                    <thead>
                        <tr>
                            <th scope="row">Horse</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Appt</th>
                            <th>Amount Due</th>
                        </tr>
                        </thead>
                    <tbody>
                    {displayMeetings}
                    <div class="container">
                        <div id="box1"></div>
                        <div id="box2"></div>
                        <div id="box3"></div>
                        <div id="box4"></div>
                    </div>
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
