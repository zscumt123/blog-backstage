/*
 * @Author: zs 
 * @Date: 2018-01-13 10:32:50 
 * @Last Modified by: zs
 * @Last Modified time: 2018-01-14 16:11:10
 */
import {createActions} from 'redux-actions';

export const CA_SET_TABLE_LOADING = 'CA_SET_TABLE_LOADING';
export const CA_SET_TABLE_DATA = 'CA_SET_TABLE_DATA';
export const CA_GET_TABLE_DATA = 'CA_GET_TABLE_DATA';
export const CA_ADD_TABLE_DATA = 'CA_ADD_TABLE_DATA';
export const CA_PUT_TABLE_DATA = 'CA_PUT_TABLE_DATA';
export const CA_DEL_TABLE_DATA = 'CA_DEL_TABLE_DATA';
export const CA_SET_MODAL_OPTION = 'CA_SET_MODAL_OPTION';
export const CA_SET_BTN_LOADING = 'CA_SET_BTN_LOADING';

const {
    caSetTableLoading,
    caSetTableData,
    caGetTableData,
    caAddTableData,
    caPutTableData,
    caDelTableData,
    caSetModalOption,
    caSetBtnLoading
} = createActions({
    [CA_SET_TABLE_LOADING]: option => ({ option }),
    [CA_SET_TABLE_DATA]: data => ({ data }),
    [CA_GET_TABLE_DATA]: params => ({ params }),
    [CA_ADD_TABLE_DATA]: params => ({ params }),
    [CA_PUT_TABLE_DATA]: params => ({ params }),
    [CA_DEL_TABLE_DATA]: id => ({id}),
    [CA_SET_MODAL_OPTION]: option => ({ option }),
    [CA_SET_BTN_LOADING]: option => ({ option })
});

export {
    caSetTableLoading,
    caSetTableData,
    caGetTableData,
    caAddTableData,
    caPutTableData,
    caDelTableData,
    caSetModalOption,
    caSetBtnLoading
}
