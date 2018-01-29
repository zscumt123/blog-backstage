import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { userManageData, userManageSaga } from '../pages/userManage';
import { loginData, loginSaga } from '../pages/login';
import { categoryData, categorySaga } from '../pages/category';
import { articleSaga, articleData } from '../pages/articles';

const rootReducer = combineReducers({
    userManageData,
    loginData,
    categoryData,
    articleData
});
const rootSaga = function* () {
    yield all([
        fork(userManageSaga),
        fork(loginSaga),
        fork(categorySaga),
        fork(articleSaga)
    ])
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export { rootSaga };
export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = process.env.NODE_ENV === 'development' ? 
        composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)
    return {
        ...createStore(rootReducer,middleware),
        runSaga: sagaMiddleware.run,
    }
}