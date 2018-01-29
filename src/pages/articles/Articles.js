import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Steps,Form, Select, Input } from 'antd';
import PageLayout from '../../components/pageLayout/PageLayout';
import Editor from '../../components/editor/Editor';
import styles from './Articles.less';
import { arGetCategoryData, arSetFormParams } from './models/actions';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

class Articles extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
        };
        this.editor  = null;
    }

    renderContent = () => {
        const { match: { params: { id } }, form: { getFieldDecorator }, formData: { categoryData, category, title } } = this.props;
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
                                    initialValue: title
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
                return (
                    <div>
                        <Editor onChange={this.editorChange}/>
                        <Button type={'primary'} onClick={this.toPrevStep}>上一步</Button>
                    </div>
                );
            case 'finish':
                return (
                    <div>finish</div>
                );
            default:
                return null;
        }

    }
    toPrevStep = () => {
        const { history: { go } } = this.props;
        go(-1);
    }
    toNextStep = () => {
        const { history: { push }, match: { path }, form: { getFieldsValue }, dispatch}  = this.props;
        dispatch(arSetFormParams(getFieldsValue()));
        let nextPath = path.replace(/:\w*\?$/, '');
        push(`${nextPath}content`);

    }
    editorChange = (val) => {
        console.log(val);
    }


    componentWillMount() {
        const { location: { pathname }, match: { params }, history: { push } } = this.props;
        if(!params.id) {
            push(`${pathname}/add`);
        }

    }

    componentDidMount() {
        const { dispatch, formData } = this.props;
        console.log(formData);
        dispatch(arGetCategoryData({}));
    }
    componentDidUpdate(prevProps, prevState) {
        const { formData: { category: prevCategory, title: prevTitle } } = prevProps;
        const { formData: { category, title },form: { setFieldsValue } } = this.props;
        if (category !== prevCategory || title !== prevTitle) {
            setFieldsValue({
                title,
                category,
            })
        }
    }
    render() {
        const { location: { pathname }, match, form: { getFieldDecorator } } = this.props;

        return (
                <PageLayout>
                    <div  className={styles.step}>
                        <Steps current={0}>
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
    formData: state.articleData.formData,
});
export default connect(mapStateToProps)(Form.create()(Articles));
