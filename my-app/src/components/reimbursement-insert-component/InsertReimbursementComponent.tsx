import React, { SyntheticEvent } from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { Reimbursement } from "../../models/Reimbursement";
import { project1InsertReimbursement } from "../../remote/project1/project1-reimb";

interface ISubmitReimbursementProps extends RouteComponentProps 
{
  currentUser: User;
}

///remember to put the default states for all form fields
interface ISubmitReimbursementState {
  submittedReimbursement: Reimbursement | undefined;
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
  redirect:boolean
}

export class InsertReimbursementComponent extends React.Component<
  ISubmitReimbursementProps,
  ISubmitReimbursementState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      submittedReimbursement: undefined,
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
      redirect:false
    };
  }

  // Update State functions for each field
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


  
renderRedirect = () => {
  if(this.state.redirect){
   return (
     <Redirect
       to="/reimbursements"
     />
    );
  }
};


  // Function to submit update to db
  submitReimbursement = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let submittedReimbursement = await project1InsertReimbursement(
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
        submittedReimbursement: submittedReimbursement
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
      console.log(submittedReimbursement);

      this.setState({ redirect: true });
     


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
     
       {this.renderRedirect()}

        <Form onSubmit={this.submitReimbursement}>
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
                placeholder="Author"
                required
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
                placeholder="Amount"
                required
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
                placeholder="Date Submitted"
                required
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
                placeholder="Date Resolved"
                required
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
                placeholder="Description"
                required
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
                placeholder="Resolver"
                required
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
                placeholder="Status"
                required
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
                placeholder="Type"
                required
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
