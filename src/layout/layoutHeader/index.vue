<template>
        <!-- 导航 -->
        <el-header>
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-radio-group v-model="isCollapse">
                            <el-radio-button :label="!isCollapse">
                                <el-icon v-if="!isCollapse">
                                    <Fold />
                                </el-icon>
                                <el-icon v-else>
                                    <Expand />
                                </el-icon>
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple">后台系统</div>
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
        

</template>

<script setup>
import useUser from "../../store/users"

import { storeToRefs } from "pinia"

import { useRouter } from "vue-router"

import { ArrowDown } from '@element-plus/icons-vue'

import { ref } from 'vue'

// let props=defineProps(['isCollapse'])

let isCollapse = ref(false)

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



<style scoped>
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
 </style>