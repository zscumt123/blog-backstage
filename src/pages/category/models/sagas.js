import { put, all, call, fork, take } from 'redux-saga/effects';
import { getData } from '../../../utils';
import { caSetTableLoading, caGetTableData, CA_GET_TABLE_DATA } from './actions';
import API from '../../../api';

function* getTableData(params) {
    yield put(caSetTableLoading(true));
    const result = yield call(getData, API.category, params);
    console.log(result);
}
function* watchGetTableData() {
    while(true) {
        const action = yield take(CA_GET_TABLE_DATA);
        yield call(getTableData, action.payload.params);
    }
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ]);
}