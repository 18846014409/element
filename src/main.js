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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/styles/common.css'
//引入全局css文件
import "@/assets/styles/el-reset.css"

let app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)

let pinia = createPinia();
// //Pinia使用持久化存储
pinia.use(piniaPluginPersistedstate);


router.beforeEach((to, from) => {

    let token = sessionStorage.getItem('tk');

    if (!token) {

        if (to.path !== "/login") {
            return {
                path: "/login"
            }
        }

    }


})

app.use(router)
app.use(pinia)



app.mount('#app')
