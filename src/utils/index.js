/**
 * utils
 * 
*/
import { Modal } from 'antd';
import { handleActions } from 'redux-actions';
import Cookies from 'js-cookie';
import history from './history';

const warning = Modal.warning;
const success = Modal.success;
const showWarnInfo = (msg) => {
    const modal = warning({
        title: '提示信息',
        content: msg,
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            modal && modal.destroy();
            resolve();
        },1500);
    })
    
}
const baseUrl = '/api/v1';

export async function getData(url, params = {}, method = 'GET') {
    let realUrl = baseUrl + url;
    const requestMethod = ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) === -1 ? 
        'GET' : method.toUpperCase();
    let options = {
        method: requestMethod,
        'credentials': 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    switch(requestMethod) {
        case 'POST':
        case 'PUT':
            try {
                options['body'] = JSON.stringify(params);
            } catch(e) {
                throw Error(e);
            }
            console.log('1')
            break;
        case 'DELETE':
            realUrl += `/${params['id'] || ''}`;
            console.log('2')
            break;
        case 'GET':
        default:
        console.log('3')
        const keys = Object.keys(params).map(item => `${item}=${params[item]}`);
        let query = keys.join('&');
        if(query !== '') {
            realUrl += '?' + query
        }
    }
    let response,res;
    try {
        response = await fetch(realUrl, options);
        if(response.ok && response.status === 200) {
            res = await response.json();
            const code = Number(res.code);
            if(code !== 0) {
                const msg = res.msg || '系统错误';
                if(code === 2) {
                    showWarnInfo(msg).then(() => {
                        Cookies.remove('userName');
                        history.replace('/login');
                    })
                } else {
                    showWarnInfo(msg);
                }
            }
        } else {
            res = {code: -1, msg: '系统错误'};
            showWarnInfo('系统错误');
        }
    } catch(e) {
        console.log(e);
        showWarnInfo('出错了~~~');
        res = {code: 1, msg: '出错了'};
    }
    return res;
}

export const hasLogin = () => {
    return !!Cookies.get('userName');
}

export function generateReducer(prefix, state) {
    const SET_TABLE_LOADING = prefix + '_SET_TABLE_LOADING';
    const SET_TABLE_DATA = prefix + '_SET_TABLE_DATA';
    // const GET_TABLE_DATA = prefix + '_GET_TABLE_DATA';
    
    const initState = { ...state };
    // const initState = {
    //     data: {
    //         data: [],
    //         pageNum: 2,
    //         total: 0
    //     },
    //     loading: false
    // };
    return handleActions({
        [SET_TABLE_LOADING]: (state, action) => ({ ...state, option: action.payload.option }),
        [SET_TABLE_DATA]: (state, action) => ({ ...state,  data: action.payload.data})
    }, initState);
}
export function showSuccessModal(msg) {
    const modal = success({
        title: '提示信息',
        content: msg
    });
    setTimeout(() => modal.destroy(), 1000);
}