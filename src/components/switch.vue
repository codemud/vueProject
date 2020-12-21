<template>
  <el-switch v-model="state[data.prop]"
             active-color="#13ce66"
             inactive-color="#ccc"
             :disabled="data.disabled"
             :active-value="data.activeValue || 0"
             :inactive-value="data.inactiveValue || 1"
             @change="handleSwitch">
  </el-switch>
</template>
<script>
export default {
  props: {
    row: Object,
    data:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  data () {
    return {
      state: 0
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
      this.$emit("event",this.data, this.state);
    }
  }
};
</script>
