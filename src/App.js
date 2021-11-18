import React, {useEffect} from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Home from "./UniversalComponents/Home";
import {
    AppBar,
} from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Drawer from "@mui/material/Drawer";
import {makeStyles} from '@mui/styles'
import ProtectedRoute from "./UniversalComponents/ProtectedRoute";
import Contents from "./Page/Contents";
import {useSelector, useDispatch} from "react-redux";

function App() {
    const useStyles = makeStyles({
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1
        },
        list: {
            width: 250
        },
        fullList: {
            width: 'auto'
        },
        customAppBar: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0
        },
    });
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const anchor = 'left';

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const {isAuthenticated} = useSelector(state => {
        return state.Login;
    });

    // useEffect(() => {
    //     if (localStorage.getItem('refreshToken')) {
    //         const loggedIn = {
    //             token: localStorage.getItem('accessToken'),
    //             refreshToken: localStorage.getItem('refreshToken')
    //         };
    //         dispatch({type: 'FORCED_LOGGED_IN', data: loggedIn})
    //     }
    // });

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key={'Home'} component={Link} to='/'>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Home'}/>
                </ListItem>
                <ListItem button key={'Login'} component={Link} to='login'>
                    <ListItemIcon>
                        <MailIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Login'}/>
                </ListItem>
                <ListItem button key={'Register'} component={Link} to='register'>
                    <ListItemIcon>
                        <AppRegistrationIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Register'}/>
                </ListItem>
                {isAuthenticated && <ListItem button key={'Contents'} component={Link} to='contents'>
                    <ListItemIcon>
                        <AppRegistrationIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Contents'}/>
                </ListItem>}
            </List>
        </Box>
    );

    return (
        <BrowserRouter>
            <AppBar position="static" className={classes.customAppBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        DOmundo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
            </Drawer>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <ProtectedRoute exact path={"/contents"} component={Contents}/>
            </Switch>

        </BrowserRouter>
    );
}

export default App;
