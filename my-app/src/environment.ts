

const devEnvironment = {
    project1BaseUrl:'http://localhost:2002'
}

const prodEnvironment = {
    project1BaseUrl:'http://ec2-18-216-91-68.us-east-2.compute.amazonaws.com:2002'
}

export let environment = prodEnvironment
/*
if(process.env.REACT_APP_ENV === 'production'){
    environment = prodEnvironment
}

*/