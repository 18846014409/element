import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore('users', () => {
    //声明用户信息的state
    let userInfo = ref({})
    let permission =ref({})


    return { userInfo,permission }
}, {
    //持久存储
    persist: true
})