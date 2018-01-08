import React, { Component } from 'react';
import { Table } from 'antd';
import { getData } from '../../utils';
import api from '../../api';
const columns = [
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '创建时间',
        dataIndex: 'create_Date',
        key: 'create_Date',
        sorter: true,
    },
    {
        title: '修改时间',
        dataIndex: 'update_Date',
        key: 'update_Date',
        sorter: true,
    },
    {
        title: '上次登录时间',
        dataIndex: 'last_time',
        key: 'last_time',
        sorter: true,
    },
    {
        title: '是否是管理员',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render(text) {
            return text ? '是' : '否';
        }
    },
    {
        title: '操作',
        render() {
            return <span>DEL</span>;
        }
    }
]

export default class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: false,
            pagination: {
                current:1,
                pageSize: 2,
                showQuickJumper: true,
                total: 0
            }
        };
    }
    componentDidMount() {
        const { pageSize } = this.state.pagination;
        this.getPageData({ pageSize });
    }
    getPageData = (obj) => {
        this.setState({
            loading: true,
        });
        getData(api.userList, obj).then((res) => {
            if(Number(res.code === 0)) {
                console.log(res);
                const data = res.data ? res.data.data : {}
                this.setState({
                    dataSource: data,
                    pagination: {
                        ...this.state.pagination,
                        current: res.data.pageNum || 1,
                        total: res.data.total || 0,
                    }
                })
            }
            this.setState({
                loading: false,
            })
            
        });
    }
    handleChange = ({ current, pageSize },filters, { field, order }) => {
        let params = {
            pageNum: current,
            pageSize
        }
        if(order) {
            params.sort = order === 'descend' ? -1 : 1;
            params.sortField = field;
        }
        this.getPageData(params);
    }
    render() {
        const { dataSource, loading, pagination } = this.state;
        return (
            <div>
                <Table 
                    onChange={this.handleChange} 
                    pagination={pagination} 
                    bordered 
                    loading={loading} 
                    columns={columns} 
                    dataSource={dataSource} 
                    rowKey={'_id'}
                />
            </div>
        );
    }
}