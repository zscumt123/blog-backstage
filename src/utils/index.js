/**
 * utils
 * 
*/
import { Modal } from 'antd';
import Cookies from 'js-cookie';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const warning = Modal.warning;
const showWarnInfo = (msg) => {
    return warning({
        title: '提示信息',
        content: msg,
    });
}
const baseUrl = '/api/v1';

export async function getData(url, params = {}, method = 'GET') {
    let realUrl = baseUrl + url;
    let options = {
        method: method.toUpperCase(),
        'credentials': 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if (method.toUpperCase() === 'GET') {
        const keys = Object.keys(params).map(item => `${item}=${params[item]}`);
        let query = keys.join('&');
        if(query !== '') {
            realUrl += '?' + query
        }
    } else {
        try {
            options['body'] = JSON.stringify(params);
        } catch(e) {
            throw Error(e);
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
                    Cookies.remove('userName');
                    history.push('/login');
                } else {
                    showWarnInfo(msg);
                }
            }
        } else {
            res = {code: -1, msg: '系统错误'};
            showWarnInfo('系统错误');
        }
    } catch(e) {
        showWarnInfo('出错了~~~');
        res = {code: 1, msg: '出错了'};
    }
    return res;
}

export const hasLogin = () => {
    return !!Cookies.get('userName');
}