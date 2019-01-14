<template>
    <el-upload
      style="display: inline; margin-left: 10px;margin-right: 10px;"
      action="#"
      ref="fileupload"
      :show-file-list="false"
      :http-request="upLoadChange"
      :before-upload="beforeUpload">
      <el-button size="small" type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-upload>
</template>
<script>
export default {
  name: "uploadMonthlyEvents",
  data() {
    return {
        msg:'欢迎进入'
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>