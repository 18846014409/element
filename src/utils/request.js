import axios from "axios"

//axios的配置模式

//axiois的公共配置
let http = axios.create({
    //请求的基础地址
    baseURL: "/api",
    //请求超时设置
    timeout: 1000 * 10,
    //请求方式
    // method: 'post',
    // post请求携带参数
    // data:{....},
    //get请求传参
    // params: { key: value }
    // 请求头
    // headers: { key: value }
})


//请求拦截器

//所有的请求发送到服务器之前,都得通过这个关卡的检测,如果通过,我们就需要在函数中return config

//作用:可以在请求拦截器中给请求添加一些公共的信息(公共的请求头,公共的参数等等....)

http.interceptors.request.use(config => {
    //请求拦截器
    console.log('request-interceptors---', config)

    //携带公共的请求头authorization 传递token给后台进行校验

    let token = sessionStorage.getItem('tk');

    //把令牌交给后端进行身份验证
    // config.headers.authorization = token

    return config
})

//响应拦截器

//所有响应回来的数据,都需要通过这道关卡,如果通过,我们也需要在下面的函数中return config

//作用:获取数据,对于一些错误,进行公共ui显示和处理

//一个请求一般可以分为3个过程

//1.正在请求 (isFetching)

//2.请求成功 (fulfilld)

//3.请求失败 (fail)

http.interceptors.response.use(config => {

    //config就是响应回来的对象
    //config.data就是服务器返回来的'干货'

    console.log(config)

    if (config.data.state) {
        //当前的接口来说,state为true表示得到数据,直接通过

        return config
    } else {
        //说明返回的结果有问题

        //公共的弹窗,提示响应的错误

        alert(config.data.msg)

        //使用Promise.reject()直接抛出promise异常

        return Promise.reject(config.data.msg)
    }

})

export default http