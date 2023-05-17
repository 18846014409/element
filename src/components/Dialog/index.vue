<template>
    <el-dialog v-model="stuDialogVisible" :title="title">
        <el-form :model="form" :rules="rules">
            <el-form-item>
                <upload @transfor-imgurl="handleReceiveImgurl"></upload>
            </el-form-item>
            <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="班级" prop="class" :label-width="formLabelWidth">
                <el-input v-model="form.class" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学历" prop="degree" :label-width="formLabelWidth">
                <el-input v-model="form.degree" autocomplete="off" />
            </el-form-item>
            <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
                <el-input v-model="form.city" autocomplete="off" />
            </el-form-item>
            <el-form-item label="项目地址" prop="productUrl" :label-width="formLabelWidth">
                <el-input v-model="form.productUrl" autocomplete="off" />
            </el-form-item>
            <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off" />
            </el-form-item>


        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleDialogCancel">取消</el-button>
                <el-button type="primary" @click="handleDialogSubmit">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup>
import { reactive, ref,toRefs} from 'vue'

import upload from './Upload/index.vue'

import useStuDialog from '@/store/stuDialog'

import { storeToRefs } from 'pinia';

let emit =defineEmits('transfor-imgurl')

let handleReceiveImgurl =input =>{
    console.log(input);
}

let props = defineProps({

    actionType: {
        type: String,
        required: true,
        default() {
            return 'add'
        }
    },
    title: {
        type: String,
        required: true,
        default() {
            return '增加学员信息'
        }
    }

})

let { title,actionType } =toRefs(props)

let stuDialogStore = useStuDialog()

let { stuDialogVisible } = storeToRefs(stuDialogStore)

const dialogFormVisible = ref(true)
const formLabelWidth = '140px'

const form = reactive({
    class: '',
    name: '',
    age: '',
    city: '',
    degree: '',
    description: '',
    productUrl: '',
    headimgurl: '',
})

let rules = {
    name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
    class: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
    city: [{ required: true, message: '城市不能为空', trigger: 'blur' }],
    degree: [{ required: true, message: '学历不能为空', trigger: 'blur' }],
    age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }],
    productUrl: [{ required: true, message: '项目地址不能为空', trigger: 'blur' }],
    description: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
}

let handleDialogCancel = () => {
    stuDialogStore.stuDialogVisible = false
}

let handleDialogSubmit = () => {

}

switch(actionType){
    case "add":

    break;

    case "edit":
}

</script>



<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

:deep(.el-dialog__header) {
    text-align: center;
    font-size: 30px;
}
</style>