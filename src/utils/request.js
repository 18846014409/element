import axios from "axios"
import { ElMessageBox } from 'element-plus'

import nprogress from "nprogress"


let http = axios.create({
    baseURL: "/api",
    timeout: 1000 * 10,
})


// 身份验证
http.interceptors.request.use(config => {
    // console.log('request-interceptors---', config)
    nprogress.set(0.5)
    let token = sessionStorage.getItem('tk');

    config.headers.authorization=token

    return config
})


http.interceptors.response.use(config => {

   nprogress.done()
    // console.log(config)

    if (config.data.state) {

        return config
    } else {

        ElMessageBox.alert(config.data.msg,'提示',{
            type:'error',
            showCancelButton:false,
            confirmButtonText:'确定'
        })
        return Promise.reject(config.data.msg)
    }

})

export default http