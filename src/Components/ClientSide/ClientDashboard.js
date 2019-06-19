import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

toast.configure();

export class ClientDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            name: "",
            meetings: []
        }
    }

    componentDidMount() {
        this.getClientMeeting()
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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

    render() {
        let { name, meetings } = this.state
        console.log(this.props)
        let displayMeetings = meetings.map(meeting => {
            return(   
                <tr key={meeting.id}>
                    <td>{meeting.horse}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time_range_one} to {meeting.time_range_two}</td>
                    <td>{meeting.select_payment}</td>
                </tr>
            )
        })
        return (
            <div>
               
                <h1>Welcome {this.props.username}</h1>
                
                
                <div className="clientButtons">
                    <Link to="/clientScheduler">
                    <Button color='outline-secondary' className='mb-3'>Schedule</Button>
                    </Link>
                    <StripeCheckout className='mb-3'
                    stripeKey="pk_test_IkGproX6Ez7mOrXs9140j7mj00L31UfDex"
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={150 * 100}
                    name={name}
                    />
                </div>
                
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

                <Button type="submit" color='outline-danger'
                onClick={() => this.props.logout()}>
                    Logout
                </Button>
            </div>
           
        )
    }
}

function mapStateToProps(state) {
    const { user, username } = state
    return { user, username }
}

export default connect(mapStateToProps)(ClientDashboard)
