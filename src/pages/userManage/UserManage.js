import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../components/pageLayout/PageLayout';

import { usGetTableData } from './models/actions';
import CommonTable from '../../components/commonTable/CommonTable';
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
        key: '_id',
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
        this.pageSize = 2;
    }
    componentDidMount() {
       const { dispatch } = this.props;
       dispatch(usGetTableData({ pageSize: this.pageSize }));
    }

    handleChange = ({ current, pageSize },filters, { field, order }) => {
        const { dispatch } = this.props;
        let params = { pageNum: current, pageSize };
        if(order) {
            params.sort = order === 'descend' ? -1 : 1;
            params.sortField = field;
        }
        dispatch(usGetTableData(params));
    }

    render() {
        const { data, pageNum, total, loading } = this.props;
        return (
            <PageLayout>
                <div>
                    <CommonTable
                        loading={loading}
                        dataSource={data}
                        columns={columns}
                        pageSize={this.pageSize}
                        total={total}
                        currentPage={pageNum}
                        handleChange={this.handleChange}
                    />
                </div>
            </PageLayout>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.userManageData.data,
    loading: state.userManageData.loading
});
export default connect(mapStateToProps)(UserManage);