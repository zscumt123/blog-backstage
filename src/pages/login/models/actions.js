/*
 * @Author: zs 
 * @Date: 2018-01-08 20:13:02 
 * @Last Modified by: zs
 * @Last Modified time: 2018-01-08 23:38:58
 */
import { createActions } from 'redux-actions';

export const LG_SET_LOGIN_INFO = 'LG_SET_LOGIN_INFO';
export const LG_SET_BTN_LOADING = 'LG_SET_BTN_LOADING';
export const LG_SET_LOGIN_OPTION = 'LG_SET_LOGIN_OPTION';

const { lgSetLoginInfo, lgSetBtnLoading, lgSetLoginOption } = createActions({
    LG_SET_LOGIN_INFO: params => ({ params }),
    LG_SET_BTN_LOADING: option => ({ option }),
    LG_SET_LOGIN_OPTION: params => ({ params })
});

export { lgSetBtnLoading, lgSetLoginInfo, lgSetLoginOption };