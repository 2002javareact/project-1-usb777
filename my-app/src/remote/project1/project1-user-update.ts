import { project1Client } from "./project1-client";
import { InternalServerError } from "../../errors/InternalServerError";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
//function to update user
export async function project1UpdateUser(
  userId: number,
  userName: string,
  password:string,
  firstName: string,
  lastName: string,
  email: string,
  role:Role
): Promise<User> {
  let updateUser = {
    userId,
    userName,
    password,
    firstName,
    lastName,
    email,
    role
  };
  let roleobject:Role = new Role(2,"User")
  updateUser.role = roleobject
  try {
    let response = await project1Client.patch("/users", updateUser);
    console.log(response);
    //change to !== 200?
    // if (response.status === 400) {
    //   throw new BadCredentialsError();
    // }

    return response.data;
  } catch (e) {
    if (e.status === 400) {
      throw e;
    } else {
      throw new InternalServerError();
    }
  }
}
