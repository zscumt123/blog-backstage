import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Steps,Form, Select, Input, Icon } from 'antd';
import PageLayout from '../../components/pageLayout/PageLayout';
import Editor from '../../components/editor/Editor';
import styles from './Articles.less';
import {
    arGetCategoryData,
    arSetFormParams,
    arSetArticleData,
    arAddArticleData,
    arSetBtnLoading,
    arSetArticleCurrent
} from './models/actions';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

class Articles extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            editValue: ''
        };
        this.editor  = null;
    }

    renderContent = () => {
        const {
            match: { params: { id } },
            form: { getFieldDecorator },
            categoryData, category, title, data,btnLoading
        } = this.props;

        if(!id) {
            return null;
        }
        switch (id) {
            case 'add':
                return (
                    <Form className={styles.formContainer}>
                        <FormItem label={"文章标题"} labelCol={{span: 5}} wrapperCol={{span:19}}>
                            {
                                getFieldDecorator('title', {
                                    initialValue: title,
                                    rules: [{ required: true, message: '标题不能为空' }]
                                })(
                                    <Input placeholder={"请输入文章标题"} />
                                )
                            }
                        </FormItem>
                        <FormItem label={"文章分类"} labelCol={{span: 5}} wrapperCol={{span:19}}>
                            {
                                getFieldDecorator('category', {
                                    initialValue: category
                                })(
                                    <Select>
                                        {
                                            categoryData.map((item, index) => <Option key={item._id} value={item._id}>{item.category_name}</Option>)
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem wrapperCol={{span: 24, offset: 5}}>
                            <Button type={'primary'} onClick={this.toNextStep}>下一步</Button>
                        </FormItem>
                    </Form>
                );
            case 'content':
                const { editValue } = this.state;
                return (
                    <div>
                        <Editor
                            defaultValue={data}
                            value={editValue}
                            onChange={this.editorChange}/>
                        <div className={styles.submitBtn}>
                            <Button type={'primary'} onClick={this.toPrevStep}>上一步</Button>
                            <Button type={'primary'} loading={btnLoading} onClick={this.handleSubmit}>提交</Button>
                        </div>
                    </div>
                );
            case 'finish':
                return (
                    <div className={styles.finishContainer}>
                        <div><Icon style={{color: '#52c41a', fontSize: '20px'}} type={'check-circle'}/></div>
                        <div>操作成功</div>
                        <div>
                            <Button type={'primary'} onClick={this.lookArticle}>查看文章</Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }

    }
    toPrevStep = () => {
        const { history: { go }, dispatch } = this.props;
        go(-1);
        dispatch(arSetArticleCurrent(0));
    }
    toNextStep = () => {
        const { history: { push }, match: { path }, form: { getFieldsValue, validateFields }, dispatch}  = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch(arSetFormParams(getFieldsValue()));
            let nextPath = path.replace(/:\w*\?$/, '');
            push(`${nextPath}content`);
            dispatch(arSetArticleCurrent(1));
        })


    }
    lookArticle = () => {
        const { history: { push } } = this.props;
        push('/main/articlelist');
    }
    editorChange = (val) => {
        // console.log(val);
        // const { dispatch } = this.props;
        // dispatch(arSetArticleData(val));
        this.setState({
            editValue: val,
        })
    }
    handleSubmit = () => {
        const {  category, title, dispatch } = this.props;
        const { editValue } = this.state;
        dispatch(arAddArticleData({ categoryId: category, title, article: editValue }));
    }

    componentWillMount() {
        const { location: { pathname }, match: { params }, history: { push }, dispatch } = this.props;
        if(!params.id) {
            push(`${pathname}/add`);
        }
        dispatch(arSetFormParams({title: '', category: ''}));
        dispatch(arSetArticleCurrent(0));

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(arGetCategoryData({}));
    }
    componentDidUpdate(prevProps, prevState) {
        const { category: prevCategory, title: prevTitle  } = prevProps;
        const { category, title, form: { setFieldsValue } } = this.props;
        if (category !== prevCategory || title !== prevTitle) {
            setFieldsValue({
                title,
                category,
            })
        }
    }
    render() {
        const { current } = this.props;

        return (
                <PageLayout>
                    <div  className={styles.step}>
                        <Steps current={current}>
                            <Step title={"输入分类内容"}/>
                            <Step title={"输入文章内容"}/>
                            <Step title={"完成"}/>
                        </Steps>
                    </div>
                    <div>
                        {this.renderContent()}
                    </div>
                </PageLayout>

        );
    }
}
const mapStateToProps = (state) => ({
    ...state.articleData.formData,
    // articleData: state.articleData.article.data,
});
export default connect(mapStateToProps)(Form.create()(Articles));
