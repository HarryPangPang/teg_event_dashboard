<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  action="http://localhost:3000/apiConsumer/uploadEventExcel"
  :on-change="handleChange"
  :file-list="fileList"
  :limit="1"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">上传excel</div>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        console.log(file, fileList);
      },
    }
  }
</script>