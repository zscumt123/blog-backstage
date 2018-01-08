import { put, call, take, all, fork } from 'redux-saga/effects';
import { LG_SET_LOGIN_OPTION, lgSetBtnLoading } from './actions';
import API from '../../../api';
import { getData } from '../../../utils';
import history from '../../../utils/history';

function* loginFn(params) {
    yield put(lgSetBtnLoading(true));
    const res = yield call(getData, API.userLogin, params, 'post');
    yield put(lgSetBtnLoading(false));
    if(+res.code === 0) {
        history.push('/main');
    }
}

function* watchLoginFn() {
    while(true) {
        const action = yield take(LG_SET_LOGIN_OPTION);
        console.log(action);
        yield call(loginFn, action.payload.params);
    }
}
export default function* rootSaga() {
    yield all([
        fork(watchLoginFn)
    ])
}