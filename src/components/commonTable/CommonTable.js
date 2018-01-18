import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export default class CommonTable extends Component {

    static propTypes  = {
        loading: PropTypes.bool.isRequired,
        dataSource: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        pageSize: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        handleChange: PropTypes.func,
        
    }
    constructor(props) {
        super(props);
        this.pagination = {
            showQuickJumper: true,
            showTotal(total) {
                return <div>共{total}条数据</div>
            }
        }
    }
    handleChange = (...args) => {
        this.props.handleChange(...args);
    }
    render() {
        const { loading, dataSource, columns, pageSize, currentPage, total } = this.props;
        return (
            <Table 
                loading={loading} 
                dataSource={dataSource} 
                bordered
                onChange={this.handleChange}
                pagination={{ ...this.pagination, pageSize, current:currentPage, total }}
                columns={columns} 
                rowKey={'_id'}
            />
        );
    }    
}
CommonTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    handleChange: PropTypes.func,
    
}