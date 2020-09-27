<template>
  <div class="imgUpload_many">
    <el-upload ref="upload"
               action="OSS上传路径，必填"
               list-type="picture-card"
               :before-upload="beforeUpload"
               :http-request="upLoad"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :file-list="fileList">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"
               append-to-body>
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>
<script>
import { uploadOSS } from "@/utils/oss";
export default {
  props: {
    fileLists: Array
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: this.fileLists,
    }
  },
  watch: {
    fileLists (val) {
      this.$nextTick(() => {
        this.fileList = val
      })
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.$emit("remove", fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload (file) {
      const format = file.type.split("/").shift() === 'image'
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!format) {
        this.$message.warning('图片格式不正确');
      }
      if (!isLt5M) {
        this.$message.warning('图片不能大于5M、请裁剪后上传');
      }
      return isLt5M || format;
    },
    async upLoad (event) {
      this.fileLists.push({
        name: event.file.name,
        url: await uploadOSS(event.file)
      })
    }
  }
}
</script>
<style lang="scss" scope>
.imgUpload_many {
  .el-upload-list--picture-card .el-upload-list__item,
  .el-upload--picture-card {
    width: 98px;
    height: 98px;
    line-height: 110px;
  }
  .el-icon-upload-success {
    top: 0px;
    left: 13px;
    position: absolute;
  }
  .is-ready {
    display: none;
  }
}
</style>