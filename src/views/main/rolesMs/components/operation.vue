<template>
  <Dialog :dialog="{
      title: ruleForm.title,
      visible: ruleForm.visible,
      width: '600px',
      loading: ruleForm.loading
    }"
          @events="handleDialog">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="bo_form specialMs">
      <el-form-item label="角色名称："
                    prop="name">
        <el-input v-model="ruleForm.name"
                  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <div class="roleMs_power">
          <el-tree :data="powerData"
                   show-checkbox
                   node-key="id"
                   ref="tree"
                   :props="{ children: 'children', label: 'name' }">
          </el-tree>
        </div>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="请输入描述"
                  v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="状态"
                    prop="state">
        <el-switch v-model="ruleForm.state"
                   active-color="#13ce66"
                   inactive-color="#ccc"
                   :active-value="0"
                   :inactive-value="1">
        </el-switch>
      </el-form-item>
    </el-form>
  </Dialog>
</template>
<script>
import Dialog from "@/components/dialog";
import API from "@/api/rolesMs";
export default {
  components: {
    Dialog
  },
  props: {
    ruleForm: Object
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      powerData: [],
    };
  },
  created () {
    API.getAuthList().then(res => {
      this.powerData = res.data || [];
    });
  },
  watch: {
    ruleForm (val) {
      let checked = [];
      if (val.auths.length > 0) {
        val.auths.forEach(e => {
          checked.push(...e.children);
        });
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(checked);
        });
      }
    }
  },
  methods: {
    handleDialog (val) {
      if (val === "enter") {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.ruleForm.auths = this.dealArray();
            if (JSON.stringify(this.ruleForm.auths) === '{}') {
              this.$message.warning("请选择权限哟~")
            } else {
              this.$emit("event", () => {
                this.$refs.tree.setCheckedKeys([])
              })
            }


          } else {
            return false;
          }
        });
      } else {
        this.ruleForm.visible = false;
        this.$refs.tree.setCheckedKeys([])
      }
    },
    dealArray () {
      const leaf = this.$refs.tree;
      const checkedNodes = leaf
        .getHalfCheckedNodes()
        .concat(leaf.getCheckedNodes());
      const checkedParam = {};
      if (checkedNodes.length > 0) {
        checkedNodes.forEach(item => {
          if (item.children.length > 0) {
            checkedParam[item.id] = [];
          } else {
            checkedParam[item.id.split("_")[0]].push(item.id);
          }
        });
      }
      return checkedParam;
    }
  }
};
</script>
<style lang="scss" scope>
.roleMs_power {
  width: 200px;
  height: 286px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow-y: scroll;
  .el-tree {
    margin-top: 10px;
  }
}
</style>
