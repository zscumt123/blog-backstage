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
]

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <CommonTable/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.categoryData.data,
    loading: state.categoryData.loading
})
export default connect(mapStateToProps)(Category)