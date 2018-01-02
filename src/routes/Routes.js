import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
const isLogin = false;

const Routes = (props) => (
    <BrowserRouter>
        <div className="root-container">
            <Route path="/" exact render={() => {
                return <Redirect to={ isLogin ? '/main' : '/login' }/>
            }}/>
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
        </div>
    </BrowserRouter>
);
export default Routes;