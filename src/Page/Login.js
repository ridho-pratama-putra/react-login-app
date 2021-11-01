import React, {useState} from 'react';
import {submitLogin, doLogout} from "../Action/Login";
import {useDispatch} from "react-redux";
import Progress from "../UniversalComponents/Progress";
import Notification from "../UniversalComponents/Notification";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {makeStyles} from '@mui/styles'

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
        inputType : {
            marginTop: '10px'
        }
    });

    const classes = useStyles();

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
        const doLogin = doLogout({accessToken});
        dispatch(doLogin)
    };

    return (
        <div>
            <Progress/>
            <Box  display='flex' justifyContent="space-around" className={classes.root}>
                <Card className={classes.card} variant="outlined" >
                    <div style={{marginTop: '20px'}}>
                        Login, or you can <Link href='/register'>Register</Link> so you can track your request and get
                        early
                        offer from us
                    </div>
                    <TextField label="Email" name={"email"} variant="outlined" onChange={onChangeFormValue}
                               value={formValue.email} style={{marginTop: '30px'}}/>
                    <TextField label="Password" name={"password"} type="password" variant="outlined"
                               onChange={onChangeFormValue} value={formValue.password} style={{marginTop: '10px'}}/>
                    <Button variant="contained" style={{marginTop: '10px'}} type={"submit"} onClick={handleSubmitLogin}>Submit</Button>
                    <Button variant="contained" type={"button"} onClick={handleLogout} style={{marginTop: '10px'}}>Logout</Button>
                </Card>
                <Notification/>

            </Box>
        </div>
    );
};

export default Login;
