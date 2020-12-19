// 여러가지 상태관리를 하기위해 combineReducer를 사용
// 여러가지 리듀서를 합쳐서 rootReducer로 이용
import { combineReducers} from 'redux';
import user from './user_reducer'
const rootReducer = combineReducers({
    user
})

export default rootReducer;