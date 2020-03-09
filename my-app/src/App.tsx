import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './components/navbar-component/NavBarComponent';
import  {LoginComponent} from './components/login-component/LoginComponent';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1> Reimb System</h1>
      <p> start here</p>


      <Router>
        <NavBarComponent />
        {/* switch is very easy. Only one route in a switch will ever be rendered
        whichever route has the first matching path, it gets rendered */}
        <Switch>
          {/* Provides history match and location to a component
        but does not allow for it to have its own props */}
          
         
          <Route path='/login' component={LoginComponent}/>
          {/* the most powerful of the 3 models
        it allows us to pass whatever props from router we want, any of history location and match
        it also allows for us to pass in any other props */
        
        <Route path='/login' component={LoginComponent}/> {}
        }
        </Switch>

      </Router>


      
    </div>
  );
}

export default App;
