import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import { MainRoutes } from '../../routes/Routes';
import styles from './Main.less';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

// const allSelectKeys = ['/index', '/usermanage', '/category', '/articles/add', '/articlelist'];
// const allOpenKeys = ['/index', 'admin', 'category', 'article'];

const menuConfig = {
    '/index': ['/index'],
    'admin': ['/usermanage'],
    'category': ['/category'],
    'article': ['/articles/add', '/articlelist']
};


export default class Main extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            collapsed: false,
            openKeys: [],
            selectedKeys: []
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
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    handleSelect = ({ key }) => {
        this.setState({
            selectedKeys: [key]
        });
        const { history } = this.props;
        const url = `/main${key}`;
        history.push(url);
    }
    handleOpenChange = (openKeys) =>{
        // const { openKeys } = this.state;
        const latestOpenKeyIndex = openKeys.findIndex(key => this.state.openKeys.indexOf(key) === -1);
        if(latestOpenKeyIndex !== -1) {
            this.setState({
                openKeys: this.state.openKeys.concat(openKeys[latestOpenKeyIndex])
            });
        } else {
            let copyOpenKeys = [...this.state.openKeys];
            copyOpenKeys.splice(latestOpenKeyIndex, 1);
            this.setState({
                openKeys: copyOpenKeys
            })

        }
    }

    render() {
        const { selectedKeys, openKeys } = this.state;
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
                    <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={this.handleOpenChange}  onSelect={this.handleSelect}>
                        <Menu.Item key="/index">
                            <Icon type="home" />
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu key="admin" title={<span><Icon type="user" /><span>用户页</span></span>}>
                            <Menu.Item key="/usermanage">用户管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="category" title={<span><Icon type="wallet" /><span>分类页</span></span>}>
                            <Menu.Item key="/category">分类管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="article" title={<span><Icon type="book" /><span>文章页</span></span>}>
                            <Menu.Item key="/articles/add">新增文章</Menu.Item>
                            <Menu.Item key="/articlelist">文章列表</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className={styles.rightContainer}>
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
                    <Content className={styles.content}>
                        <MainRoutes/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
    componentWillMount(){
        const { location: { pathname } } = this.props;
        console.log(pathname);
        for (let key in menuConfig) {
            let item = menuConfig[key];
            const selectKey = item.find(val => pathname.indexOf(val) !== -1);
            if(selectKey) {
                console.log(item, selectKey)
                this.setState({
                    openKeys: [key],
                    selectedKeys: [selectKey]
                })
            }
        }
    }

}