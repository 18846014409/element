<template>
  <!-- 搜索 -->
  <div class="search_name">
    <el-select class="search_name_input"
                 v-model="searchName"
                 filterable
                 clearable
                 reserve-keyword
                 remote
                 loading-text="正在加载"
                 no-match-text="搜索不到数据"
                 no-data-text="没有数据"
                 placeholder="请输入姓名，如果不更新，请点击右侧搜索按钮"
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
  <el-button class="search_icon" @click="searchList"><el-icon><Search /></el-icon></el-button>
  <el-button type="warning" round class="add_project">添加项目</el-button>
  <div class="search_class">
    选择班级：
      <el-select
                 v-model="searchClass"
                 filterable
                 clearable
                 reserve-keyword
                 remote
                 loading-text="正在加载"
                 no-match-text="搜索不到数据"
                 no-data-text="没有数据"
                 placeholder="请输入要查找的班级"
                 default-first-option
                 remote-show-suffix
                 :remote-method="handleSearch"
                 @focus="handleSearchInputFocus"
                 @change="searchChange"
                 :loading="searchLoading">
          <el-option
                     v-for="item in searchOptionsClass"
                     :key="item.class"
                     :value="item.class"/>
      </el-select>
  </div>

  <!-- 导出表格 -->
  <div class="export-excel">
      <el-button type="primary" class="excel_button"><el-icon style="color: green;font-size: 20px;"><DocumentCopy /></el-icon>&nbsp;导出excel</el-button>
  </div>
  <!-- 表格 -->
  <div class="dataTable">
      <el-table :data="stuList" border style="width: 100%" v-loading="stuTableLoading" element-loading-background="rgba(122, 122, 122, 0.3)" element-loading-text="正在加载">
          <el-table-column align="center" label="头像" width="100">
            <!-- 插槽作用域 -->
              <template #default="{ row, $index }">
                  <el-image
                            style="width: 50px; height: 50px; border-radius:8px"
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
          <el-table-column align="center" prop="cTime" label="创建时间" width="250"/>
          <el-table-column align="center" label="操作">
              <el-button type="success"><el-icon><View /></el-icon>&nbsp;查看</el-button>
              <el-button type="warning"><el-icon><EditPen /></el-icon>&nbsp;编辑</el-button>
              <el-button type="danger"><el-icon><Delete /></el-icon>&nbsp;删除</el-button>
          </el-table-column>
      </el-table>
  </div>
  <!-- 分页 -->
  <div class="pagenation">
      <el-pagination background layout="prev, pager, next" :page-size="5" @current-change="handleSizeChange" :total="pageTotal"/>
  </div>
</template>






<script setup>

import { watch } from "vue"
// 引入方法
import * as api from "@/api/stu"

// 封装姓名搜索方法
let searchList = async (key = "", isSelect = false) => {
  isSelect && (stuTableLoading.value = true)
  searchLoading.value = true;
  try {
      let res = await api.searchStuApi({ key })
      // console.log('searchlist---', res.data.data)
      searchOptions.value = Array.from(new Set(res.data.data.map(item => item.name)))
      // console.log(searchOptionsClass.value)
      console.log(res);
      searchLoading.value = false;
      isSelect && (stuList.value = res.data.data) && (stuTableLoading.value = false)
      total.value=res.total
  } catch (e) {
      // console.log(e)
      searchLoading.value = false
  }
}
// 封装班级搜索方法
let searchClassList = async (key = "", isSelect = false) => {
  isSelect && (stuTableLoading.value = true)
  searchLoading.value = true;
  try {
      let res = await api.searchStuApi({ key })
      searchOptionsClass.value=Array.from(new Set(res.data.data.map(item => item.class)))
      // console.log(res);
      searchLoading.value = false;
      isSelect && (stuList.value = res.data.data) && (stuTableLoading.value = false)
  } catch (e) {
      // console.log(e)
      searchLoading.value = false
  }
}






// 搜索
import { ref, onMounted } from "vue"

let searchClass=ref('')
let searchName = ref('')
// 搜索加载
let searchLoading = ref(false);

// 触发搜索方法
let handleSearch = (input) => {
  input && searchList(input)
}

//清除模糊搜索
let handleSearchInputFocus = () => {
  searchOptions.value = []
  searchOptionsClass.value=[]
}

let searchChange = (key) => {
  searchList(key, true)
  searchClassList(key, true)

}

// 搜索的选项数据
let searchOptions = ref([])
let searchOptionsClass=ref([])

//---------------------------------------------分割线--------------------------------------------

// 表格


// 表格加载动画
let stuTableLoading = ref(false)
// 分页总条目
let pageTotal=ref(0)
let currentPage=ref(1)

let fetchTableListParam = ref({
  page: 1,
  count: 5,
  classes: ""
})


// 分页的函数
let handleSizeChange=(pageSize)=>{
  // console.log(e);
  fetchTableListParam.value.page=pageSize
  getStuList()
}



// 请求表格数据
let stuList = ref([]) 
let getStuList = async (params=fetchTableListParam.value) => {
  let {page,count,classes}=params
  stuTableLoading.value = true;
  try {
      let res = await api.getStuListApi(page,count,classes)
      stuList.value = res.data.data
      stuTableLoading.value = false

      pageTotal.value=res.data.total
  } catch (e) {
      stuTableLoading = false
  }
}
// getStuList()


//---------------------------------------------分割线--------------------------------------------

// 预览图片的列表
let previewImgList = ref([])

//监听stuList的变化,生成图片预览列表数据

watch(stuList, (newVal) => {
  previewImgList.value = newVal.map(item => item.headimgurl ? item.headimgurl : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
  // console.log(previewImgList)
})

onMounted(() => {
  //获取表格
  getStuList(fetchTableListParam)
})

//---------------------------------------------分割线--------------------------------------------
// 分页


</script>











<style scoped>

/* 面包屑 */
.el-breadcrumb{
  margin: 20px 0 30px 0;
}
/* 表格 */
.search .el-select :deep(.el-input__wrapper) {
  width: 200px;
}
.export-excel{
float: right;
margin-bottom: 10px;
}
.excel_button{
  background-color: #fff!important;
  color: black!important;
  border: 1px solid #dcdfe6;
}
/* 搜索 */
.search_class{
  margin-bottom: 30px;
}
.search_name{
  display: inline-block;
  margin-bottom: 30px;
}
.search_name_input{
  width: 320px;
}
.search_icon{
  background-color: #fde4c5;
  line-height: 1;
  text-align: center;
  color: #ff8c00;
  font-weight: 900;
  cursor: pointer;
  width: 40px;
  height: 32px;
  border: none;
  border-radius: 5px;
  margin-right: 20px;
}
/* 分页 */
.pagenation{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

</style>