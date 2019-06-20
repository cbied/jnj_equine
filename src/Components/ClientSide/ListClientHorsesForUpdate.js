import React, { Component } from 'react'
import ClientHorseProfile from './addNewHorse'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'

export class ListClientHorsesForUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horses: [],
            nestedModal: false,
            closeAll: false
        }
    }

    // map over the names to list out the horses so each horse will be a modal you can update horse info
    getHorseNames = () => {
        axios
            .get('/api/clientHorse')
            .then(response => this.setState({ horses: response.data }))
    }

    // put in the component/modal where you are updating the horse
    // getHorseInfo = () => {
    //     axios
    //         .get('/api/clientHorseInfo')
    //         .then(response => this.setState({ horses: response.data }))
    // }

    toggleNested = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    toggleAll = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    render() {
        return (
            <div>

                <Button color="success" onClick={this.toggleNested}>Add Horse</Button>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                    <ModalHeader>Add Horse</ModalHeader>
                    <ModalBody>
                        <ClientHorseProfile />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                    </ModalFooter>
                    </Modal>

                <Button
                onClick={() => {
                    this.props.modalHorseProfileFn()
                    this.props.toggleHorseProfileFn()
                }}
            >Cancel</Button>
            </div>
        )
    }
}

export default ListClientHorsesForUpdate
