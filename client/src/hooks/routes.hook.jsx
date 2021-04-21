import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Auth, SignUp } from '../pages'
import Chart from '../pages/Chart'


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/Chart" exact>
                    <Chart />
                </Route>
                <Redirect to="/Chart" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <Auth />
            </Route>
            <Route path="/Signup" exact>
                <SignUp />
            </Route>
            <Redirect to="/auth"/>
        </Switch>
    )
}

