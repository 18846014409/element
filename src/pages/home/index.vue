<template>
    <!-- 整体 -->
    <el-container>
        <!-- 菜单 -->
        <el-aside width="200px">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                <!-- <el-radio-button :label="false">expand</el-radio-button>
                <el-radio-button :label="true">collapse</el-radio-button> -->
                <h1 class="pageLogo"></h1>
            </el-radio-group>
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
                        <!-- <template #title><span>Group One</span></template> -->
                        <el-menu-item index="1-1" class="iconfont">&#xe64d;学员项目管理</el-menu-item>
                        <el-menu-item index="1-2" class="iconfont">&#xe91c;学员资料</el-menu-item>
                        <el-menu-item index="1-3" class="iconfont">&#xe60b;学员宿舍</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group> -->
                    <!-- <el-sub-menu index="1-4">
                        <template #title><span>item four</span></template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu> -->
                </el-sub-menu>
                <el-menu-item index="3">
                    <el-icon class="iconfont">&#xe623;</el-icon>
                    <template #title>考勤管理</template>
                </el-menu-item>
                <!-- <el-menu-item index="4" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <template #title>Navigator Three</template>
                </el-menu-item> -->
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
        <!-- 右侧 -->
        <el-container>
            <!-- 导航 -->
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <p class="iconfont iconfont_fold">&#xe603;</p>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content bg-purple">登陆系统</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <!-- 头像 -->
                            <h3 class="">
                                <!-- <img :src="headimgurl" width="50" alt=""> -->
                            </h3>
                            <!-- 用户名 -->
                            <el-dropdown class="username_dropdown">
                                <span class="el-dropdown-link">
                                    用户名
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item divided>Action 1</el-dropdown-item>
                                        <el-dropdown-item divided>Action 2</el-dropdown-item>
                                        <el-dropdown-item divided>Action 3</el-dropdown-item>
                                        <el-dropdown-item divided class="iconfont">&#xe624;退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <!-- 内容 -->
            <el-main>
                <!-- 面包屑 -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: './page-header.html' }">
                        homepage
                    </el-breadcrumb-item>
                    <el-breadcrumb-item><a href="./page-header.html">route 1</a></el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 表格 -->
                <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
                    <el-table-column prop="name" label="登陆账户" />
                    <el-table-column prop="address" label="上次登陆ip" :formatter="formatter" />
                    <el-table-column prop="date" label="上次登陆时间" sortable />
                    <el-table-column prop="address" label="本次登陆ip" :formatter="formatter" />
                    <el-table-column prop="date" label="本次登陆时间" />
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>
<style src="../../../font/iconfont.css"></style>
<style>
/* 整体 */
* {
    padding: 0;
    margin: 0;
}

html,
body,
#app,
.el-menu,
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
    justify-content: center;
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
    text-align: center;
    line-height: 160px;
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
    margin-top: 10px;
}

/* 导航 */

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    /* background: #d3dce6; */
    color: #fff;
    font-size: 30px;
    font-weight: 900;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.iconfont_fold {
    font-size: 36px;
    text-align-last: left;
    cursor: pointer;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
.username_dropdown{
    color: white;
    margin-top: 20px;
}
/* 表格 */
.el-table--fit {
    margin-top: 20px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    text-align: center;
}

.el-table__cell {
    border-right: 1px solid#ebeef5 !important;
    border-bottom: 1px solid #ebeef5 !important;
}

.el-table__inner-wrapper::before {
    width: 0;
}

.el-table td.is-center,
.el-table th.is-center {
    text-align: center !important;
}

.el-table .cell {
    text-align: center;
    line-height: 40px;
}
</style>
    
    
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

// 表格
import type { TableColumnCtx } from 'element-plus'

interface User {
    date: string
    name: string
    address: string
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
    return row.address
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: '127.0.0.1',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: '175.27.248.9',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'aaaaaaaaaaa',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'bbbbbbbbb',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: '127.0.0.1',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: '175.27.248.9',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'aaaaaaaaaaa',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'bbbbbbbbb',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: '127.0.0.1',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: '175.27.248.9',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'aaaaaaaaaaa',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'bbbbbbbbb',
    },
]



// 导航
import useUser from "../../store/users"

import { storeToRefs } from "pinia"

import { useRouter } from "vue-router"

import { ArrowDown } from '@element-plus/icons-vue'

let router = useRouter()

let userStore = useUser();

let { userInfo:
    { value:
        {
            // value:
            // { nickname, headimgurl} 
        }
    }
} = storeToRefs(userStore)


let quit = () => {

    sessionStorage.removeItem('tk')

    router.push('/login')
}




</script>
