import React from "react";
import { Role } from "../../models/Role";
import { User } from "../../models/User";
import axios from 'axios'
import Card from 'react-bootstrap/Card'

interface IViewOneUserProps
 {  
  viewUser: User;
  errorMessage: string;
  id:number;
}


export class UserByIdComponent extends React.Component<any, IViewOneUserProps> 
{
  constructor(props: any) 
  {
    super(props);
    this.state = 
    {
      viewUser: new User(0, "", "", "", "", new Role(0, "")),
      errorMessage: "",
      id:0

    };


  }

componentDidMount() 
  { 
         
    
      const {id} = this.props.match.params
    


axios.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/users/'+id /**parameter */, 
{  withCredentials: true,  } )
.then(response => response.data)
.then((data) => 
 {

   this.setState({ viewUser: data })
   console.log(this.state.viewUser)
  })
this.setState({id:id})


   
    //this.props.match.params
   // const { match: { params } } = this.props;
  //  this.setState({ id: ${params.userId} })


  }
 
  
  render() {

    var divStyle = {
        background: "white",
        //padding: "20px",
        marginTop:"3em",
        marginLeft: "4em",
        align:"center"
    };

/*
    const {uid} = this.props.location.state
     console.log(uid)
*/

    return(
       <div>
   

                     
<div style={divStyle}>
  <h1> User Info by ID</h1>
<h4> Your role is {this.props.currentUser.role.role}</h4>
  <h5>HEllo, User id = {this.state.id} </h5>  
 
    
  <Card  border="success" style={{ width: '18rem' }}>
    <Card.Header>Profile Info</Card.Header>
    <Card.Body>
    <Card.Title> userid: {this.state.viewUser.userId}   </Card.Title>
      <Card.Title> Username: {this.state.viewUser.userName}</Card.Title>
      <Card.Title> Fisrt Name: {this.state.viewUser.firstName} </Card.Title>
      <Card.Title> Last Name: {this.state.viewUser.lastName}</Card.Title>
      <Card.Title> Email: {this.state.viewUser.email}</Card.Title>
      <Card.Title>  Role:{this.state.viewUser.role.role}</Card.Title>

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
