import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { hasLogin } from '../../utils';

class AuthRoute extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        const { location: { pathname } } = this.props;
        const isLogin = hasLogin();
        if(!isLogin && pathname !== '/login') {
            return <Redirect to="/login" />;
        }
        const { children } = this.props;
        return <div className="root-container">{children}</div>;
    }
}
export default withRouter(AuthRoute);