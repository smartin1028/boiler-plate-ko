import Axios from 'axios';
import {LOGIN_USER} from "./type";


export function loginUser(dataToSummit){

    const request = Axios.post('/api/users/login', dataToSummit)
        .then(response => response.data)

    console.log("test login last and return ")
    return {
        type:LOGIN_USER, payload : request
    }
}