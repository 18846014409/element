<template>
    <fieldset>
        <legend>欢迎</legend>
        <h1>欢迎</h1>
        <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </fieldset>
</template>
<script setup>
// 对接口:将后台给的接口,一个一个的写好,封装成api方法,进行调用,调试返回结果是否有问题

import { getLoginLogApi } from "@/api/users"

import { onMounted } from "vue"

onMounted(() => {
    getLoginLogApi()
        .then(res => {
            // console.log(res)
        })
})

</script>
<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>