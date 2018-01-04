import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import { MainRoutes } from '../../routes/Routes';
import styles from './Main.less';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;



export default class Main extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            collapsed: false,
        };
        this.menu = (
            <Menu>
                <Menu.Item key="1">
                    <span><Icon type="setting" />设置</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span onClick={_this.logout}><Icon type="logout" />退出登录</span>
                </Menu.Item>
          </Menu>
        );
    }
    
     
    logout = () => {
        Cookies.remove('userName');
        this.props.history.push('/login');
        console.log('123')
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    handleSelect = ({ key, selectedKeys, item }) => {
        const { history } = this.props;
        const url = `/main${key}`;
        history.push(url);
    }
    render() {
        return (
            <Layout>
                <Sider
                trigger={null}
                collapsible
                className={styles.sider}
                collapsed={this.state.collapsed}
                >
                    <div className={styles.logo}>
                        <a href="/">
                            <Icon type="api"/>
                            <span>Manage System</span>
                        </a>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/main']} onSelect={this.handleSelect}>
                        <Menu.Item key="/index">
                            <Icon type="home" />
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu key="table" title={<span><Icon type="user" /><span>列表页</span></span>}>
                            <Menu.Item key="/usermanage">表格1</Menu.Item>
                            <Menu.Item key="/articles">表格2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Dropdown overlay={this.menu}>
                            <div className={styles.userSet}>                       
                                <Icon type="user"/>
                                <span>hahahaaaaaaaa</span>
                            </div>
                        </Dropdown>
                        
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <MainRoutes/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}