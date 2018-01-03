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
        key: '_id'
    },
    {
        title: '创建时间',
        dataIndex: 'create_Date',
        key: 'create_Date'
    },
    {
        title: '修改时间',
        dataIndex: 'update_Date',
        key: 'update_Date'
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
            const data = res.data ? res.data.data : {}
            this.setState({
                dataSource: data,
                loading: false,
                pagination: {
                    ...this.state.pagination,
                    current: res.data.pageNum || 1,
                    total: res.data.total || 0,
                }
            })
        })
    }
    handleChange = ({ current, pageSize }) => {
        this.getPageData({ pageNum: current, pageSize });
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