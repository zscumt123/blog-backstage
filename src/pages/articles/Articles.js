import React, { Component } from 'react';
import { Button } from 'antd';
import PageLayout from '../../components/pageLayout/PageLayout';
import styles from './Articles.less';


export default class Articles extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
        };
        this.editor  = null;
    }

    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render() {
        const { text } = this.state;

        return (
                <PageLayout>
                    <Button type={'primary'} onClick={this.handleClick}>提交</Button>
                </PageLayout>

        );
    }
}