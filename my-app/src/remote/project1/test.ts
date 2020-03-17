const devEnvironment = {    project1BaseUrl:'http://localhost:2002'}



import { User } from "../../models/User";
import { BadCredentialsError } from "../../errors/BadCredentialsError";
import { InternalServerError } from "../../errors/InternalServerError";

import axios from 'axios'

//set up our base environment for our webflicks connection

const prodEnvironment = {    project1BaseUrl:'http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002'}
export let environment = prodEnvironment

export const project1Client = axios.create({
    baseURL:environment.project1BaseUrl, //the base network address with no URI's on 
    headers:{   'Content-Type': 'application/json'  },
    withCredentials:true
})


export async function project1Login(username: string, password: string): Promise<User> {
    let credentials =
                        {
                            username,
                            password
                        }
    try {
            let response = await project1Client.post('/login', credentials)
            console.log(response);
            if(response.status === 404)
            {
                throw new BadCredentialsError()
            }

        return response.data

        }
         catch (e) {
        if(e.status === 404){
            throw e
        } else{
            console.log("Error from login-project.ts == "+e.message)
            throw new InternalServerError()
        }
    }
}




// fetch all users



export const project1GetAllUsers = async () => {
    try 
    {
        let response = await project1Client.get('/users')
        if(response.status === 200)
        {
            return response.data
        }
        else 
        {
            throw new InternalServerError()
        }
    }   // try
     catch (e)
    {
        throw new InternalServerError()
    }


}   // end project1GetAllUsers