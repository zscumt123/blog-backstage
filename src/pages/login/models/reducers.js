import { handleActions } from 'redux-actions';
import { lgSetBtnLoading, lgSetLoginInfo } from './actions';

const defaultState = {
    params: {
        username: '',
        password: '',
        isRember: false,
    },
    loading: false
};

const reducer = handleActions({
    [lgSetBtnLoading]: (state ,action) => ({ ...state, loading: action.payload.option }),
    [lgSetLoginInfo]: (state, action) => ({ ...state, params: action.payload.params })
}, defaultState);

export default reducer;