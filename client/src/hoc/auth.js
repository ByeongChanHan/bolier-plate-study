
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태 
                if (!response.payload.isAuth) {
                    // option이 true면 login 페이지로 보낸다
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태 
                    // 어드민 페이지 제어 로그인 유저는 false인 페이지를 못들어가게끔 설정
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}