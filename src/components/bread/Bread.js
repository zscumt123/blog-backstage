import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
// const BreadcrumbItem = Breadcrumb.Item;
import { config } from '../../routes/Routes';

// const routes = [
//     {
//         path: 'main/index',
//         breadcrumbName: "首页"
//     },
//     {
//         path: 'main/usermanage',
//         breadcrumbName: "用户管理"
//     },
//     {
//         path: 'main/articles',
//         breadcrumbName: "文章管理"
//     },
//     {
//         path: 'main/category',
//         breadcrumbName: "分类管理"
//     },
// ]

class Bread extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    itemRender =(route, params, routes, paths) => {
        const index = routes.indexOf(route);
        const last = index === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths[index]}`}>{route.breadcrumbName}</Link>
    }

    getRoutes = () => {
        const { location: { pathname } } = this.props;
        const paths = Object.keys(config);
        const item = paths.find((item, index) => pathname.indexOf(item) !== -1);
        return [
            {
                path: 'main/index',
                breadcrumbName: '首页'
            },
            {
                path: pathname,
                breadcrumbName: config[item]
            }
        ]
    }


    render() {
        const routes = this.getRoutes();
        return (
            <Breadcrumb itemRender={this.itemRender} routes={routes}/>
        );
    }
}

export default withRouter(Bread);