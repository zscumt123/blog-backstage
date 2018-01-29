import { put, call, take,all, fork, select } from 'redux-saga/effects';
import { getData } from '../../../utils';
import { AR_GET_CATEGORY_DATA, arSetCategoryData, arSetFormParams } from './actions';
import API from '../../../api'

const titleSelector = state => state.articleData.formData.title;

function* getCategory(params) {
    const res = yield call(getData, API.category, params);
    if (Number(res.code) === 0) {
        let { data = [] } = res;
        data = data.map(item => ({ _id: item._id, category_name: item.category_name }));
        yield put(arSetCategoryData(data));
        if (data.length > 0) {
             const title = yield select(titleSelector);
             const category = data[0]._id;
             yield put(arSetFormParams({title, category}));
        }
    }
}

function* watchGetCategory() {
    while (true) {
        const action = yield take(AR_GET_CATEGORY_DATA);
        yield call(getCategory, action.payload.params);
    }
}

export default function* root() {
    yield all([
        fork(watchGetCategory)
    ])
}
