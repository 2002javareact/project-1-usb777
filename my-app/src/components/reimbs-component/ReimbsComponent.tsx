import React from 'react'
import axios from 'axios'
import { Reimbursement } from "../../models/Reimbursement";
import { Table} from 'reactstrap'
import {Link} from 'react-router-dom'

interface IViewAllUsersProps
 {
  
  reimbs:Reimbursement[],
  errorMessage:string 
}

export class ReimbsComponent  extends React.Component<any,IViewAllUsersProps> 
 {
 
constructor (props: any) 
{
  super(props)
  this.state = {
    reimbs: [],
    errorMessage: ''
  }
}
  componentDidMount() 
  {
    

  axios.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/reimbursements/', 
  {  withCredentials: true,  } )
  .then(response => response.data)
  .then((data) => 
   {
 
     this.setState({reimbs: data })
     console.log(this.state.reimbs)
    })


} //component DidMount
 
  
  render() 
  {

    var divStyle = {
      background: "white",
      //padding: "20px",
      margin: "20px"
      
    };
    let link ='/user/' +5;
   
    return this.props.currentUser.role.role === "Admin" ||this.props.currentUser.role.role === "Finance-Manager" ||this.props.currentUser.role.role === "User"? 
    (
      <>
  <div style={divStyle}>
   
   <h1> All Reimbursement Info</h1> <br/>
  <h4> Your role is {this.props.currentUser.role.role}</h4>

  <h5><Link to='/reimbursements-insert'> insert Reimbursement</Link> </h5>

     <Table striped bordered hover size="sm">
  <thead>
    <tr>
         <th>id</th>
        <th>author</th>
        <th>amount</th>
        <th>date Submitted</th>        
        <th>date Resolved</th>      
        <th>description</th>
        <th>resolver</th>
        <th>status</th>
        <th>type</th>

      <th>Action </th>
    </tr>
  </thead>
  <tbody>


  {
this.state.reimbs.map(  (reimb, index) => 
   (
     
    
  
        <tr>
          
        <td><Link to={{pathname:`/user/${reimb.reimbursementId}`, state: { uid: `${reimb.reimbursementId}`}   }}>{reimb.reimbursementId}</Link></td>
        <td>
         
          <Link to={{pathname:`/reimbursements-author/${reimb.author}`, state: { authorID: `${reimb.author}`}   }}>
          {reimb.author}
          </Link>
          </td>
        <td>{reimb.amount}</td>
        <td>{reimb.dateSubmitted}</td>        
        <td>{reimb.dateResolved}</td>      
        <td>{reimb.description}</td>
        <td>{reimb.resolver}</td>
        <td>      
          
          
          
           <Link to={{pathname:`/reimbursements-status/${reimb.status}`, state: { statusID: `${reimb.status}`}   }}>
           {(() => {
          let status = reimb.status
        switch (status) {
          case 1:   return "Pending";
          case 2:   return "Approved";
          case 3:   return "Denied";
          default:  return "Pending";
        }
      })()} 
             
             </Link>              </td>
        <td>

                   
          {(() => {
          let type = reimb.type
        switch (type) {
          case 1:   return "Lodging";
          case 2:   return "Travel";
          case 3:   return "Food";
          default:  return "Other";
        }
      })()} 
          
          </td>
        
        <td><Link to={{pathname:`/reimbursements-update/${reimb.reimbursementId}`, state: { reimbid: `${reimb.reimbursementId}`}   }}>update</Link> </td>
      </tr>
   )
                    )
}



   
   
   
  </tbody>
</Table>



 </div>

 </>

// line Before end of return
) : (
// <Redirect to="/" />
// <Redirect to={{pathname:'/login', state: { currentUser: null}   }}  />
<div> Hello,  USER  </div>

);


;}
}    //class
/**   <td><Link to={`/user/${person.userId}`   }>{person.userId}</Link></td> */


/**  <Link to={{ pathname: '/route', state: { foo: 'bar'} }}>My route</Link> */