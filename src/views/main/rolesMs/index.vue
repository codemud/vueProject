<template>
  <div class="bannerMs">
    <el-card class="box-card">
      <el-form :inline="true"
               :model="search"
               class="demo-form-inline">
        <el-form-item label="角色名称：">
          <el-input v-model="search.keyword"
                    placeholder="请输入角色名称"
                    @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
        </el-form-item>
        <el-form-item class="float_right">
          <el-button type="primary"
                     @click="pagination.currentPage=1;initData()">查询</el-button>
          <el-button @click="search = {}">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 icon="el-icon-plus"
                 class="margintop_20"
                 @click="handleAdd">新建</el-button>
    </el-card>

    <el-card class="box-card">
      <Table :data="data"
             :list="list"
             :pagination="pagination"
             @change="changePagine"
             @delmore="handleDel">
        <!-- 状态 -->
        <template v-slot:state="scope">
          <elSwitch :row="scope.row"
                    @event="handleSwitch"></elSwitch>
        </template>
        <!-- 操作按钮 -->
        <template v-slot:operation="scope">
          <tooltip :data="{ content: '编辑', type: 'primary' }"
                   @event="handleEdit(scope.row)" />
          <tooltip :data="{ content: '删除', type: 'danger' }"
                   @event="handleDel(scope.row)"></tooltip>
        </template>
      </Table>
    </el-card>

    <operation :ruleForm="ruleForm"
               @event="handleForm"></operation>
  </div>
</template>
<script>
import Table from "@/components/table";
import tooltip from "@/components/tooltip";
import operation from "./components/operation";
import API from "@/api/rolesMs";
import elSwitch from "@/components/switch";
export default {
  name: "rolesMs",
  components: {
    Table,
    tooltip,
    operation,
    elSwitch
  },
  data () {
    return {
      ruleForm: {},
      search: {},
      data: [
        { prop: "name", label: "角色名称", showTooltip: true },
        { prop: "remark", label: "描述", showTooltip: true },
        { prop: "state", label: "状态" },
        { prop: "operation", label: "操作" }
      ],
      list: [],
      pagination: {
        total: 0, // 总条数
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示10条数据
        selection: true
      }
    };
  },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      let data = {
        ...this.search,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      };
      API.getList(data).then(response => {
        let res = response.data;
        if (res) {
          this.pagination.total = res.total;
          this.list = res.list;
          if (this.list.length <= 0 && this.pagination.currentPage > 1) {
            this.pagination.currentPage--
            this.initData()
          }
        }
      });
    },
    changePagine (val) {
      this.pagination.currentPage = val.currentPage;
      this.pagination.pageSize = val.pageSize;
      this.initData();
    },
    handleSwitch (val) {
      API.updateState(val.state, val.id);
    },
    handleForm (callback) {
      this.ruleForm.loading = true;
      if (this.ruleForm.title === "新建") {
        API.create(this.ruleForm).then(() => {
          this.initData();
        }).finally(() => {
          callback()
          this.ruleForm.loading = false;
          this.ruleForm.visible = false;
        });
      } else {
        API.update(this.ruleForm).then(() => {
          this.initData();
        }).finally(() => {
          callback()
          this.ruleForm.loading = false;
          this.ruleForm.visible = false;
        });
      }
    },
    handleEdit (row) {
      this.ruleForm = {
        visible: true,
        title: "编辑",
        loading: false,
        ...row
      };
    },
    handleAdd () {
      this.ruleForm = {
        visible: true,
        title: "新建",
        loading: false,
        auths: [],
        state: 0
      };
    },
    handleDel (row) {
      let tips = ""
      let colum = undefined
      if (row.length > 0) {
        colum = row
        tips = `此操作将永久删除这${row.length}条数据, 是否继续?`
      } else {
        colum = [row.id]
        tips = "此操作将永久删除, 是否继续?"
      }
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API.delete(colum).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功!");
              this.initData();
            }
          });
        })
        .catch(() => { });
    }
  }
};
</script>
