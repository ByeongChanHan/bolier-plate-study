import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response=>response.data)
    // response의 데이터를 reducer에게 보내야함
    // payload에 넣어준다
    // type:login_user
    // payload:{loginSuccess:true, userId: ~~~~}
    return{
        type:LOGIN_USER,
        payload: request
    }
}

export function RegisterUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response=>response.data)
    // response의 데이터를 reducer에게 보내야함
    // payload에 넣어준다
    // type:login_user
    // payload:{loginSuccess:true, userId: ~~~~}
    return{
        type:REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}