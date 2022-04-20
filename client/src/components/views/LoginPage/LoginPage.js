import React, {useState} from "react";

import {useDispatch} from "react-redux";

// import {response} from "express";
import {loginUser} from "../../../_actions/user_action";
// import {Axios} from "axios";

function LoginPage() {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        // setPassword(event.currentTarget.value)
        event.preventDefault();// 안해주면 페이지 리프레시

        let body ={
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))

        // Axios.post('/api/users/login', body).then(response => {
        // })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width :'100%' , height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='Password' value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button type={"submit"}>
                    Login
                </button>



            </form>
        </div>
    )
}
export default LoginPage