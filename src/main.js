import { createApp } from 'vue'
//引入状态管理pinia
import { createPinia } from "pinia"
//引入路由
import router from "./router/index"
import App from './App.vue'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'nprogress/nprogress.css'


//引入全局css文件

// import "@/assets/styles/el-reset.css"

let app = createApp(App)

app.use(ElementPlus)

let pinia = createPinia();
//Pinia使用持久化存储
pinia.use(piniaPluginPersistedstate);

//路由钩子(全局前置守卫)

router.beforeEach((to, from) => {
    //to目标路由对象
    //from 源路由对象
    // console.log('to---', to)
    // console.log('from---', from)

    //返回false 终止导航 页面不加载

    // if (to.path !== '/login') {
    //     return {
    //         path: "/login"
    //     }
    // }

    //用户如果登入了,那么允许访问其他页面

    //判断sessionStorage中是否有token

    let token = sessionStorage.getItem('tk');

    if (!token) {
        //用户如果没有登入,用户访问其他页面一律跳转到登入页

        //如果访问的是登入页,什么也不做,通过就行,如果不是,那么就要跳转回登入页

        if (to.path !== "/login") {
            return {
                path: "/login"
            }
        }

    }


})

//全局后置守卫

// router.afterEach((to, from) => {
//     // console.log('after---to', to)
//     // console.log('after---from', from)
// })

//使用路由
app.use(router)
app.use(pinia)



app.mount('#app')
