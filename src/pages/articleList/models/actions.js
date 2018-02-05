import { createActions } from 'redux-actions';


export const AL_SET_TABLE_LOADING = 'AL_SET_TABLE_LOADING';
export const AL_SET_TABLE_DATA = 'AL_SET_TABLE_DATA';
export const AL_GET_TABLE_DATA = 'AL_GET_TABLE_DATA';
export const AL_GET_CATEGORY_DATA = 'AL_GET_CATEGORY_DATA';
export const AL_SET_CATEGORY_DATA = 'AL_SET_CATEGORY_DATA';
export const AL_DEL_TABLE_DATA = 'AL_DEL_TABLE_DATA';

const {
    alSetTableLoading,
    alSetTableData,
    alGetTableData,
    alGetCategoryData,
    alSetCategoryData,
    alDelTableData
} = createActions({
    [AL_SET_TABLE_LOADING]: option => ({ option }),
    [AL_SET_TABLE_DATA]: data => ({ data }),
    [AL_GET_TABLE_DATA]: params => ({ params }),
    [AL_GET_CATEGORY_DATA]: () => ({}),
    [AL_SET_CATEGORY_DATA]: data => ({ data }),
    [AL_DEL_TABLE_DATA]: data => ({ data })
});

export {
    alSetTableData,
    alSetTableLoading,
    alGetTableData,
    alSetCategoryData,
    alGetCategoryData,
    alDelTableData
}