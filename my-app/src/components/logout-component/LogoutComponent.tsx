import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { User } from "../../models/User";
import { Redirect } from "react-router";
import Card from 'react-bootstrap/Card'


interface IProfileProps 
{
  currentUser: User | undefined;
}


export class LogoutComponent extends React.Component<any, any>{
    constructor(props: any)
     {
        super(props)
        this.state = 
        {
          // currentUser:undefined
        }
    }
  
    componentDidMount() 
    {
      
  
     // this.setState( {currentUser:null} )
      
  }


  render()
{
    return(
        <div>
 <Redirect to='/login' />
         </div>
    )
}  //render
}