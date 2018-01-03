import React from 'react';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';

import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import AuthRoute from '../components/authRoute/AuthRoute';

import Overview from '../pages/overview/Overview';
import UserManage from '../pages/userManage/UserManage';
import Articles from '../pages/articles/Articles';

const Routes = (props) => (
    <BrowserRouter>
        <AuthRoute>
            <Route path="/" exact render={() => <Redirect to="/main" />} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
        </AuthRoute>
    </BrowserRouter>
);
export default Routes;

let MainRoutes = (props) => {
    const { match: { path } } = props;
    return (
        <div>
            <Route path={`${path}/index`} component={Overview} />
            <Route path={`${path}/usermanage`} component={UserManage} />
            <Route path={`${path}/articles`} component={Articles} />
        </div>
    );
}; 
MainRoutes = withRouter(MainRoutes);
export { MainRoutes };
