<template>
    <div class="login-container">
        <div class="title">
            WELCOME
        </div>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px"
            class="login-loginForm">

            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item label="验证码" prop="captcha">
                <el-input maxlength="5" @keydown.enter="submitForm(loginFormRef)" v-model="loginForm.captcha"
                    class="auto_code" />
                <i v-html="captcha" class="captcha" style="cursor:pointer;border:1px solid;" @click="getCaptcha"
                    v-loading="captchaLoading"></i>

            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">进入大陆</el-button>
            </el-form-item>
        </el-form>
    </div>
    <video src="@/assets/video/1.mp4" autoplay muted loop></video>
</template>

<style scoped>
.title {
    color: #fff;
    font-weight: 900;
    font-size: 34px;
    text-align: center;
    margin-bottom: 20px;
}

video {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

:deep(.el-form-item__label) {
    color: white;
    font-weight: 900;
}

.login-loginForm .el-input {
    width: 200px;
}

.login-container {
    z-index: 1;
    position: fixed;
    left: 10%;
    bottom: 200px;
    height: 300px;
    border-radius: 30px;
    width: 400px;
    background-color: rgba(0, 0, 0, .2);
    padding: 50px 0 50px 0;
}

.el-button {
    font-weight: 900;
    font-size: 18px;
    border-radius: 15px;
    width: 200px;
    height: 50px;
    background-color: rgba(0, 0, 0, .6);
    border: none;
}

:deep(.el-form-item__error) {
    font-weight: 900;
    color: white !important;
    padding-bottom: 20px;
}

.captcha {
    height: 32px;
    width: 120px;
    border-radius: 8px;
    background-color: white;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: none!important;
}

:deep(svg) {
    height: 30px;
    width: 120px;
    display: block;
}

.auto_code {
    width: 80px !important;
    --el-border-radius-base: 5px 0 0 5px;
    --el-border-color: none;
}
.el-input__wrapper{
    outline: 0 !important;
}
</style>
  
<script  setup>
import { onMounted, reactive, ref } from 'vue'
// 验证码
import * as api from '../../api/users'

import useUser from "../../store/users"
let userStore = useUser()

import { useRouter } from 'vue-router'
let router = useRouter()
import { ElLoading } from 'element-plus'

const loginFormRef = ref()


const validateUsername = (rule, value, callback) => {
    let reg = /^[a-zA-Z0-9_-]{3,16}$/

    if (reg.test(value)) {
        callback()
    } else {
        callback('大小写字母,数字,下划线,中划线,3到16位')
    }

}
const validatePassword = (rule, value, callback) => {
    if (value) {
        callback()
    } else {
        callback('!输入的密码不能为空')
    }
}

const validateCaptcha = (rule, value, callback) => {
    if (value) {
        callback()
    } else {
        callback('!输入的验证码不能为空')
    }
}

const loginForm = reactive({
    username: '',
    password: '',
    captcha: '',
})
let captcha = ref('')

const rules = reactive({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})

const submitForm = (formEl) => {
    if (!formEl) return

    formEl.validate(async (valid) => {
        if (valid) {

            // 动画
            const loading = ElLoading.service({
                lock: true,
                text: '正在登陆',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            try {
                let captchaVerify = await validateCaptchaRemote(loginForm.captcha)

                if (captchaVerify) {
                    let res = await api.loginApi(loginForm.username, loginForm.password)
                    // console.log(res);
                    let { permission, token, userInfo } = res.data

                    userStore.permission.value = permission

                    userStore.userInfo.value = userInfo

                    sessionStorage.setItem('tk', token)
                    router.push('/')
                }
                loading.close()
            } catch (e) {
                console.log(e);
                loading.close()
            }

        } else {


            return false
        }
    })
}

// 验证码加载
let captchaLoading = ref(false)

let getCaptcha = async () => {
    captchaLoading.value = true
    try {
        const res = await api.getCaptchaApi()
        // console.log(res);  
        captcha.value = res.data.img
        captchaLoading.value = false
    } catch (e) {
        console.log(e);
        captchaLoading.value = false
    }
}
let validateCaptchaRemote = async (captcha) => {
    typeof captcha === 'string' && captcha.toLowerCase()
    try {
        let res = await api.verifyCaptchaApi(captcha)
        return res.data.state//true为通过
    } catch (e) {
        console.log(e);
        return false
    }
}


onMounted(() => {
    getCaptcha()
})




</script>
  