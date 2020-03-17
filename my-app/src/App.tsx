import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './components/navbar-component/NavBarComponent';
import  {LoginComponent} from './components/login-component/LoginComponent';
import  {LogoutComponent} from './components/logout-component/LogoutComponent';
import  {UsersComponent} from './components/users-component/UsersComponent';
import {UserUpdateComponent} from './components/userupdate-component/UserUpdateComponent'
import { RoleComponent }   from './components/role-component/RoleComponent'

import {ReimbsComponent} from './components/reimbs-component/ReimbsComponent'
import {ReimbsByStatusComponent} from './components/reimbsbystatus-component/ReimbsByStatusComponent'
import {ReimbsByAuthorComponent} from './components/reimbsbyauthor-component/ReimbsByAuthorComponent'

import {InsertReimbursementComponent} from './components/reimbursement-insert-component/InsertReimbursementComponent'
import {UpdateReimbursementComponent} from './components/reimbursement-update-component/UpdateReimbursementComponent'

import  {ProfileComponent} from './components/profile-component/ProfileComponent';

import {UserByIdComponent} from './components/usersbyid-component/UserByIdComponent'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from './models/User';
import  {Role}  from  './models/Role'

import { findAllByRole } from '@testing-library/react';

function App() {
 const [currentUser, setCurrentUser] = useState(new User(0,"","","","", new Role(0,"")));
 const userid =0  
 return (
    <div className="App">
      <h1> Expense Reimbursement System</h1>
     
  <h6>Expense Reimbursement System (ERS) API
The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while
 on company time. All employees in the company can login and submit requests for reimbursement and view their past
  tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history
   for all employees in the company. Finance managers are authorized to approve and deny requests for expense 
   reimbursement.
  </h6>    


      <Router>
        <NavBarComponent />
        {/* switch is very easy. Only one route in a switch will ever be rendered
        whichever route has the first matching path, it gets rendered */}
        <Switch>
          {/* Provides history match and location to a component
        but does not allow for it to have its own props */}
          
         
          <Route path='/login'  render={() => <LoginComponent updateUser={setCurrentUser} />}   />
          {/* the most powerful of the 3 models
        it allows us to pass whatever props from router we want, any of history location and match
        it also allows for us to pass in any other props */
        
        <Route path='/logout'   render={() => <LogoutComponent  />}       />
        
        }

        <Route   path="/role"    render={() => <RoleComponent currentUser={currentUser} />}       />
        <Route   path="/profile"    render={() => <ProfileComponent currentUser={currentUser} />}       />
        <Route   path="/users"      render={() => <UsersComponent currentUser={currentUser} />}       />
        <Route   path="/user/:id" exact render={(props) => <UserByIdComponent  {...props}  currentUser={currentUser}   />}       />
        <Route   path="/user-update/:uid" exact render={(props) => <UserUpdateComponent  {...props}  currentUser={currentUser}   />}       />
       
        <Route   path="/reimbursements"      render={() => <ReimbsComponent currentUser={currentUser} />}       />
        
        <Route   path="/reimbursements-status/:statusid"  exact    render={(props) => <ReimbsByStatusComponent {...props} currentUser={currentUser} />}       />
        <Route   path="/reimbursements-author/:authorid"  exact    render={(props) => <ReimbsByAuthorComponent {...props} currentUser={currentUser} />}       />
        <Route   path="/reimbursements-insert"   exact   render={(props) => <InsertReimbursementComponent {...props}currentUser={currentUser} />}       />
        <Route   path="/reimbursements-update/:rid"   exact   render={(props) => <UpdateReimbursementComponent {...props}currentUser={currentUser} />}       />
       

       </Switch>

      </Router>

    </div>
  );
}

export default App;
