import React, { SyntheticEvent } from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { Reimbursement } from "../../models/Reimbursement";
import { project1UpdateReimbursement } from "../../remote/project1/project1-reimb";
import axios from 'axios'
interface IUpdateReimbursementProps extends RouteComponentProps {
  currentUser: User;
 
}

///remember to put the default states for all form fields
interface IUpdateReimbursementState {
  updatedReimbursement: any;
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: string;
  dateResolved: string;
  description: string;
  resolver: number;
  status: number;
  type: number;
  errorMessage: string;  
  rid:number;
}

export class UpdateReimbursementComponent extends React.Component<
  any,//IUpdateReimbursementProps,
  IUpdateReimbursementState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      updatedReimbursement: "",
      reimbursementId: 0,
      author: 0,
      amount: 0,
      dateSubmitted: "",
      dateResolved: "",
      description: "",
      resolver: 0,
      status: 0,
      type: 0,
      errorMessage: "",
      rid:0
    };
    
  }

  // Update State functions for each field
  updateReimbursementId = (id: any) => {
    this.setState({
      reimbursementId: id.currentTarget.value
    });
  };
  updateAuthor = (a: any) => {
    this.setState({
      author: a.currentTarget.value
    });
  };
  updateAmount = (am: any) => {
    this.setState({
      amount: am.currentTarget.value
    });
  };
  updateDateSubmitted = (ds: any) => {
    this.setState({
      dateSubmitted: ds.currentTarget.value
    });
  };
  updateDateResolved = (dr: any) => {
    this.setState({
      dateResolved: dr.currentTarget.value
    });
  };
  updateDescription = (desc: any) => {
    this.setState({
      description: desc.currentTarget.value
    });
  };
  updateResolver = (r: any) => {
    this.setState({
      resolver: r.currentTarget.value
    });
  };
  updateStatus = (stat: any) => {
    this.setState({
      status: stat.currentTarget.value
    });
  };
  updateType = (t: any) => {
    this.setState({
      type: t.currentTarget.value
    });
  };


  componentDidMount() 
  {

    console.log('Im here in Update')
    const{rid} =  this.props.match.params
 
    axios.get('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/reimbursements/' + rid /**parameter */, 
     {  withCredentials: true,  } )
     .then(response => response.data)
     .then((data) => 
      {
     
        this.setState({ updatedReimbursement: data })
console.log("=================");
        console.log(this.state.updatedReimbursement)
        console.log("=================");
       })
      // let updatedReimb = this.state.updatedReimbursement

       this.setState({reimbursementId:rid})

  }



  // Function to submit update to db
  submitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let updatedReimbursement = await project1UpdateReimbursement(
        this.state.reimbursementId,
        this.state.author,
        this.state.amount,
        this.state.dateSubmitted,
        this.state.dateResolved,
        this.state.description,
        this.state.resolver,
        this.state.status,
        this.state.type
      );
      this.setState({
        updatedReimbursement: updatedReimbursement
      });
      //I DONT HAVE TO SET STATE?
      //Sets the user in App.tsx
      //this.props.updateUser(user);
      //            this.setState({
      //              userToUpdate: updatedUser,
      //              userId: userId,
      // username: string,
      // firstName: string,
      // lastName: string,
      // email: string,
      // role: number
      //            });
      console.log(updatedReimbursement);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          reimbursementId: 0,
          author: 0,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 0,
          type: 0,
          errorMessage: e.message
        });
      } else {
        this.setState({
          reimbursementId: 0,
          author: 0,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 0,
          type: 0,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  //figure out how to display new html after user is successfully updated
  render() {
    return this.props.currentUser.role.role === "Admin" ? (
      <>       
        {/* Form to submit all fields that you want to update */}
        <Form onSubmit={this.submitUpdate}>
          {/* only thing required should be the user id */}
          <FormGroup row>
            <Label for="reimbursementId" sm={2}>
              ReimbursementId:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateReimbursementId}
                value={this.state.reimbursementId}
                type="text"
                name="reimbursementId"
                id="reimbursementId"
                placeholder="ReimbursementId"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="author" sm={2}>
              Author:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateAuthor}
                value={this.state.author}
                type="text"
                name="author"
                id="author"
                placeholder={this.state.updatedReimbursement.author}  //"Author"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="amount" sm={2}>
              Amount:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateAmount}
                value={this.state.amount}
                type="text"
                name="amount"
                id="amount"
                placeholder={this.state.updatedReimbursement.amount}//"Amount"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="dateSubmitted" sm={2}>
              Date Submitted:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDateSubmitted}
                value={this.state.dateSubmitted}
                type="text"
                name="dateSubmitted"
                id="dateSubmitted"
                placeholder={this.state.updatedReimbursement.dateSubmitted}//"Date Submitted"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="dateResolved" sm={2}>
              Date Resolved:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDateResolved}
                value={this.state.dateResolved}
                type="text"
                name="dateResolved"
                id="dateResolved"
                placeholder={this.state.updatedReimbursement.dateResolved}//"Date Resolved"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>
              Description:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDescription}
                value={this.state.description}
                type="text"
                name="description"
                id="description"
                placeholder={this.state.updatedReimbursement.description}//"Description"
              />
            </Col>
          </FormGroup>
          {/* Inputted Resolver should be the User ID of resolver */}
          <FormGroup row>
            <Label for="resolver" sm={2}>
              Resolver:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateResolver}
                value={this.state.resolver}
                type="text"
                name="resolver"
                id="resolver"
                placeholder= {this.state.updatedReimbursement.resolver}//"Resolver"
              />
            </Col>
          </FormGroup>
          {/* Inputted Status should be the Status ID */}
          <FormGroup row>
            <Label for="status" sm={2}>
              Status:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateStatus}
                value={this.state.status}
                type="text"
                name="status"
                id="status"
                placeholder={this.state.updatedReimbursement.status}//"Status"
              />
            </Col>
          </FormGroup>
          {/* Inputted Type should be the Type ID */}
          <FormGroup row>
            <Label for="type" sm={2}>
              Type:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateType}
                value={this.state.type}
                type="text"
                name="type"
                id="type"
                placeholder={this.state.updatedReimbursement.type}//"Type"
              />
            </Col>
          </FormGroup>
          <Button color="info">Submit</Button>
        </Form>
        {/* <p>{this.state.updatedUser}</p> */}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
