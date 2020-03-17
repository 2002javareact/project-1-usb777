import React from 'react'
import axios from 'axios'
import { Reimbursement } from "../../models/Reimbursement";
import { Table} from 'reactstrap'
import {Link} from 'react-router-dom'

interface IViewAllUsersProps
 {
  
  reimbs:Reimbursement[],
  errorMessage:string ,
  authorid:number
}

export class ReimbsByAuthorComponent  extends React.Component<any,IViewAllUsersProps> 
 {
 
constructor (props: any) 
{
  super(props)
  this.state = {
    reimbs: [],
    errorMessage: '',
    authorid:0
  }
}
  componentDidMount() 
  {
    const {authorid} = this.props.match.params

axios.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/reimbursements/author/userId/'+authorid, 
  {  withCredentials: true,  } )
  .then(response => response.data)
  .then((data) => 
   {
 
     this.setState({reimbs: data })
     console.log(this.state.reimbs)
    })
       this.setState({authorid:authorid})

} //component DidMount
 
  
  render() 
  {

    var divStyle = {
      background: "white",
      //padding: "20px",
      margin: "20px"
      
    };
      
return(
  <div style={divStyle}>
   
   <h1> Reimbursement By Author</h1> <br/>
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
        <td>{reimb.reimbursementId}</td>
        <td>{reimb.author}</td>
        <td>{reimb.amount}</td>
        <td>{reimb.dateSubmitted}</td>        
        <td>{reimb.dateResolved}</td>      
        <td>{reimb.description}</td>
        <td>{reimb.resolver}</td>
        <td>   
        {(() => {
          let status = reimb.status
        switch (status) {
          case 1:   return "Pending";
          case 2:   return "Approved";
          case 3:   return "Denied";
          default:  return "Pending";
        }
      })()}   </td>
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
        <td><Link to={{pathname:`/reimbursements-update/${reimb.reimbursementId}`, state: { rid: `${reimb.reimbursementId}`}   }}>update</Link> </td>
   
        </tr>
   )
                    )
}



   
   
   
  </tbody>
</Table>



 </div>
);}
}    //class
/**   <td><Link to={`/user/${person.userId}`   }>{person.userId}</Link></td> */


/**  <Link to={{ pathname: '/route', state: { foo: 'bar'} }}>My route</Link> */