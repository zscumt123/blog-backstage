import { put, all, call, fork, take } from 'redux-saga/effects';
import { getData, showSuccessModal } from '../../../utils';
import {
    caSetTableLoading,
    CA_GET_TABLE_DATA,
    CA_ADD_TABLE_DATA,
    caSetTableData,
    caSetModalOption,
    caSetBtnLoading,
    CA_PUT_TABLE_DATA,
    CA_DEL_TABLE_DATA
} from './actions';
import API from '../../../api';

function* getTableData(params) {
    yield put(caSetTableLoading(true));
    const result = yield call(getData, API.category, params);
    yield  put(caSetTableLoading(false));
    if (Number(result.code) === 0) {
         const { data = [] } = result;
         yield put(caSetTableData(data));
    }

}
function* watchGetTableData() {
    while(true) {
        const action = yield take(CA_GET_TABLE_DATA);
        yield call(getTableData, action.payload.params);
    }
}

function* addCategory(params) {
    yield put(caSetBtnLoading(true));
    const result = yield call(getData, API.category, params, 'post');
    yield put(caSetBtnLoading(false));
    if (Number(result.code) === 0) {
         yield put(caSetModalOption({ visible: false, isAdd: true }));
         showSuccessModal('添加成功');
         yield call(getTableData, {});
    }
}

function* watchAddCategory() {
    while (true) {
        const action = yield take(CA_ADD_TABLE_DATA);
        yield call(addCategory, action.payload.params);
    }
}

function* editCategory(params) {
    yield put(caSetBtnLoading(true));
    const result = yield call(getData, API.category, params, 'put');
    yield put(caSetBtnLoading(false));
    if (Number(result.code) === 0) {
        yield put(caSetModalOption({ visible: false, isAdd: true }));
        showSuccessModal('修改成功');
        yield call(getTableData, {});
    }
}
function* watchEditCategory() {
    while (true) {
        const action = yield take(CA_PUT_TABLE_DATA);
        yield call(editCategory, action.payload.params);
    }
}

function* delCategory(id) {
    const result = yield call(getData, API.category, id, 'delete');
    if (Number(result.code) === 0) {
       showSuccessModal('删除成功');
       yield call(getTableData, {});
    }
}
function* watchDelCategory() {
    while (true) {
        const action = yield take(CA_DEL_TABLE_DATA);
        yield call(delCategory, action.payload.id)
    }
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddCategory),
        fork(watchEditCategory),
        fork(watchDelCategory)
    ]);
}