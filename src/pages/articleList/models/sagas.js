import {put, call, fork, all, take} from 'redux-saga/effects';
import {alSetTableLoading, alSetTableData, AL_GET_TABLE_DATA, AL_GET_CATEGORY_DATA, alSetCategoryData} from './actions';
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
        fork(watchGetCategoryData)
    ]);
}