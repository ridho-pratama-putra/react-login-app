import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./User/Login";
import Register from "./User/Register";
import Home from "./UniversalComponents/Home";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
