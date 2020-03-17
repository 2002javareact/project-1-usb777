import React from 'react'
import { Switch, Route } from 'react-router'
import { LoginComponent } from '../login-component/LoginComponent'


export class MultiRouteComponent extends React.Component<any,any>{
    render(){
        return(
            <Switch>
                <Route path={`${this.props.match.path}/first`} component={LoginComponent}/>
                <Route path={`${this.props.match.path}/second`} component={LoginComponent}/>
            </Switch>
        )
    }
}