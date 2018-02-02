import React, { Component } from 'react';
import { Icon, Form, Select, DatePicker, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import PageLayout from '../../components/pageLayout/PageLayout';
import CommonTable from '../../components/commonTable/CommonTable';
import { alGetTableData, alGetCategoryData } from './models/actions';
import styles from './ArticleList.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const _this = this;
        this.columns = [
            { title: '文章标题', dataIndex: 'title', key: 'title' },
            { title: '所属分类', dataIndex: 'categoryName', key: 'categoryName',width: '120px' },
            { title: '创建时间', dataIndex: 'formatCreateDate', key: 'formatCreateDate',width: '220px' },
            { title: '更新时间', dataIndex: 'formatUpdateDate', key: 'formatUpdateDate', width: '220px' },
            { title:  '访问量', dataIndex: 'pageView', key: 'pageView',width: '100px'},
            {
                title: '操作',
                dataIndex: '_id',
                key: '_id',
                render(text, record){
                    return(
                        <div className={styles.operate}>
                            <span onClick={() => _this.handleEdit(record)}><Icon style={{ fontSize:16 }} type="edit" /></span>
                            <span onClick={() => _this.handleDel(record)}><Icon style={{ fontSize:16 }} type="delete"/></span>
                        </div>
                    );
                }
            }
        ];
        this.pageSize = 10;
    }

    handleEdit = () => {

    }
    handleDel = () => {

    }
    handleChange = (args) => {
        const { dispatch } = this.props;
        const { pageSize, current: pageNum } = args;
        dispatch(alGetTableData({ pageSize, pageNum }));
    }

    handleSearch = () => {
        console.log(1223)
    }
    renderOption = () => {
        const { categoryData } = this.props;
        const data = [{ _id: '', categoryName: '不限' }].concat(categoryData);

        return data.map((item) => <Option key={item._id} value={item._id}>{item.categoryName}</Option>)
    }
    renderForm = () => {
        const { form: { getFieldDecorator } } = this.props;

        return (
            <div className={styles.searchContainer}>
                <Form layout={'inline'} onSubmit={this.handleSearch}>
                    <Row>
                        <Col span={10}>
                            <FormItem label={'文章分类'}>
                                {getFieldDecorator('category', {
                                    initialValue: ''
                                })(
                                    <Select style={{ width: 300}}>
                                        {this.renderOption()}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem label={'创建时间'}>
                                {getFieldDecorator('createTime', {
                                    initialValue: ''
                                })(
                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4} className={styles.btnWarpper}>
                            <FormItem>
                                <Button type={'primary'}>搜索</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(alGetTableData({}));
        dispatch(alGetCategoryData());
    }


    render() {
        const { data, pageNum, total, loading } = this.props;
        return (
            <PageLayout>
                {this.renderForm()}
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
    ...state.articleListData.formData
});
export default connect(mapStateToProps)(Form.create()(ArticleList));