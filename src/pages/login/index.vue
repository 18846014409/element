<template>
    <div class="login-container">
        <div class="title">
            WELCOME
        </div>
        <el-form
                 ref="loginFormRef"
                 :model="loginForm"
                 status-icon
                 :rules="rules"
                 label-width="120px"
                 class="login-loginForm">

            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input
                          v-model="loginForm.password"
                          type="password"
                          autocomplete="off" />
            </el-form-item>

            <el-form-item label="验证码" prop="captcha">
                <el-input v-model.number="loginForm.captcha" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
    <video src="../../assets/video/1.mp4" autoplay muted loop></video>
</template>

<style scoped>
.title{
    color: #fff;
    font-weight: 900;
    font-size: 34px;
    text-align: center;
    margin-bottom: 20px;
}
video{
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
:deep(.el-form-item__label){
    color: white;
    font-weight: 900;
}
.login-loginForm .el-input {
    width: 200px;
    padding-bottom: 10px;
    border-radius: 40px;
}
.login-container{
    z-index: 1;
    position: fixed;
    left: 10%;
    bottom: 200px;
    height: 300px;
    border-radius: 30px;
    width: 400px;
    background-color: rgba(0,0,0,.2);
    padding: 50px 0 50px 0;
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 15px;
    width: 200px;
    height: 50px;
    background-color: rgba(0,0,0,.7);
}
:deep(.el-form-item__error){
    font-weight: 900;
    color: white  !important;
    padding-bottom: 20px;
}
</style>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
//创建引用
const loginFormRef = ref()

//表单规则校验的函数

const validateUsername = (rule, value, callback) => {
    // vaule就是对应输入框的输入值
    //callback 如果我们想让验证不通过,就往callback中传递参数,如果通过就不传递参数
    // console.log(value)

    //包含大小写字母 下划线 中划线 数字 3-16为
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

//注入到表单中的数据
const loginForm = reactive({
    username: '',
    password: '',
    captcha: '',
})
//表单的验证规则对象
const rules = reactive({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})

//表单提交的时候触发的方法
const submitForm = (formEl) => {
    //formEl就是form组件的引用
    if (!formEl) return

    formEl.validate((valid) => {
        //用组件的时候 可以适当忽略逻辑的实现细节,只需要知道关键变量的使用就行了
        if (valid) {
            //表单校验通过

            //发起请求 验证验证码

            //验证码通过之后发起登入请求
            alert('验证通过')

        } else {
           
            //表单校验失败,啥也不干,return false就行了

            return false
        }
    })
}

</script>
  