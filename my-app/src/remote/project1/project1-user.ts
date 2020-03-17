
import { project1Client } from "./project1-client";
import { InternalServerError } from "../../errors/InternalServerError";
import { User } from "../../models/User";



export const getUserById = async (user: User) => {
    try {
      let response = await project1Client.get(`/users/${user.userId}`);
      console.log(response);
  
      if (response.status === 200) {
        console.log(response.data);
  
        return response.data;
      } else {
        throw new InternalServerError();
      }
    } catch (e) {
      throw new InternalServerError();
    }
  };