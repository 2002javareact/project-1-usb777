import axios from 'axios'
import { environment } from  '../../environment'  //'../../environment'

//set up our base environment for our webflicks connection
export const project1Client = axios.create({
    baseURL:environment.project1BaseUrl, //the base network address with no URI's on 
    headers:{   'Content-Type': 'application/json'  },
    withCredentials:true
})
