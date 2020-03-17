import { User } from "../../models/User";
import { BadCredentialsError } from "../../errors/BadCredentialsError";
import { InternalServerError } from "../../errors/InternalServerError";
import { project1Client } from "./project1-client";

/*
export async function project1Login(username: string, password: string): Promise<User> {
    let credentials = {
        username,
        password
    }
    try {


        let response = await fetch('http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002/login', {
            method: 'POST',
            mode:  "no-cors",   //'cors', *cors, same-origin
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        })
        console.log(response);
        console.log("Worked");
        if(response.status === 404){
            throw new BadCredentialsError()
        }

        return await response.json()
    } catch (e) {
        if(e.status === 404){
            throw e
        } else{  console.log("==Error is login-project1 ===" +e.message)
            throw new InternalServerError()
        }
    }
}

*/



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