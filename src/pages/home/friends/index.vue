<template>
    <fieldset>
        <legend>朋友</legend>
        <h1>李易峰</h1>
        <h1>李云迪</h1>
        <h1>黄海波</h1>
        <button @click="back">点击返回上一个页面</button>
    </fieldset>
</template>
<script setup>
//获取动态路由参数
//useRouter router是根路由对象,里面包含了很多路由信息和方法,也包含了route

//useRoute route是当前的路由对象,可以获取路由的参数,比如query参数 params参数等等

import { useRouter, useRoute, useLink, RouterLink } from "vue-router";

let router = useRouter()

let route = useRoute()

// console.log(router)

//获取动态路由参数

// console.log(route.params)


//编程式导航返回上一页

let back = () => {
    // router.back()
    router.go(-1)
}


let link = useLink(RouterLink.props)

// console.log(RouterLink)

// console.log(link)

</script>