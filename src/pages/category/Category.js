import React, { Component } from 'react';
import { connect } from 'react-redux'
import CommonTable from '../../components/commonTable/CommonTable';

const columns = [
    {
        title: '分类名称',
        dataIndex: 'category_name',
        key: 'category_name'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
    }
];

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.pageSize = 2;
    }
    handleChange = () => {

    };
    render() {
        const { loading, data, pageNum, total } = this.props;
        return (
            <div>
                <CommonTable
                    columns={columns}
                    loading={loading}
                    dataSource={data}
                    currentPage={pageNum}
                    total={total}
                    handleChange={this.handleChange}
                    pageSize={this.pageSize}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.categoryData.data,
    loading: state.categoryData.loading
});
export default connect(mapStateToProps)(Category)