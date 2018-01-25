import React, { Component } from 'react';
import Bread from '../bread/Bread';
import styles from './PageLayout.less';
import PropTypes from 'prop-types';
export default class PageLayout extends Component {

    render() {
        const { title } = this.props;
        return (
            <div className={styles.pageLayout}>
                <div className={styles.headerInfoWrapper}>
                    <Bread/>
                    <h2>{title}</h2>
                </div>
                <div className={styles.pageContent}>
                    {this.props.children}

                </div>

            </div>
        );
    }
}
PageLayout.propTypes = {
    title: PropTypes.string,
}
PageLayout.defaultProps = {
    title: ''
}