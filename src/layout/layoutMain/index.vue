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

.el-radio-button__inner {
    position: absolute;
    top: -34px;
    background-color: rgba(251, 141, 24, -0.046);
    border: none;
    font-size: 30px;
    color: white;
    box-shadow: none;
    border-left: 0 !important;
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

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.username_dropdown {
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
import layoutHeader from '../layoutHeader/index.vue'
import layoutAside from '../layoutAside/index.vue'


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

</script>
