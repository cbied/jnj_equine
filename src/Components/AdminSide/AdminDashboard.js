import React, { Component } from 'react'

export class AdminDashboard extends Component {
    
    render() {
        return (
            <div>
                <h1>Admin dashboard</h1>
                <h2>{this.props.username}</h2>
                <h2>{this.props.userId}</h2>
            </div>
        )
    }
}

export default AdminDashboard
