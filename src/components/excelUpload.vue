<template>
  <div class="excelUpload">
    <el-upload class="upload-demo"
               :action="action"
               multiple
               :before-upload="beforeUpload"
               :show-file-list="false"
               :on-success="onSuccess"
               :on-error="onError">
      <el-button type="success"
                 icon="el-icon-upload2">数据导入</el-button>
    </el-upload>
    <el-button class="marginleft_10"
               type="success"
               icon="el-icon-download"
               @click="handleDownload">模板下载</el-button>
  </div>
</template>
<script>
export default {
  props: ['action', 'fileName'],
  data () {
    return {
    };
  },
  methods: {
    beforeUpload (file) {
      const t = file.name.split(".")[1]
      const type = t == 'xls' || t == 'xlsx'
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!type) {
        this.$message.error('请选择excel上传哟~');
        return false;
      } else if (!isLt20M) {
        this.$message.error('文件大小不能超过5M哟');
        return false;
      }
    },
    handleDownload () {
      this.$confirm("是否下载该模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.open("/manage/excel/" + this.fileName)
        })
        .catch(() => { });
    },
    onSuccess (response) {
      if (response.code === 200) {
        this.$message.success("导入成功");
        this.$emit("on-success")
      } else {
        this.$message.error(response.message + ",请检查是否符合模板字段导入");
      }
    },
    onError (err) {
      this.$message.error(err.message);
    }
  }
};
</script>
<style lang="scss" scope>
.excelUpload {
  display: flex;
  margin-left: 10px;
  .marginleft_10 {
    margin-left: 10px;
  }
}
</style>