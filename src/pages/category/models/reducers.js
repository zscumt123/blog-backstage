// import { handleActions } from 'redux-actions';
import { generateReducer } from '../../../utils';
// import { caSetTableLoading,  caSetTableData } from './actions';


const initState = {
    data: {
        data: [],
    pageNum: 2,
    total: 0
    },
    loading: false
};

const reducer = generateReducer('CA', initState);

export default reducer;