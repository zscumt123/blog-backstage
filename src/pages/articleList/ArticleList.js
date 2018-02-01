import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageLayout from '../../components/pageLayout/PageLayout';
import CommonTable from '../../components/commonTable/CommonTable';
import { alGetTableData } from './models/actions';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            { title: '文章标题', dataIndex: 'title', key: 'title' },
            { title: '所属分类', dataIndex: 'categoryName', key: 'categoryName' },
            { title: '创建时间', dataIndex: 'formatCreateDate', key: 'formatCreateDate' },
            { title: '更新时间', dataIndex: 'formatUpdateDate', key: 'formatUpdateDate' },
            { title:  '访问量', dataIndex: 'pageView', key: 'pageView'}
        ];
        this.pageSize = 2;
    }

    handleChange = (...args) => {

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(alGetTableData({}));
    }

    render() {
        const { data, pageNum, total, loading } = this.props;
        console.log(this.props)
        return (
            <PageLayout>
                <CommonTable
                    loading={loading}
                    dataSource={data}
                    columns={this.columns}
                    pageSize={this.pageSize}
                    currentPage={pageNum}
                    total={total}
                    handleChange={this.handleChange}
                />
            </PageLayout>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.articleListData.tableData.data,
    loading: state.articleListData.tableData.loading,
});
export default connect(mapStateToProps)(ArticleList);