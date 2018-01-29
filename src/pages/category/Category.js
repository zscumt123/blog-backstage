import React, { Component } from 'react';
import { Icon, Button, Modal } from 'antd';
import { connect } from 'react-redux'

import CommonTable from '../../components/commonTable/CommonTable';
import CategoryModal from './categoryModal/CategoryModal';

import { caGetTableData, caSetModalOption, caDelTableData } from './models/actions';
import styles from './Category.less';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: {}
        };

        this.pageSize = 10;
        const _this = this;
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'category_name',
                key: 'category_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_date',
                key: 'create_date'
            },
            {
                title: '文章数量',
                dataIndex: 'article_count',
                key: 'article_count',
            },
            {
                title: '操作',
                key: '_id',
                render(text, record) {
                    return (
                        <div className={styles.operate}>
                            <span onClick={() => _this.handleEdit(record)}><Icon type="edit" /></span>
                            <span onClick={() => _this.handleDel(record)}><Icon type="delete"/></span>
                        </div>
                    );
                }
            }
        ];
    }


    handleEdit = (record) => {
        console.log(record)
        const { dispatch } = this.props;
        this.setState({ field: record });
        dispatch(caSetModalOption({ visible: true, isAdd: false }));
    };
    handleDel = (record) => {
        const { dispatch } = this.props;
        const { _id: id } = record;
        Modal.confirm({
            title: '提示信息',
            content: '确定要删除吗？',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(caDelTableData({ id }));
            },
        });
    };
    handleChange = () => {

    };
    addCategory = () => {
        const { dispatch } = this.props;
        this.setState({ field: {} });
        dispatch(caSetModalOption({ visible: true, isAdd: true }));
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(caGetTableData({}));
    }

    render() {
        const { loading, data, } = this.props;
        const { field } = this.state;
        return (
            <div className={styles.categoryWrapper}>
                <div className={styles.btnWrapper}>
                    <Button
                        className={styles.addBtn}
                        onClick={this.addCategory}
                        loading={false}
                        icon={'plus-circle-o'}
                        type={'primary'}
                    >
                        新建
                    </Button>
                </div>
                <CommonTable
                    columns={this.columns}
                    loading={loading}
                    dataSource={data}
                    currentPage={1}
                    total={0}
                    handleChange={this.handleChange}
                    pageSize={this.pageSize}
                />
                <CategoryModal field={field}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    // ...state.categoryData.data,
    data: state.categoryData.tableData.data,
    loading: state.categoryData.tableData.loading
});
export default connect(mapStateToProps)(Category)