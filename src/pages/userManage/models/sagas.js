import { put, call, fork, take, all } from 'redux-saga/effects';
import { US_GET_TABLE_DATA, usSetTableLoading, usSetTableData } from './actions';
import { getData } from '../../../utils';
import API from '../../../api';

function* getTableData (params) {
    yield put(usSetTableLoading(true));
    const result = yield call(getData,API.userList, params);
    yield put(usSetTableLoading(false));
    if (+result.code === 0) {
        const data = result.data;
        console.log(data)
        yield put(usSetTableData(data));
    }
}
function* watchGetTableData () {
    while(true) {
        const action = yield take(US_GET_TABLE_DATA);
        yield call(getTableData, action.payload.params);
    }
}
export default function* root() {
    yield all([
        fork(watchGetTableData)
    ]);
}