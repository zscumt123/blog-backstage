import { put, call, fork, all, take } from 'redux-saga/effects';
import { alSetTableLoading, alSetTableData, AL_GET_TABLE_DATA } from './actions';
import API from '../../../api';
import { getData } from '../../../utils';
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

export default function* root () {
    yield all([
       fork(watchGetTableData)
    ]);
}