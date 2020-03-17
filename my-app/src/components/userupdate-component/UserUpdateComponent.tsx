import React, { SyntheticEvent } from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";
import { Role } from "../../models/Role" 
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { project1UpdateUser } from "../../remote/project1/project1-user-update";
import axios from 'axios'
import { isNull } from "util";


interface IUpdateUserProps extends RouteComponentProps 
{
    currentUser: User;  
}

///remember to put the default states for all form fields
interface IUpdateUserState 
{
  updatedUser: any;
  userId: number;
  userName: string;
  password:string;
  firstName: string;
  lastName: string;
  email: string;
  roleid: number;
  role:string;

  errorMessage: string;
  uid:number;
  roleo:any;
  redirect:boolean;
}

export class UserUpdateComponent extends React.Component<
  any,//IUpdateUserProps,
  IUpdateUserState
> {
  constructor(props: any)
   {
    super(props);
    this.state = {
      updatedUser:"",
      userId: 0,
      userName: "",
      password:"",
      firstName: "",
      lastName: "",
      email: "",
      roleid: 0,
      role: "",

      errorMessage: "",
      uid: 0,
      roleo:"",

      redirect:false
    };    
  }


  componentDidMount() 
  {


   const {uid} = this.props.match.params
     console.log({uid});
     
     axios.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/users/' + uid /**parameter */, 
     {  withCredentials: true,  } )
     .then(response => response.data)
     .then((data) => 
      {
     
        this.setState({ updatedUser: data })

        console.log(this.state.updatedUser)
       })
       let updatedUser = this.state.updatedUser

      /*
       userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  errorMessage: string;
  uid:number;
      */
     this.setState({ userId:uid})
    
     // this.setState({lastName:updatedUser?.lastName})
  } //component did mount

  // Update State functions for each field
  updateUserId = (id: any) => 
  {
    this.setState
    ({
      userId: id.currentTarget.value
    });
  };
  updateUsername = (name: any) => 
  {
    this.setState
    ({
      userName: name.currentTarget.value
    });
  };

  updatePassword = (passw: any) => 
  {
    this.setState
    ({
      password: passw.currentTarget.value
    });
  };


  updateFirstName = (first: any) => {
    this.setState({
      firstName: first.currentTarget.value
    });
  };
  updateLastName = (last: any) => {
    this.setState({
      lastName: last.currentTarget.value
    });
  };
  updateEmail = (e: any) => {
    this.setState({
      email: e.currentTarget.value
    });
  };


  
  
renderRedirect = () => {
  if(this.state.redirect){
   return (
     <Redirect
       to="/users"
     />
    );
  }
};

  


  // Function to submit update to db
  submitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
 
      
//let roleobject:Role = new Role(this.state.roleid,this.state.role)
let roleobject:Role = new Role(2,"User")
this.setState({roleo:roleobject})

      let updatedUser = await project1UpdateUser
      (
        this.state.userId,
        this.state.userName,
        this.state.password,        
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.roleo
        
      );
      this.setState({ updatedUser: updatedUser  });
    
      console.log(updatedUser);

      this.setState({ redirect: true });

    } catch (e) {
      if (e.status === 404) {
        this.setState({
          userId: 0,
          userName: "",
          password:"",
          firstName: "",
          lastName: "",
          email: "",
          roleid: 0,
          role:"",
          errorMessage: e.message
        });
      } else {
        this.setState({
          userId: 0,
          userName: "",
          password:"",
          firstName: "",
          lastName: "",
          email: "",
          roleid: 0,
          role:"",
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  //figure out how to display new html after user is successfully updated
  render() {
    return this.props.currentUser.role.role === "Admin" ? (
      <>
        {this.renderRedirect()}

       <h1> User Update</h1> <br/>
       <h4> Your role is {this.props.currentUser.role.role}</h4>
        <Form onSubmit={this.submitUpdate}>
          {/* only thing required should be the user id */}
          <FormGroup row>
            <Label for="userId" sm={2}>
              UserId:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateUserId}
                value={this.state.userId}
                type="text"
                name="userId"
                id="userId"
                placeholder=""
                required
              />
            </Col>
          </FormGroup>


          <FormGroup row>
            <Label for="userName" sm={2}>
              Username:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateUsername}
                value={this.state.userName}
                type="text"
                name="userName"
                id="userName"
                placeholder={this.state.updatedUser?.userName}
              />
            </Col>
          </FormGroup>

          
          <FormGroup row>
            <Label for="password" sm={2}>
              Password:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updatePassword}
                value={this.state.password}
                type="text"
                name="password"
                id="password"
                placeholder={this.state.updatedUser?.password}
              />
            </Col>
          </FormGroup>



          <FormGroup row>
            <Label for="first-name" sm={2}>
              First Name:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateFirstName}
                value={this.state.firstName}
                type="text"
                name="first-name"
                id="first-name"
                placeholder={this.state.updatedUser?.firstName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="last-name" sm={2}>
              Last Name:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateLastName}
                value={this.state.lastName}
                type="text"
                name="last-name"
                id="last-name"
                placeholder={this.state.updatedUser?.lastName}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="email" sm={2}>
              Email:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateEmail}
                value={this.state.email}
                type="text"
                name="email"
                id="email"
                placeholder={this.state.updatedUser?.email}
              />
            </Col>
          </FormGroup>




          <Button color="info">Submit</Button>
        </Form>
        {/* <p>{this.state.updatedUser}</p> */}
      </>
    ) : (
      // <Redirect to="/" />
      <Redirect to='/login' />
    );
  }
}


/**
 *   <Redirect to={`${this.props.match.path}/user`} />
 */