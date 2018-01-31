import { handleActions, handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import {
    arSetCategoryData,
    arSetFormParams,
    AR_SET_ARTICLE_DATA,
    arSetArticleData,
    arSetArticleCurrent,
    arSetBtnLoading
} from './actions';

const initFormState = {
    categoryData: [],
    title: '',
    category: '',
    btnLoading: false,
    current: 0,
    data: ''
};


const formReducer = handleActions({
    [arSetCategoryData]: (state, action) => ({ ...state, categoryData: action.payload.data }),
    [arSetFormParams]: (state, action) => {
        const { params: { title = '', category = '' } } = action.payload;
        return ({ ...state, title, category });
    },
    [arSetArticleData]: (state, action) => ({ ...state, data: action.payload.data }),
    [arSetBtnLoading]: (state, action) => ({ ...state, btnLoading: action.payload.option }),
    [arSetArticleCurrent]: (state, action) => ({ ...state, current: action.payload.index })
}, initFormState);

// const initialArticle = {
//     data: ''
// };
//
// const articleReducer = handleAction(AR_SET_ARTICLE_DATA, (state, action) => ({
//     data: action.payload.data
// }), initialArticle);


export default combineReducers({
    formData: formReducer,
    // article: articleReducer
});
