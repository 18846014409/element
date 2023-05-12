import http from "@/utils/request"

// 请求接口的方法会统一封装到这个api文件夹下面的文件中

//登入

/**
 * jsdoc
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {Promise} 一个promise对象
 */

export let loginApi = (username, password) => http.post('/users/login', { username, password })



//获取登入日志

export let getLoginLogApi = (page = 1, count = 5) => http.get(`/getloginlog?page=${page}&count=${count}`)