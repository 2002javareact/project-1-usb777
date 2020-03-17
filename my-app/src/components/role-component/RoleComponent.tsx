import React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";



///remember to put the default states for all form fields
interface IUpdateUserState 
{
  updatedUser: User | undefined;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  errorMessage: string;
  uid:number;
}

export class RoleComponent extends React.Component<
  any,//IUpdateUserProps,
  IUpdateUserState
> {
  constructor(props: any)
   {
    super(props);
    this.state = {
      updatedUser: undefined,
      userId: 0,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      role: 0,
      errorMessage: "",
      uid: 0
    };    
  }


  componentDidMount() 
  {

  }
  //figure out how to display new html after user is successfully updated
  render() {
    return this.props.currentUser.role.role === "Admin" ||this.props.currentUser.role.role === "Finance-Manager" ||this.props.currentUser.role.role === "User"? 
    (
      <>
       <h1> User Update</h1> <br/>
       <h4> Your role is {this.props.currentUser.role.role}</h4>


      </>

      // line Before end of return
    ) : (
      // <Redirect to="/" />
     // <Redirect to={{pathname:'/login', state: { currentUser: null}   }}  />
    <div> Hello, undefined USER  </div>
     
    );
  }
}


/**
 *   <Redirect to={`${this.props.match.path}/user`} />
 */