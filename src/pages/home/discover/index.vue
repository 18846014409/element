<template>
    <fieldset>
        <legend>发现</legend>
        <h1>什么也没有...</h1>
    </fieldset>
</template>
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router"

import axios from "axios"

// 组合式中 组件只能访问到两个路由的钩子 beforeRouteLave beforeRouteUpdate 在组合式中使用的话加上on就行了


// onBeforeRouteLeave((to, from) => {
//     console.log('leave--to', to)
//     console.log('leave--from', from)
// })


//发送一个简单的get请求

// axios.get('url',config)

// axios.get('/api/data/index.json')
//     .then(res => {
//         console.log(res)
//     })

//get请求携带参数,query参数直接携带在请求地址后面就行了

//get请求携带请求头直接在第二个参数的字段中添加就可以了

axios.get('/api/weather/getWeather?count=3', {
    headers: {
        'aaa': 'efgh',
        'cbd': 'efg'
    }

})
    .then(res => {
        console.log(res)
    })


//axios post请求
//请求体传递给第二个参数
//第三个参数是配置项
//axios.post('url',data,config)
axios.post('/api/users/login', {
    username: 'lbw',
    password: '555'
}, {
    //请求头
    headers: {
        'content-type': 'balablabalabala'
    }
}).then(res => {
    console.log(res)
})


</script>