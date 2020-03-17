import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'
import {  project1Login } from '../../remote/project1/login-project1'
import { User } from '../../models/User'
import { Redirect } from 'react-router'

interface ILoginProps {
    updateUser: (u: User) => void;
  }
  
  interface ILoginComponentState {
    username: string;
    password: string;
    errorMessage: string;
    user: User | undefined;
  }

export class LoginComponent extends React.Component<ILoginProps, ILoginComponentState>
{
   
    constructor(props: any) 
        {
          super(props)
           this.state = 
        {
            username: '',
            password: '',
            errorMessage: '',
            user: undefined
        }
    }
 // Functions to update the state of user/pass fields dynamically
 updateUser = (name: any) => {
    this.setState({
      username: name.currentTarget.value
    });
  };
  updatePassword = (pass: any) => {
    this.setState({
      password: pass.currentTarget.value
    });
  };

  //Function to submit the login form
  submitLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let user = await  project1Login(this.state.username, this.state.password);
      //Sets the user in App.tsx
      this.props.updateUser(user);
      this.setState({
        user: user,
        username: "",
        password: ""
      });
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          password: "",
          errorMessage: e.message
        });
      } else {
        this.setState({
          password: "",
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

    render() {

      //  console.log("=======HELLO WORLD7=========" + this.props.children  );
        return ( 
            this.state.user ? 
            <Redirect to='/users'/>
            :
            <> 
            {/* a react Fragment, disappears on render */}
                <Form onSubmit={this.submitLogin}>
                    <FormGroup row>
                        <Label for="username" sm={2}>Email</Label>
                        <Col sm={6}>
                            <Input onChange={this.updateUser} value={this.state.username} type="text" name="username" id="username" placeholder="your username" required />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={6}>
                            <Input onChange={this.updatePassword} value={this.state.password} type="password" name="password" id="password" placeholder="your password" required />
                        </Col>
                    </FormGroup>
                    <Button color='info'>Submit</Button>
                </Form>
                <p>{this.state.errorMessage}</p>
            </>
        )
    }
}