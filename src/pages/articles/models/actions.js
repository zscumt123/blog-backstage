/**
 * @author zs
 * @date 2018/1/29
 * @description Article Actions
*/
import { createActions } from 'redux-actions';

export const AR_SET_FORM_PARAMS = 'AR_SET_FORM_PARAMS';
export const AR_GET_CATEGORY_DATA = 'AR_GET_CATEGORY_DATA';
export const AR_SET_CATEGORY_DATA = 'AR_SET_CATEGORY_DATA';

const {
    arSetFormParams,
    arGetCategoryData,
    arSetCategoryData
} = createActions({
    [AR_SET_FORM_PARAMS]: params => ({ params }),
    [AR_GET_CATEGORY_DATA]: params => ({ params }),
    [AR_SET_CATEGORY_DATA]: data => ({ data })
});

export {
    arSetFormParams,
    arGetCategoryData,
    arSetCategoryData
}