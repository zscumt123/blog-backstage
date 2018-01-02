/**
 * utils
 * 
*/
import { Modal } from 'antd';
const warning = Modal.warning;
const showWarnInfo = (msg) => {
    return warning({
        title: '提示信息',
        content: msg,
    });
}
const baseUrl = '/api/v1'
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
            if(+res.code !== 0) {
                const msg = res.msg || '系统错误';
                showWarnInfo(msg);
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