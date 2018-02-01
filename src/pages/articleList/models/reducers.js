import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { generateReducer } from '../../../utils';

const initState = {
    loading: false,
    data: {
        data: [],
        pageNum: 1,
        total: 0,
    }
}
const tableReducer = generateReducer('AL', initState);

export default combineReducers({
    tableData: tableReducer
});
