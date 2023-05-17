<template>
  <!-- 搜索 -->
  <div class="search_name">
    <el-select class="search_name_input"
                 v-model="searchText"
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
  <stuDialog :title="dialogTitle"></stuDialog>
  <el-button type="warning" round class="add_project" @click="handleAddStu">添加项目</el-button>
  <!-- <div class="search_class">
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
  </div> -->

  <!-- 导出表格 -->
  <div class="export-excel">
    <el-button @click="handleExport">
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Microsoft-Excel"></use>
          </svg>
        </template>
        <template #default>
            导出excel
        </template>
      </el-button>
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
              <el-button type="warning" @click="handleEditStu"><el-icon><EditPen /></el-icon>&nbsp;编辑</el-button>
              <el-button type="danger"><el-icon><Delete /></el-icon>&nbsp;删除</el-button>
          </el-table-column>
      </el-table>
  </div>
  <!-- 分页 -->
  <div class="pagenation">
    <el-pagination background layout="prev, pager, next" @current-change="handlePageSizeChange" :page-size="fetchTableListParam.count" :current-page="fetchTableListParam.page" :total="total" />
    </div>
</template>



<script setup>

import { ref, onMounted, watch, reactive } from "vue"
// 引入方法
import * as api from "@/api/stu"

import qee from "qf-export-excel"

import stuDialog from "@/components/Dialog/index.vue"

import usestuDialog from "@/store/stuDialog"

let stuDialogStore =usestuDialog()

let isSearch=false
// 封装姓名搜索方法
let searchList = async (key = "", isSelect = false, param = { page: 1, count: 5 }) => {
  isSearch=true
  // console.log(isSearch);




  isSelect && (stuTableLoading.value = true)
  searchLoading.value = true;
  try {
    let res = await api.searchStuApi({ key, page: param.page, count: param.count })
      // console.log('searchlist---', res.data.data)
      isSelect && (total.value = res.data.total)

      searchOptions.value = Array.from(new Set(res.data.data.map(item => item.name)))
      // console.log(searchOptionsClass.value)
      // console.log(res);
      searchLoading.value = false;
      isSelect && (stuList.value = res.data.data) && (stuTableLoading.value = false)      
  } catch (e) {
      // console.log(e)
      searchLoading.value = false
  }
}





// 封装班级搜索方法 
// let searchClassList = async (key = "") => {
 
//   isSelect && (stuTableLoading.value = true)
//   searchLoading.value = true;
//   try {
//       let res = await api.searchStuApi({ key,page:param.page,count:param.count })
//       total.value=res.data.total

//       searchOptionsClass.value=Array.from(new Set(res.data.data.map(item => item.class)))
//       // console.log(res);
//       searchLoading.value = false;
//       isSelect && (stuList.value = res.data.data) && (stuTableLoading.value = false)
//   } catch (e) {
//       // console.log(e)
//       searchLoading.value = false
//   }
// }






// 搜索
// let searchClass=ref('')
let searchText = ref('')


// 触发搜索方法
let handleSearch = (input) => {
  input && searchList(input)
}

//清除模糊搜索
let handleSearchInputFocus = () => {
    searchOptions.value = []
  // searchOptionsClass.value=[]
}

let searchChange = (key) => {
  // console.log(key);
  if(!key){
    isSearch = false;
    getStuList(fetchTableListParam)
  }else{
    fetchTableListParam.page=1
    searchList(key, true, { page: fetchTableListParam.page, count: fetchTableListParam.count })
    // searchClassList(key, true,{page:fetchTableListParam.page,count:fetchTableListParam.count})
  }

}


// 搜索加载
let searchLoading = ref(false);

// 搜索的选项数据
let searchOptions = ref([])
// let searchOptionsClass=ref([])

//---------------------------------------------分割线--------------------------------------------

// 表格
// 表格加载动画
let stuTableLoading = ref(false)

let fetchTableListParam = reactive({
  page: 1,
  count: 5,
  class: ""
})


// 请求表格数据

let getStuList = async (param) => {
  stuTableLoading.value = true;
  try {
    let res = await api.getStuListApi(param)
    stuList.value = res.data.data
    total.value = res.data.total
        stuTableLoading.value = false

  } catch (e) {
    stuTableLoading = false
  }
}
let stuList = ref([]) 
// getStuList()


//---------------------------------------------分割线--------------------------------------------

// 预览图片的列表
let previewImgList = ref([])

//监听stuList的变化,生成图片预览列表数据

watch(stuList, (newVal) => {
  previewImgList.value = newVal.map(item => item.headimgurl ? item.headimgurl : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
    // console.log(previewImgList)
})

//---------------------------------------------分割线--------------------------------------------
// 分页
// 分页总条目
let total=ref(10)
let currentPage=ref(1)




// 分页页码变化时的函数
let handlePageSizeChange = (page) => {
  // console.log(e);
  fetchTableListParam.page = page;

  if(isSearch){
    searchList(searchText.value, true, { page: fetchTableListParam.page, count: fetchTableListParam.count })
  }else{
    getStuList(fetchTableListParam)
  }
  
}

//---------------------------------------------分割线--------------------------------------------
//导出表格
let titleList =[
  {
    title:'头像',
    key:'headimgUrl'
  },
  {
    title:'姓名',
    key:'name'
  },
  {
    title:'班级',
    key:'class'
  },
  {
    title:'学历',
    key:'degree'
  },
  {
    title:'项目',
    key:'productUrl'
  },
  {
    title:'创建时间',
    key:'cTime'
  },
]

let handleExport=()=>{
  qee(titleList,stuList.value,'学员项目导出数据')
}

let dialogTitle = ref('')

// 增加学员信息
let handleAddStu=()=>{
  stuDialogStore.stuDialogVisible = true
  dialogTitle.value='增加学员信息'
}


// 编辑学员信息
let handleEditStu=()=>{
  stuDialogStore.stuDialogVisible = true
  dialogTitle.value='编辑学员信息'
}

onMounted(() => {
  //获取表格
  getStuList(fetchTableListParam)
})

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