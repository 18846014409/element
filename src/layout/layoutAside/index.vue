<template>
     
         <!-- 菜单 -->
         <el-aside width="200px">
            <h1 class="pageLogo"></h1>
            <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                    <el-icon class="iconfont">
                        &#xe616;
                    </el-icon>
                    <template #title>管理首页</template>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon class="iconfont">
                            &#xe612;
                        </el-icon>
                        <span>学员管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" class="iconfont">&#xe64d;学员项目管理</el-menu-item>
                        <el-menu-item index="1-2" class="iconfont">&#xe91c;学员资料</el-menu-item>
                        <el-menu-item index="1-3" class="iconfont">&#xe60b;学员宿舍</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item index="3">
                    <el-icon class="iconfont">&#xe623;</el-icon>
                    <template #title>考勤管理</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon class="iconfont">
                        &#xe605;
                    </el-icon>
                    <template #title>用户管理</template>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon class="iconfont">
                        &#xec66;
                    </el-icon>
                    <template #title>数据中心</template>
                </el-menu-item>
                <el-sub-menu index="6">
                    <template #title>
                        <el-icon class="iconfont">
                            &#xe688;
                        </el-icon>
                        <span>vip管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" class="iconfont">&#xe64c;vip充值</el-menu-item>
                        <el-menu-item index="1-2" class="iconfont">&#xe69d;订单管理</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>
 
</template>


<script lang="ts" setup>
// 菜单
import { ref } from 'vue'
// import {
//     Document,
//     Menu as IconMenu,
//     Location,
//     Setting,
// } from '@element-plus/icons-vue'


const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>



<style>
/* 菜单 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-radio-group {
    width: 100%;
}

.pageLogo {
    background-image: url(http://chst.vip:8081/stu2/img/logo.be8bbddf.png);
    min-height: 30px;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 40%;
    display: block;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
}
.el-radio-button__inner{
    position: absolute;
    top: -34px;
    background-color:rgba(251, 141, 24, -0.046);
    border: none;
    font-size: 30px;
    color: white;
    box-shadow: none;
    border-left: 0!important;
}
</style>