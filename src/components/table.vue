<template>
  <div>
    <el-table :data="list"
              row-key="id"
              lazy
              :border="pagination.border"
              :load="load"
              :tree-props="{ children: 'children', hasChildren: 'tip' }"
              :height="pagination.selection?'55vh':'56vh'"
              header-cell-class-name="table-header-style"
              cell-class-name="table-cell-style"
              @selection-change="handleSelectionChange">
      <el-table-column v-if="pagination.selection" type="selection" width="55">
      </el-table-column>
      <el-table-column v-for="d in data" :key="d.id" :label="d.label" :width="d.width || 'normal'" :align="d.align || 'center'" :show-overflow-tooltip="d.showTooltip" :sortable="d.sortable">
        <template slot-scope="scope">
          <slot :name="d.prop"
                :text="scope.row[d.prop]"
                :row="scope.row">
            <span>{{ scope.row[d.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="between margintop_20">
      <el-button v-show="pagination.selection"
                 class="delBtn"
                 type="primary"
                 @click="handleDelMore"
                 :disabled="disabled">批量删除</el-button>
      <!-- 分页组件 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagination.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    list: Array,
    pagination: Object
  },
  data () {
    return {
      delArray: [],
      disabled: true
    }
  },
  methods: {
    handleSizeChange (val) {
      // 每页显示条数改变后，被触发,val是每页显示的最新条数
      this.pagination.pageSize = val;
      this.$emit("change", {
        pageSize: val,
        currentPage: this.pagination.currentPage
      });
    },
    handleCurrentChange (val) {
      // 切换页码
      this.pagination.currentPage = val;
      this.$emit("change", {
        pageSize: this.pagination.pageSize,
        currentPage: val
      });
    },
    load (tree, treeNode, resolve) {
      this.$emit("load", tree, treeNode, resolve);
    },
    handleSelectionChange (val) {
      this.delArray = val
      this.disabled = val.length <= 0
    },
    handleDelMore () {
      let ids = []
      this.delArray.forEach(e => {
        ids.push(e.id)
      });
      this.$emit("delmore", ids)
    }
  }
};
</script>

<style lang="scss" scoped>
.table-header-style {
  text-align: center !important;
  color: #333;
}

.table-cell-style {
  /*text-align: center !important;*/
  cursor: default;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 21, 41, 0.06) !important;
}

.el-table-text {
  font-size: 18px;
  cursor: pointer;

  &:hover {
    font-size: 20px;
  }
}

.el-table-redColor {
  color: #ce1818;
}

.el-table-greenColor {
  color: #2e962e;
}
.delBtn {
  margin-left: 10px;
}
.margintop_20 {
  margin-top: 20px;
}
.color-red {
  color: #e24444;
}

.inline-block {
  display: inline-block;
}

.margin-left-10 {
  margin-left: 10px;
}
</style>
