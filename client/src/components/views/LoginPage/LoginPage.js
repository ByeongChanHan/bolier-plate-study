import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();
    // hooks에서 state를 사용 (앞에가 state이름 뒤에 setEmail은 state를 변경)
    // 처음에는 Email과 패스워드가 빈칸
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    // onchange가 되면 메소드 실행
    const onEmailHandler = (event) => {
        // Email은 setEmail을 받기 때문에 value값을 주면 된다
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        // 새로고침 방지를 위해 이벤트를 중지
        event.preventDefault();
        let body = {
            email:Email,
            password: Password
        }
        // loginUser액션에 body를 만들어줌
        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }
        })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
        
        <form style={{display:'flex',flexDirection:'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <br/>
            <button type="submit">
                Login
            </button>
        </form>
        </div>
    )
}

export default withRouter(LoginPage)
