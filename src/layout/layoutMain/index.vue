<template>
    <div class="common-layout">

        <el-container>
            <!-- 菜单 -->
            <layoutAside></layoutAside>
            <el-container class="is-vertical">
                <!-- 导航 -->
                <layoutHeader></layoutHeader>
                <!-- 内容 -->
                <el-main>
                    <!-- 面包屑 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="#/stu/product">学员管理</a></el-breadcrumb-item>
                        <!-- <el-breadcrumb-item v-for="(item,index) in breadcrumblist" :key="index">{{ item.name }}</el-breadcrumb-item> -->
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style src="../../../font/iconfont.css"></style>
<style scoped>
/* 整体 */
.el-menu,
.common-layout,
.el-container {
    height: 100%;
}

.el-header,
.el-footer {
    background-color: rgba(251, 141, 24, 0.954);
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.el-aside {
    background-color: rgba(215, 117, 12, 0.954);
    color: #333;
    text-align: center;
    line-height: 34px;
    --el-aside-width: 198px !important;
    border-right: .5px solid #ebeef5;
}

.el-main {
    background-color: #fff;
    color: #333;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}


/* 面包屑 */
.el-breadcrumb {
    margin: 20px 0 30px 0;
}
</style>
    
    
<script setup>
import { watch, ref } from 'vue'
import layoutHeader from '../layoutHeader/index.vue'
import layoutAside from '../layoutAside/index.vue'

import { useRoute } from 'vue-router'
let router = useRoute()

let breadcrumblist = ref([])

let breadcrumblistMethod = () => {
    breadcrumblist.value = router.fullPath
    console.log(router.fullPath);
}


watch(router, () => {
    breadcrumblistMethod
 }, { deep: true, immediate: true })

</script>
