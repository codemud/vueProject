<template>
  <el-switch v-model="state.state"
             active-color="#13ce66"
             inactive-color="#ccc"
             :active-value="0"
             :inactive-value="1"
             @change="handleSwitch">
  </el-switch>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data () {
    return {
      state: 1
    };
  },
  created () {
    this.state = this.row;
  },
  watch: {
    row (val) {
      this.state = val;
    }
  },
  methods: {
    handleSwitch () {
      this.$emit("event", this.state);
    }
  }
};
</script>
