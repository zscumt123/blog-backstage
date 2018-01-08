import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { userManageData, userManageSaga } from '../pages/userManage';
const rootReducer = combineReducers({
    userManageSaga
})

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer,applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run,
    }
}