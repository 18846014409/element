<template>
    <fieldset>
        <legend>home页面</legend>

        <header>
            <h3>
                <img :src="headimgurl" width="50" alt="">
                用户名:{{ nickname }}
            </h3>
            <button @click="quit">退出登入</button>
        </header>

        <router-link to="/discover">发现</router-link>
        |
        <router-link to="/friends/123">朋友</router-link>

        <router-view></router-view>
    </fieldset>
</template>

<script setup>
// 从pinia中获取userInfo
import useUser from "../../store/users"

import { storeToRefs } from "pinia"

//引入路由组合式api

import { useRouter } from "vue-router"

let router = useRouter()

let userStore = useUser();

//嵌套解构
let { userInfo: { value: { value: { nickname, headimgurl } } } } = storeToRefs(userStore)
// console.log(userInfo)
console.log(nickname)

//退出登入

let quit = () => {

    //清除token
    sessionStorage.removeItem('tk')

    //跳转到登入页
    router.push('/login')
}

</script>