<template>
  <!-- 搜索 -->
  <div class="search">
      <el-select
                 v-model="searchText"
                 filterable
                 clearable
                 reserve-keyword
                 remote
                 loading-text="正在加载"
                 no-match-text="搜索不到数据"
                 no-data-text="没有数据"
                 placeholder="输入要查找的名字"
                 default-first-option
                 :remote-method="handleSearch"
                 @focus="handleSearchInputFocus"
                 @change="searchChange"
                 :loading="searchLoading">
          <el-option
                     v-for="item in searchOptions"
                     :key="item"
                     :value="item" />
      </el-select>
  </div>
  <!-- 导出表格 -->
  <div class="export-excel">
      <el-button type="primary">导出excel</el-button>
  </div>
  <!-- 表格 -->
  <div class="dataTable">
      <el-table :data="stuList" border style="width: 100%"
                element-loading-background="rgba(122, 122, 122, 0.3)"
                element-loading-text="正在加载"
                v-loading="stuTableLoading">
          <el-table-column align="center" label="头像" width="100">
            <!-- 插槽作用域 -->
              <template #default="{ row, $index }">
                  <el-image
                            style="width: 70px; height: 70px"
                            :src="previewImgList[$index]"
                            :zoom-rate="1.2"
                            :preview-src-list="previewImgList"
                            :initial-index="$index"
                            fit="cover" /> 
              </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="100" />
          <el-table-column align="center" prop="class" label="班级" width="100"/>
          <el-table-column align="center" prop="degree" label="学历" width="100"/>
          <el-table-column align="center" prop="productUrl" label="项目" width="100"/>
          <el-table-column align="center" prop="cTime" label="创建时间" />
          <el-table-column align="center" label="操作">
              <el-button>查看</el-button>
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
          </el-table-column>
      </el-table>
  </div>
  <!-- 分页 -->
  <div class="pagenation">
      <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>
<script setup>

import { watch } from "vue"

import * as api from "@/api/stu"

let searchList = async (key = "", isSelect = false) => {
  isSelect && (stuTableLoading.value = true)
  searchLoading.value = true;
  try {
      let res = await api.searchStuApi({ key })
      console.log('searchlist---', res.data.data)
      searchOptions.value = Array.from(new Set(res.data.data.map(item => item.name)))
      searchLoading.value = false;
      isSelect && (stuList.value = res.data.data) && (stuTableLoading.value = false)
  } catch (e) {
      console.log(e)
      searchLoading.value = false
  }
}

// 搜索
import { ref, onMounted } from "vue"

let searchText = ref('')

let handleSearch = (input) => {

  input && searchList(input)
}

//模糊搜索
let handleSearchInputFocus = () => {
  searchOptions.value = []
}

const searchChange = (key) => {
  searchList(key, true)
}

const searchLoading = ref(false);

const searchOptions = ref([])

// 表格

let fetchTableListParam = {
  page: 1,
  count: 10,
  class: ""
}
let stuTableLoading = ref(false)

const getStuList = async (param) => {
  stuTableLoading.value = true;
  try {
      let res = await api.getStuListApi(param)
      stuList.value = res.data.data
      stuTableLoading.value = false
  } catch (e) {
      stuTableLoading = false
  }
}
const stuList = ref([])

// 预览图片的列表

let previewImgList = ref([])

//监听stuList的变化,生成图片预览列表数据

watch(stuList, (newVal) => {
  previewImgList.value = newVal.map(item => item.headimgurl ? item.headimgurl : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
  console.log(previewImgList)
})


//钩子,在组件加载之后要处理的业务

onMounted(() => {
  //获取表格
  getStuList(fetchTableListParam)
})
</script>

<style scoped>
.search .el-select :deep(.el-input__wrapper) {
  width: 300px;
}
</style>