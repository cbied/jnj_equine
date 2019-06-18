import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
import StripeCheckout from 'react-stripe-checkout';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify'
import axios from 'axios';

toast.configure();

export class ClientDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            name: "",
            amount: "",
            description: 'JnJ Equine Massage'
        }
    }

    

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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

    render() {
        let { name, amount, description } = this.state
        return (
            <div>
                <h1>Welcome {this.props.username}</h1>
                <Table hover>
                    <thead>
                    <tr>
                        <th scope="row">Horse</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Dream</td>
                        <td>12/12/19</td>
                        <td>1:00pm</td>
                    </tr>
                    </tbody>
                </Table>
                <div className="clientButtons">
                    <Button color='outline-secondary'>Schedule</Button>
                    <StripeCheckout 
                    stripeKey="pk_test_IkGproX6Ez7mOrXs9140j7mj00L31UfDex"
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={150 * 100}
                    // name={}
                    />
                    
                    
                </div>
                
                <div>
                    <h3>Balance: $200</h3>
                </div>
            </div>
        )
    }
}

export default ClientDashboard
