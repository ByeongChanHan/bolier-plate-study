import {LOGIN_USER,REGISTER_USER,AUTH_USER} from '../_actions/types'
// 리듀서는 전에 있는 state와 action을 통해 다음 state를 만들어준다
export default function(state = {}, action){
    // type을 구분하기 위함
    switch (action.type) {
        case LOGIN_USER:
            return {...state,loginSuccess:action.payload}
            break;
        case REGISTER_USER:
            return {...state,register:action.payload}
            break;
        case AUTH_USER:
            return {...state,userData:action.payload}
            break;
        default:
            return state;
    }
}