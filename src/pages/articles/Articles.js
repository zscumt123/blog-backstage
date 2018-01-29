import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Button, Steps,Form, Select, Input } from 'antd';
import PageLayout from '../../components/pageLayout/PageLayout';
import styles from './Articles.less';

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
        const { match: { params: { id } }, form: { getFieldDecorator } } = this.props;
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
                                    initialValue: ''
                                })(
                                    <Input placeholder={"请输入文章标题"} />
                                )
                            }
                        </FormItem>
                        <FormItem label={"文章分类"} labelCol={{span: 5}} wrapperCol={{span:19}}>
                            {
                                getFieldDecorator('category', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value={"1"}>aaa</Option>
                                        <Option value={"2"}>bbb</Option>
                                        <Option value={"3"}>ccc</Option>
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
                    <div>content</div>
                );
            case 'finish':
                return (
                    <div>finish</div>
                );
            default:
                return null;
        }

    }
    toNextStep = () => {
        const { history: { push }, match: { path }}  = this.props;
        let nextPath = path.replace(/:\w*\?$/, '')
        push(`${nextPath}content`);

    }


    componentWillMount() {
        const { location: { pathname }, match: { params }, history: { push } } = this.props;
        if(!params.id) {
            push(`${pathname}/add`);
        }

    }

    componentDidMount() {

    }
    componentDidUpdate() {

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
export default Form.create()(Articles);
