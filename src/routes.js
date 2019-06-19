import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
import AdminDashboard from './Components/AdminSide/AdminDashboard'
import AdminEditMeeting from './Components/AdminSide/AdminEditMeeting'
import ClientDashboard from './Components/ClientSide/ClientDashboard'
import ClientScheduleMeeting from './Components/ClientSide/ClientScheduleMeeting'
import StepOne from './Components/ClientSide/registerWizard/StepOne'
import StepTwo from './Components/ClientSide/registerWizard/StepTwo'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route  path='/header' component={Header} />
        <Route  path='/adminDashboard' component={AdminDashboard} />
        <Route  path='/adminEditMeeting' component={AdminEditMeeting} />
        <Route  path='/clientDashboard/:id' component={ClientDashboard} />
        <Route  path='/clientScheduler' component={ClientScheduleMeeting} />
        <Route  path='/wizard/step_one' component={StepOne} />
        <Route  path='/wizard/step_two' component={StepTwo} />
    </Switch>
)