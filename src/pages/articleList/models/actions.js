import { createActions } from 'redux-actions';


export const AL_SET_TABLE_LOADING = 'AL_SET_TABLE_LOADING';
export const AL_SET_TABLE_DATA = 'AL_SET_TABLE_DATA';
export const AL_GET_TABLE_DATA = 'AL_GET_TABLE_DATA';

const {
    alSetTableLoading,
    alSetTableData,
    alGetTableData
} = createActions({
    [AL_SET_TABLE_LOADING]: option => ({ option }),
    [AL_SET_TABLE_DATA]: data => ({ data }),
    [AL_GET_TABLE_DATA]: params => ({ params })
});

export {
    alSetTableData,
    alSetTableLoading,
    alGetTableData
}