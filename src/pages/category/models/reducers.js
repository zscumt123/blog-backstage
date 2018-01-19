import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {generateReducer} from '../../../utils';
import { caSetBtnLoading,  caSetModalOption } from './actions';


const initState = {
    // data: {
    //     data: [],
    //     pageNum: 2,
    //     total: 0
    // },
    data: [],
    loading: false
};

const tableReducer = generateReducer('CA', initState);

const initModal = {
    option: {
        isAdd: true,
        visible: false
    },
    btnLoading: false
}

const modalReducer = handleActions({
    [caSetBtnLoading]: (state, action) => ({ ...state, btnLoading: action.payload.option }),
    [caSetModalOption]: (state, action) => ({ ...state, option: action.payload.option })
}, initModal);


export default combineReducers({
    tableData: tableReducer,
    modalData: modalReducer
});