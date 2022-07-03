import { REMINDER, PATH } from './config';
import { axiosInstance } from './https';
import { ocontainer, okeyWard, osearchBtn } from './dom';
let information = document.createElement('p');
let lastTime = null;

function getOilPrice() {
    axiosInstance.get(`${PATH['SEARCH_BASE_URL']}+${okeyWard.value}`)
        .then((response) => {
            if(response.data.code == 200){
                ocontainer.appendChild(information);
                information.innerText = response.data.trend;
            }
        })
        .catch((err) => {
            console.log('err', err);
            ocontainer.appendChild(information);
            information.innerText = `${REMINDER['WARNING']}`
        })

}
osearchBtn.addEventListener('click', () => {

    if (!okeyWard.value) {
        // console.log('-------', okeyWard.value)
        ocontainer.appendChild(information);
        information.innerText = `${REMINDER['SECURE']}`;
        setTimeout(() => {
            information.innerText = '';
        }, 1500)
    } else {
        // 节流函数
        if (!lastTime) {
            getOilPrice();
            lastTime = new Date().getTime();
        } else {
            let nowTime = new Date().getTime();
            if (nowTime - lastTime > 3000) {
                information.innerText = '';
                getOilPrice();
                lastTime = new Date().getTime();
            }
        }
    }

})
