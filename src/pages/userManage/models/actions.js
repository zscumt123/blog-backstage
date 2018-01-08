/**
 * UserManage actions
*/
import { createActions } from 'redux-actions';

export const US_GET_TABLE_DATA = 'US_GET_TABLE_DATA';
export const US_SET_TABLE_DATA = 'US_SET_TABLE_DATA';
export const US_SET_TABLE_LOADING = 'US_SET_TABLE_LOADING';

const { usGetTableData, usSetTableData, usSetTableLoading } = createActions({
    US_GET_TABLE_DATA: params => ({ params }),
    US_SET_TABLE_DATA: data => ({ data }),
    US_SET_TABLE_LOADING: option => ({ option }),
});
export { usGetTableData, usSetTableData, usSetTableLoading };
