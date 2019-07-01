import React, { Component } from 'react'
import MapClientInfo from './MapClientInfo'
import { Button } from 'reactstrap'


export class ClientInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // open: false
        }
    }


    render() {
        return (
            <div>
                <MapClientInfo />
                <Button
                onClick={() => {
                    this.props.modalClientsFn()
                    this.props.toggleClientInfoFn()
                    this.props.modalClientsFn()
                    this.props.toggleClientInfoFn()
                }}
                >Close</Button>
            </div>
        )
    }
}

export default ClientInfo
