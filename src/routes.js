import React from "react";
import { Switch, Route } from "react-router-dom";
import App from './App'
import Header from './Components/Header'
import AdminDashboard from './Components/AdminSide/AdminDashboard'
import AdminEditMeeting from './Components/AdminSide/AdminEditMeeting'
import ClientDashboard from './Components/ClientSide/ClientDashboard'
import StepOne from './Components/ClientSide/registerWizard/StepOne'
import StepTwo from './Components/ClientSide/registerWizard/StepTwo'

export default (
    <Switch>
        <Route exact path='/' component={App} />
        <Route  path='/header' component={Header} />
        <Route  path='/adminDashboard' component={AdminDashboard} />
        <Route  path='/adminEditMeeting' component={AdminEditMeeting} />
        <Route  path='/clientDashboard/:id' component={ClientDashboard} />
        <Route  path='/wizard/step_one' component={StepOne} />
        <Route  path='/wizard/step_two' component={StepTwo} />
    </Switch>
)