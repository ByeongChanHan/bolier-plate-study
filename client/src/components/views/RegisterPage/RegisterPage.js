import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    // onchange가 되면 메소드 실행
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        // 새로고침 방지를 위해 이벤트를 중지
        event.preventDefault();
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            email:Email,
            password: Password,
            name:Name
        }
        // loginUser액션에 body를 만들어줌
        dispatch(RegisterUser(body))
        .then(response=>{
            if(response.payload.success){
                props.history.push('/login')
            }
            else{
                alert("Failed to sign up")
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

            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>

            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

            <br/>
            <button type="submit">
                회원 가입
            </button>
        </form>
        </div>
    )
}

export default withRouter(RegisterPage)
