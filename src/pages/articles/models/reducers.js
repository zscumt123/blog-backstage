import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { arSetCategoryData, arSetFormParams } from './actions';

const initFormState = {
    categoryData: [],
    title: '',
    category: ''
};

const formReducer = handleActions({
    [arSetCategoryData]: (state, action) => ({ ...state, categoryData: action.payload.data }),
    [arSetFormParams]: (state, action) => {
        const { params: { title = '', category = '' } } = action.payload;
        return ({ ...state, title, category });
    }
}, initFormState);


export default combineReducers({
    formData: formReducer,
});
