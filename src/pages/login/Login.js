import React, { Component } from 'react';
import { Form, Button, Icon, Input, Checkbox } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

class Login extends Component {


    handleSubmit = (e) => {
        const { validateFields } = this.props.form;
        e.preventDefault();
        validateFields((err,values) => {
            if(!err) {
                console.log(values);
            }
        });
        
    }
    render() {
        const { getFieldDecorator  } = this.props.form;
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '用户名不能为空!' }],
                            })(
                                <Input size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空' }],
                            })(
                                <Input size={'large'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>自动登录</Checkbox>
                            )}
                             <a className={styles.forgetPwd} href="">忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button size={'large'} type="primary" htmlType="submit" className={styles.loginBtn}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Form.create()(Login);