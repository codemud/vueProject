<template>
  <el-tooltip :content="data.content" placement="bottom">
    <el-button
      size="mini"
      :type="data.type"
      :icon="icon"
      circle
      :loading="data.loading"
      @click="handleEdit"
    ></el-button>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    data: Object
  },
  computed: {
    icon() {
      if (this.data.icon) {
        return this.data.icon;
      } else {
        return this.data.type === "primary"
          ? "el-icon-edit"
          : this.data.type === "danger"
          ? "el-icon-delete"
          : "el-icon-search";
      }
    }
  },
  methods: {
    handleEdit() {
      this.$emit("event");
    }
  }
};
</script>
<style lang="scss" scope></style>
