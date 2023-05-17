<template>
    <el-upload
      class="avatar-uploader"
      action="/api/upload/uploadImg"
      :show-file-list="false"
      name="img"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </template>
  
  <script lang="ts" setup>


  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  
  import type { UploadProps } from 'element-plus'
  
  const imageUrl = ref('')
  
  const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
  ) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  }
  
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    let rawFileTypeArr=['image/webp','image/jpeg','image/png']
    
    if (!rawFileTypeArr.includes(rawFile.type)) {
      ElMessage.error('文件格式错误，只能是png/jpeg/webp')
      return false
    } else if (rawFile.size / 1024 / 1024 > 1) {
      ElMessage.error('上传图片不能超过 1MB!')
      return false
    }
    return true
  }
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>
  