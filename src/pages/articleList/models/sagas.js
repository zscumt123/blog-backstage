import {put, call, fork, all, take} from 'redux-saga/effects';
import { showSuccessModal } from '../../../utils';
import {
    alSetTableLoading,
    alSetTableData,
    AL_GET_TABLE_DATA,
    AL_GET_CATEGORY_DATA,
    alSetCategoryData,
    AL_DEL_TABLE_DATA
} from './actions';
import API from '../../../api';
import {getData} from '../../../utils';

function* getTableData(params) {
    yield put(alSetTableLoading(true));
    const res = yield call(getData, API.article, params);
    yield put(alSetTableLoading(false));
    if (Number(res.code) === 0) {
        yield put(alSetTableData(res.data));
    }

}

function* watchGetTableData() {
    while (true) {
        const action = yield take(AL_GET_TABLE_DATA);
        yield call(getTableData, action.payload.params);
    }
}

function* delTableData(data) {
    const { id = '', params = {} } = data;
    const res = yield call(getData, API.article, { id }, 'delete');
    if (Number(res.code) === 0) {
        showSuccessModal('删除成功');
        yield call(getTableData, params);
    }
}

function* watchDelTableData() {
    while (true) {
        const action = yield take(AL_DEL_TABLE_DATA);
        yield call(delTableData, action.payload.data);
    }
}

function* getCategoryData() {
    const res = yield call(getData, API.category, {});
    if(Number(res.code) === 0) {
        const data = (res.data || []).map(item => ({ _id: item._id, categoryName: item.category_name }));
        yield put(alSetCategoryData(data));
    }
}

function* watchGetCategoryData() {
    while (true) {
        yield take(AL_GET_CATEGORY_DATA);
        yield call(getCategoryData);
    }
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetCategoryData),
        fork(watchDelTableData)
    ]);
}