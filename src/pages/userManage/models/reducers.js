/**
 * UserManage reducers
 * 
*/
import { handleActions } from 'redux-actions';
import { usGetTableData, usSetTableLoading } from './actions';

const defaultTable = {
    data: [],
    loading: false,
}

const reducer = handleActions({
    [usGetTableData]: (state, action) => ({ ...state, data: action.payload.data }),
    [usSetTableLoading]: (state, action) => ({ ...state, loading: action.payload.option })
}, defaultTable)

export default reducer;