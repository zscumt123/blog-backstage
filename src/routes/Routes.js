import React from 'react';
import { Router, Route, Redirect, withRouter } from 'react-router';

import history from '../utils/history';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import AuthRoute from '../components/authRoute/AuthRoute';

import Overview from '../pages/overview/Overview';
import UserManage from '../pages/userManage/UserManage';
import Articles from '../pages/articles/Articles';
import Category from '../pages/category';

const Routes = (props) => (
    <Router history={history}>
        <AuthRoute>
            <Route path="/" exact render={() => <Redirect to="/main" />} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
        </AuthRoute>
    </Router>
);
export default Routes;


const config = {
    index: "首页",
    usermanage: '用户管理',
    articles: '文章管理',
    category: '分类管理'
}

let MainRoutes = (props) => {
    const { match: { path } } = props;
    return (
        <div>
            <Route path={`${path}/index`} component={Overview} />
            <Route path={`${path}/usermanage`} component={UserManage} />
            <Route path={`${path}/articles`} component={Articles} />
            <Route path={`${path}/category`} component={Category} />
        </div>
    );
}; 
MainRoutes = withRouter(MainRoutes);
export { MainRoutes, config };
