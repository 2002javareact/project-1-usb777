import { project1Client } from "./project1-client";
import { InternalServerError } from "../../errors/InternalServerError";
import { Reimbursement } from "../../models/Reimbursement";

//update reimbursement
export async function project1UpdateReimbursement(
  reimbursementId: number,
  author: number,
  amount: number,
  dateSubmitted: string,
  dateResolved: string,
  description: string,
  resolver: number,
  status: number,
  type: number
): Promise<Reimbursement> {
  let updateReimbursement = {
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  };
  try {
    let response = await project1Client.patch(
      "/reimbursements",
      updateReimbursement
    );
    console.log(response);

    return response.data;
  } catch (e) {
    if (e.status === 400) {
      throw e;
    } else {
      throw new InternalServerError();
    }
  }
}



//////////////////////////////////////////////////////////



//add reimbursement
export async function project1InsertReimbursement(
  reimbursementId: number,
  author: number,
  amount: number,
  dateSubmitted: string,
  dateResolved: string,
  description: string,
  resolver: number,
  status: number,
  type: number
): Promise<Reimbursement> {
  let newReimbursement = {
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  };
  try {
    let response = await project1Client.post("/reimbursements", newReimbursement);
    console.log(response);

    return response.data;
  } catch (e) {
    if (e.status === 400) {
      throw e;
    } else {
      throw new InternalServerError();
    }
  }
}
