import React, { useState } from 'react';
import { submitLogin, doLogout } from "../Action/Login";
import { useDispatch } from "react-redux";
import Progress from "../UniversalComponents/Progress";
import Notification from "../UniversalComponents/Notification";

const Login = () => {
    const dispatch = useDispatch();
    const initialState = {
        email: null,
        password: null,
    };

    const [formValue, setFormValue] = useState(initialState);

   const onChangeFormValue = event => {
       setFormValue({
           ...formValue,
           [event.target.name]: event.target.value
       });
    };

   const handleSubmitLogin = (event) => {
       event.preventDefault()
       const doLogin = submitLogin(formValue)
       dispatch(doLogin)
   };

    const handleLogout = (event) => {
        event.preventDefault();
        let accessToken = localStorage.getItem('accessToken');
        const doLogin = doLogout({ accessToken });
        dispatch(doLogin)
    };

    return (
        <div>
            <Progress/>
            <Notification/>
            THIS IS LOGIN
            <input type={"text"} name={"email"} onChange={onChangeFormValue} value={formValue.email}/>
            <input type={"password"} name={"password"} onChange={onChangeFormValue} value={formValue.password}/>
            <input type={"submit"} onClick={handleSubmitLogin}/>
            <input type={"button"} value={"Logout"} onClick={handleLogout}/>
        </div>
    );
};

export default Login;
