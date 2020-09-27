<template>
  <div v-dialogDrag>
    <el-dialog class="dialog"
               :title="dialog.title"
               :visible.sync="dialog.visible"
               :width="dialog.width"
               :append-to-body="dialog.inner"
               :close-on-click-modal="false"
               @close="handleClick('close')">
      <slot></slot>
      <span slot="footer"
            class="dialog-footer"
            v-show="!dialog.footHide">
        <el-button @click="handleClick('close')"
                   v-if="!dialog.hideClose">
          取 消
        </el-button>
        <el-button type="primary"
                   :loading="dialog.loading"
                   @click="handleClick('enter')"
                   v-if="!dialog.hideEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Object
  },
  watch: {
    dialog: {
      handler (val) {
        if (val.visible && val.height) {
          this.$nextTick(() => {
            let el = document.querySelector(".dialog .el-dialog__body")
            el.style.height = val.height
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClick (type) {
      this.$emit("events", type);
    },
  }
};
</script>
<style lang="scss" scope>
.el-dialog {
  margin-top: 7vh !important;
}
.el-dialog__body {
  padding: 10px 20px !important;
  // height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
  }
}
@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
  &:hover {
    animation: myfirst 1s;
  }
}
</style>
