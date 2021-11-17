import React, {useState} from 'react';
import {submitLogin, doLogout} from "../Action/User";
import {useDispatch, useSelector} from "react-redux";
import Progress from "../UniversalComponents/Progress";
import Notification from "../UniversalComponents/Notification";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {makeStyles} from '@mui/styles';
import * as api from "../Api/Login";
import {capitalFirstLetter} from "../utils";

const Login = () => {
    const useStyles = makeStyles({
        root: {
            marginTop: '15%',
        },
        button: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px'
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 30px 30px 30px',
            justifyContent: 'space-around'
        },
        inputType: {
            marginTop: '10px'
        }
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const initialState = {
        email: undefined,
        password: undefined,
    };
    const {isAuthenticated} = useSelector(state => {
        return state.Login;
    });

    const [formValue, setFormValue] = useState(initialState);

    const onChangeFormValue = event => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        const result = await api.fethInternalAccount({email: formValue.email}).catch(({response}) => response);
        if (!result) {
            dispatch({type: 'NOTIFICATION_TIMEOUT'})
            return
        }
        const {data} = result
        if (data.status.code === '00') {
            dispatch(submitLogin(formValue))
        } else {
            dispatch({type: 'NOTIFICATION_FAILED', message: capitalFirstLetter(data.status.description), notificationType: 'error'})
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        let refreshToken = localStorage.getItem('refreshToken');
        const doLogin = doLogout(refreshToken);
        dispatch(doLogin)
    };

    const setToken = function (e) {
        if (
            e.origin === origin &&
            e.data &&
            e.data.command === 'token-ready' &&
            e.data.info &&
            e.data.info.token
        ) {
            localStorage.setItem('jwt', e.data.info.token);

            e.source.postMessage(
                {
                    command: 'info',
                    info: {
                        complete: true,
                    },
                },
                e.origin
            );
        }
    };

    window.addEventListener('message', setToken, false);

    const requestSignWithGoogle = () => {
        const googleLoginUrl = 'http://localhost:4000/auth/google';
        const newWindow = window.open(googleLoginUrl, "_self", "width=500,height=500")
    };


    return (
        <div>
            <Progress/>
            <Box display='flex' justifyContent="space-around" className={classes.root}>
                <Card className={classes.card} variant="outlined">
                    <div style={{marginTop: '20px'}}>
                        Login, or you can <Link href='/register'>Register</Link> so you can track your request and get
                        early offer from us
                    </div>
                    <TextField label="Email" name={"email"} variant="outlined" onChange={onChangeFormValue}
                               value={formValue.email} style={{marginTop: '30px'}}/>
                    <TextField label="Password" name={"password"} type="password" variant="outlined"
                               onChange={onChangeFormValue} value={formValue.password} style={{marginTop: '10px'}}/>
                    <Button variant="contained" style={{marginTop: '10px'}}
                            disabled={isAuthenticated}
                            type={"submit"}
                            onClick={handleSubmitLogin}>Submit</Button>
                    <Button variant="contained" type={"button"} disabled={!isAuthenticated}
                            onClick={handleLogout} style={{marginTop: '10px'}}>Logout</Button>
                    <Button variant="contained" type={"button"} disabled={isAuthenticated}
                            onClick={requestSignWithGoogle} style={{marginTop: '10px'}}>Login with Google</Button>
                </Card>
                <Notification/>

            </Box>
        </div>
    );
};

export default Login;
