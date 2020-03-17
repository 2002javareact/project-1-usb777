import {Role} from './Role'



// a model is just an object for holding data, generally it will reflect data from our database
export class User {
    userId:number// a unique number for identification
    userName:string
    //password:string  we should never send a password to a user
    email:string   
    firstName:string
    lastName:string
    role:Role // their user permissions
    // user - for you can use the service
    // admin - you can ban people or add/remove movies
    constructor(
        userId:number,
        userName:string,
        //password:string,
        email:string,
        
        firstName:string,
        lastName:string,
        role:Role){
            this.userId = userId
            this.userName = userName
            //this.password = password
            this.email = email
          
            this.firstName = firstName
            this.lastName = lastName
            this.role = role
        }
}