import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { User } from "../../models/User";
import { Redirect } from "react-router";
import Card from 'react-bootstrap/Card'


interface IProfileProps 
{
  currentUser: User;
}

export class ProfileComponent extends React.Component<IProfileProps, any> {

    constructor(props: Readonly<IProfileProps>) 
    {
        super(props);
       
    }


    showUsersLink()
    {
      let text:string;
              if
               (this.props.currentUser.role.role==="Admin")
              {
                  text = "<div>Show me all users </br></div>"
              }
              else { 
                text = "Nothing"
              }

              return text;

    }





  render() {

    var divStyle = {
        background: "white",
        //padding: "20px",
        marginTop:"3em",
        marginLeft: "40em",
        align: "center"
    };


    return(
       <div>
       
          
<div style={divStyle}>
{this.showUsersLink}

  <Card  border="success" style={{ width: '18rem' }}>
    <Card.Header>Profile Info</Card.Header>
    <Card.Body>
      <Card.Title> Username: {this.props.currentUser.userName}</Card.Title>
      <Card.Title> userid: {this.props.currentUser.userId}   </Card.Title>
      <Card.Title> Fisrt Name: {this.props.currentUser.firstName} </Card.Title>
      <Card.Title> Last Name: {this.props.currentUser.lastName}</Card.Title>
      <Card.Title> Email: {this.props.currentUser.email}</Card.Title>
      <Card.Title>  Role:{this.props.currentUser.role.role}</Card.Title>

      <Card.Text>
        Here you can read info about system user.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  </div>







       </div>
      );
  }
}


