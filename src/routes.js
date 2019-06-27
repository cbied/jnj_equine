import React from "react";
import { Switch, Route } from "react-router-dom";
import App from './App'
import Header from './Components/Header'
import AdminDashboard from './Components/AdminSide/AdminDashboard'
import ClientDashboard from './Components/ClientSide/ClientDashboard'

export default (
    <Switch>
        <Route exact path='/' component={App} />
        <Route  path='/header' component={Header} />
        <Route  path='/adminDashboard' component={AdminDashboard} />
        <Route  path='/clientDashboard/:id' component={ClientDashboard} />
    </Switch>
)