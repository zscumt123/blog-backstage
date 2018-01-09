import React, { Component } from 'react';
import { Form, Button, Icon, Input, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { lgSetLoginInfo,lgSetLoginOption } from './models/actions';
import styles from './Login.less';
import { hasLogin } from '../../utils';
const FormItem = Form.Item;

class Login extends Component {

    componentWillMount() {
        const { dispatch, password } = this.props;
        const info = Cookies.get('accout');
        if (info) {
            try {
                const res = JSON.parse(info);
                const { name: username, isRember } = res;
                console.log(username, isRember)
                dispatch(lgSetLoginInfo({ username, password, isRember }));
            } catch(e) {}
            
        }
    }
    
    handleSubmit = (e) => {
        const { dispatch, form: { validateFields } } = this.props;
        e.preventDefault();
        validateFields((err,values) => {
            if(!err) {
                const { userName: username, password, remember } = values;
                dispatch(lgSetLoginOption({username, password, isRember: remember}));
            }
        });
        
    }
    render() {
        if(hasLogin()) {
            return <Redirect to={'/main'} />
        }
        const { username, password, isRember, btnLoading, form: { getFieldDecorator } } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '用户名不能为空!' }],
                                initialValue: username
                            })(
                                <Input size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空' }],
                                initialValue: password
                            })(
                                <Input size={'large'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: isRember,
                            })(
                                <Checkbox>记住账号</Checkbox>
                            )}
                             <a className={styles.forgetPwd} href="">忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button loading={btnLoading} size={'large'} type="primary" htmlType="submit" className={styles.loginBtn}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.loginData.params,
    btnLoading: state.loginData.loading
});

export default connect(mapStateToProps)(Form.create()(Login));