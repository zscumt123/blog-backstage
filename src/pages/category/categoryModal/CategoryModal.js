import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import { caAddTableData, caSetModalOption, caPutTableData } from '../models/actions';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

class CategoryModal extends Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        isAdd: PropTypes.bool,
        btnLoading: PropTypes.bool,
        categoryName: PropTypes.string,
        field: PropTypes.object,
    };
    static defaultProps = {
        isAdd: true,
        btnLoading: false,
        categoryName: ''
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCancel = () => {
        const { dispatch } = this.props;
        dispatch(caSetModalOption({ visible: false, isAdd: true }));
    }
    handleOk = () => {
        const { form: { validateFields }, dispatch, field, isAdd } = this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            const { name } = values;
            const params = !isAdd ? { name, _id: field._id } : { name };
            const action = isAdd ? caAddTableData(params) : caPutTableData(params);
            dispatch(action);
        });
    }

    render() {
        const { visible, isAdd, form: { getFieldDecorator }, btnLoading } = this.props;
        return (
            <Modal
                title={`${isAdd ? '新建' : '修改'}分类`}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                confirmLoading={btnLoading}
                visible={visible}
            >
                <div>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="分类名称"
                        >
                            {getFieldDecorator('name', {
                                // initialValue: category_name,
                                rules: [
                                    {
                                        required: true, message: '分类不能为空',
                                    }
                                ],
                            })(
                                <Input placehoder={"请输入分类名称"} />
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.categoryData.modalData.option,
    btnLoading: state.categoryData.modalData.btnLoading
});
export default connect(mapStateToProps)(Form.create({
    mapPropsToFields(props){
        const { field: { category_name = '' } } = props;
        return {
            name: Form.createFormField({
                value: category_name,
            })
        };
    }
})(CategoryModal))