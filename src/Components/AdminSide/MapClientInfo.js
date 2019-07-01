import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import axios from 'axios'

export class MapClientInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientHorseInfo: [],
            collapse: false
        }
    }

    componentDidMount() {
        this.getAllInfo()
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    getAllInfo = () => {
        axios
            .get('/api/clientHorseInfoAdmin')
            .then(response => {
                this.setState({ clientHorseInfo: response.data })
            })
            .catch(err => console.log(`ClientInfo-getAllInfo ${err}`))
    }

    render() {
        let { clientHorseInfo } = this.state
        let displayClients = clientHorseInfo.map((client,index) => {
                return (
                    <div>
                    <Button color="success" id={`toggler${index}`} key={index} style={{ marginBottom: '1rem', marginRight:'1rem', marginTop:'1rem' }}>
                        {client.firstname} {client.lastname}{' - '}{client.name}
                    </Button>

                    <UncontrolledCollapse toggler={`#toggler${index}`}>
                        
                            
                        <tr>
                            <th>Name  </th> {'  '}
                            <td>  {client.firstname} {client.lastname}</td>
                        </tr>
                        <tr>
                            <th>Number</th> {'  '}
                            <td>{client.phonenumber}</td>
                        </tr>
                        <tr>
                            <th>email</th> {'  '}
                            <td>{client.email}</td>
                        </tr>
                        <tr>
                            <th>Address</th> {'  '}
                            <td>{client.address} {client.city} {client.state}</td>
                        </tr>
                        <tr>
                        <th>Name</th> {'  '}
                        <td>{client.name}</td>
                    </tr>
                    <tr>
                        <th>Age</th> {'  '}
                        <td>{client.age}</td>
                    </tr>
                    <tr>
                        <th>Breed</th> {'  '}
                        <td>{client.breed}</td>
                    </tr>
                    <tr>
                        <th>Gender</th> {'  '}
                        <td>{client.gender}</td>
                    </tr>
                    <tr>
                        <th>Discipline</th> {'  '}
                        <td>{client.discipline}</td>
                    </tr>
                    <tr>
                        <th>Past Injuries</th> {'  '}
                        <td>{client.past_injuries}</td>
                    </tr>
                    <tr>
                        <th>In Foal?</th>
                        <td>{client.pregnant}</td>
                    </tr>
                    <tr>
                        <td>{client.expected_pregnancy_date}</td>
                    </tr>
                            
                    
                    </UncontrolledCollapse>
                </div>
                )
        
        })
        return (
            <Card>
            <CardBody>
                {displayClients}
            </CardBody>
            </Card>
        )
    }
}

export default MapClientInfo
