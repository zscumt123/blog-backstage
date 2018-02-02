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
import ArticleList from '../pages/articleList';

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
    articles: '新建文章',
    category: '分类管理',
    articlelist: '文章列表'
}

let MainRoutes = (props) => {
    const { match: { path } } = props;
    return (
        [
            <Route key={'1'} path={`${path}/index`} component={Overview} />,
            <Route key={'2'} path={`${path}/usermanage`} component={UserManage} />,
            <Route key={'3'} path={`${path}/articles/:id?`} component={Articles} />,
            <Route key={'4'} path={`${path}/category`} component={Category} />,
            <Route key={'5'} path={`${path}/articlelist`} component={ArticleList} />
        ]


    );
}; 
MainRoutes = withRouter(MainRoutes);
export { MainRoutes, config };
