/**
 * @author zs
 * @date 2018/1/29
 * @description Article Actions
*/
import { createActions } from 'redux-actions';

export const AR_SET_FORM_PARAMS = 'AR_SET_FORM_PARAMS';
export const AR_GET_CATEGORY_DATA = 'AR_GET_CATEGORY_DATA';
export const AR_SET_CATEGORY_DATA = 'AR_SET_CATEGORY_DATA';
export const AR_ADD_ARTICLE_DATA = 'AR_ADD_ARTICLE_DATA';
export const AR_SET_ARTICLE_DATA = 'AR_SET_ARTICLE_DATA';
export const AR_SET_BTN_LOADING = 'AR_SET_BTN_LOADING';
export const AR_SET_ARTICLE_CURRENT = 'AR_SET_ARTICLE_CURRENT';
const {
    arSetFormParams,
    arGetCategoryData,
    arSetCategoryData,
    arAddArticleData,
    arSetArticleData,
    arSetBtnLoading,
    arSetArticleCurrent
} = createActions({
    [AR_SET_FORM_PARAMS]: params => ({ params }),
    [AR_GET_CATEGORY_DATA]: params => ({ params }),
    [AR_SET_CATEGORY_DATA]: data => ({ data }),
    [AR_ADD_ARTICLE_DATA]: params => ({ params }),
    [AR_SET_ARTICLE_DATA]: data => ({ data }),
    [AR_SET_BTN_LOADING]: option => ({ option }),
    [AR_SET_ARTICLE_CURRENT]: index => ({ index })
});

export {
    arSetFormParams,
    arGetCategoryData,
    arSetCategoryData,
    arAddArticleData,
    arSetArticleData,
    arSetBtnLoading,
    arSetArticleCurrent
}