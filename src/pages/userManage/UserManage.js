import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { usGetTableData } from './models/actions';

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

class UserManage extends Component {
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
        this.pagination = {
            pageSize: 2,
            showQuickJumper: true,
        };
    }
    componentDidMount() {
    //     const { pageSize } = this.state.pagination;
     
    //    this.getPageData({ pageSize });
       const { pageSize } = this.pagination;
       const { dispatch } = this.props;
       dispatch(usGetTableData({ pageSize }));
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
        const { dispatch } = this.props;
        let params = { pageNum: current, pageSize };
        if(order) {
            params.sort = order === 'descend' ? -1 : 1;
            params.sortField = field;
        }
        // this.getPageData(params);
        dispatch(usGetTableData({ pageSize }));
    }
    render() {
        // const { dataSource, loading, pagination } = this.state;
        const { data, pageNum, total, loading } = this.props;
        console.log(this.props)
        return (
            <div>
                <Table 
                    onChange={this.handleChange} 
                    pagination={{ ...this.pagination, current: pageNum, total }} 
                    bordered 
                    loading={loading} 
                    columns={columns} 
                    dataSource={data} 
                    rowKey={'_id'}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.userManageData.data,
    loading: state.userManageData.loading
});
export default connect(mapStateToProps)(UserManage);