/**
 * UserManage reducers
 * 
*/
import { handleActions } from 'redux-actions';
import { usSetTableData, usSetTableLoading } from './actions';

const defaultTable = {
    data: {
        data: [],
        pageNum: 1,
        total: 0,
    },
    loading: false,
}

const reducer = handleActions({
    [usSetTableData]: (state, action) => ({ ...state, data: action.payload.data }),
    [usSetTableLoading]: (state, action) => ({ ...state, loading: action.payload.option })
}, defaultTable)

export default reducer;