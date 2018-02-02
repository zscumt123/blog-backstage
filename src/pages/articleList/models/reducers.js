import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import { generateReducer } from '../../../utils';
import { AL_SET_CATEGORY_DATA } from './actions';

const initState = {
    loading: false,
    data: {
        data: [],
        pageNum: 1,
        total: 0,
    }
}
const formData = {
    categoryData: []
}
const tableReducer = generateReducer('AL', initState);
const formDataReducer = handleAction(AL_SET_CATEGORY_DATA, (state, action)=> ({ ...state, categoryData: action.payload.data }), formData);

export default combineReducers({
    tableData: tableReducer,
    formData: formDataReducer
});
