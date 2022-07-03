import { STATE } from './config';
import { REMINDER } from './config';
import { ocontainer } from './dom';
const axiosInstance = axios.create();
let clue = document.createElement('p');
axiosInstance.interceptors.request.use(config => {
    // 发送请求之前做的事情
    if (!STATE['FLAG']) {
        ocontainer.appendChild(clue);
        clue.innerText = `${REMINDER['LOADING']}`;
        STATE['FLAG'] = true;
    }
    return config;
}, error => {
    // 发送请求之前发生错误抛出
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(response => {
    // 响应数据回来后，对数据的操作
    if (STATE['FLAG']) {
        switch (response.data.code) {
            case 200:
                ocontainer.appendChild(clue);
                clue.innerText = `${REMINDER['SUCCESS']}`
                STATE['FLAG'] = false;
                setTimeout(() => {
                    clue.innerText = '';
                }, 1000);
                break;
            case 201:
                ocontainer.appendChild(clue);
                clue.innerText = `${REMINDER['TIP']}`
                STATE['FLAG'] = false;
                break;
        }
       
    }
    console.log('response', response)
    return response;
}, error => {
    console.log('error', error)
    return Promise.reject(error);
});
export {
    axiosInstance,
}