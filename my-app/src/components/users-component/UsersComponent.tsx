import React from 'react'
import axios from 'axios'
import { User } from "../../models/User";
import { Table} from 'reactstrap'
import {Link} from 'react-router-dom'

interface IViewAllUsersProps
 {
  
  users:User[],
  errorMessage:string ,
  user:User|undefined
}

export class UsersComponent  extends React.Component<any,IViewAllUsersProps> 
 {
 
constructor (props: any) 
{
  super(props)
  this.state = {
    users: [],
    errorMessage: '', 
    user:undefined
  }
}
  componentDidMount() 
  {
    
    const prodEnvironment = {    project1BaseUrl:'http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002'}
    let environment = prodEnvironment
    
   const project1Client = axios.create({
        baseURL:environment.project1BaseUrl, //the base network address with no URI's on 
        headers:{   'Content-Type': 'application/json'  },
        withCredentials:true
    })
    
  project1Client.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/users/', 
  {  withCredentials: true,  } )
  .then(response => response.data)
  .then((data) => 
   {
 
     this.setState({ users: data })
     console.log(this.state.users)
    })

 // Query for User

 
 project1Client.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/users/'+this.props.currentUser.userId, 
 {  withCredentials: true,  } )
 .then(response => response.data)
 .then((data) => 
  {

    this.setState({ user: data })
    console.log(this.state.users)
   })



   // this.props.currentUser.userId

} //component DidMount
 
  
  render() 
  { 
    var divStyle = {
      background: "white",
      //padding: "20px",
      margin: "20px"
      
    };
    
    return this.props.currentUser.role.role === "Admin" ||this.props.currentUser.role.role === "Finance-Manager" ||this.props.currentUser.role.role === "User"? 
   (
    <>

   
   
   

  <div style={divStyle}>
   
   <h1> All Users Info</h1> <br/>
  <h4> Your role is {this.props.currentUser.role.role}</h4>
     <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>id</th>
      <th>username</th>
      <th>password</th>
      <th>firstname</th>
      <th>lastname</th>
      <th>email</th>
      <th>roleId</th>
      <th>roleName</th>
      <th>Action </th>
    </tr>
  </thead>
  <tbody>


  {
this.state.users.map(  (person, index) => 
   (
     
      
  
        <tr>
          
        <td><Link to={{pathname:`/user/${person.userId}`, state: { uid: `${person.userId}`}   }}>{person.userId}</Link></td>
        <td>{person.userName}</td>
        <td>ANY</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.email}</td>
        <td>{person.role.roleid}</td>
        <td>{person.role.role}</td>
        <td><Link to={{pathname:`/user-update/${person.userId}`, state: { uid: `${person.userId}`}   }}>update</Link> </td>
      </tr>
   )
                    )
}



   
   
   
  </tbody>
</Table>



 </div>
 </>

      // line Before end of return
    ) : 
    (
           <div>
               <h1> All Users Info</h1> <br/>
  <h4> Your role is {this.props.currentUser.role.role}</h4>
     <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>id</th>
      <th>username</th>
      <th>password</th>
      <th>firstname</th>
      <th>lastname</th>
      <th>email</th>     
      <th>roleName</th>
     
    </tr>
  </thead>
  <tbody>

  
      
  
        <tr>
          
        <td>{this.state.user?.userId} </td>
        <td>{this.state.user?.userName}</td>
        <td>ANY</td>
        <td>{this.state.user?.firstName}</td>
        <td> {this.state.user?.lastName} </td>
        <td> {this.state.user?.email} </td>
        <td> {this.state.user?.role.role} </td>
       
        </tr>
  



   
   
   
  </tbody>
</Table>
             </div>
    )
;}
}    //class
/**   <td><Link to={`/user/${person.userId}`   }>{person.userId}</Link></td> */


/**  <Link to={{ pathname: '/route', state: { foo: 'bar'} }}>My route</Link> */