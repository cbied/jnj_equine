import React, { Component } from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            amount: ""
        };
    }


    

    handleSubmit = async e => {
        e.preventDefault();
        console.log(e)
        let { name } = this.state
        let {token} = await this.props.stripe.createToken({name: name});
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) console.log("Purchase Complete!")
    }

    
    

    render() {
        let { name, amount } = this.state
        return(
        <Form
        onSubmit={this.handleSubmit}
        >
            <FormGroup>
            <Label for="name">Full name</Label>
            <Input type="text" name="name" value={name} placeholder="Christopher A Smith" 
            onChange={(e) => this.setState({ name: e.target.value })}
            />
            </FormGroup>
            <FormGroup>
            <Label for="amount">Amount</Label>
            <Input type="text" name="amount" value={amount}
            onChange={(e) => this.setState({ amount: e.target.value })}
            />
            </FormGroup>
            <Label for="cardInfo">Card Information</Label>
            <CardElement className="p-2 border border-dark" /> 
            <div>
                <Button color="success" className="mb-3 shadow">Submit</Button>
            </div>
        </Form>
        )
    }
}



export default injectStripe(PaymentForm)