<template>
  <div class="orderMs">
    <el-card class="box-card">
      <el-form :inline="true"
               :model="search"
               class="demo-form-inline">
        <div>
          <el-form-item label="订单编号：">
            <el-input class="width150"
                      v-model="search.order_no"
                      placeholder="请输入订单编号"
                      @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
          </el-form-item>
          <el-form-item label="预约人：">
            <el-input class="width150"
                      v-model="search.member_name"
                      placeholder="请输入预约人"
                      @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
          </el-form-item>
          <el-form-item label="预约医生：">
            <el-input class="width150"
                      v-model="search.doctor_name"
                      placeholder="请输入预约医生"
                      @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
          </el-form-item>
          <el-form-item label="预约医院：">
            <el-input class="width150"
                      v-model="search.hospital_name"
                      placeholder="请输入预约医院"
                      @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
          </el-form-item>
         
          
        </div>
        <div class="margintop_20">
           
          <el-form-item label="状态：">
            <el-select class="width150"
                       v-model="search.pay_status"
                       placeholder="请选择">
              <el-option v-for="(item, i) in orderStatus"
                         :key="i"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="float_right">
            <el-button type="primary"
                       @click="pagination.currentPage=1;initData()">查询</el-button>
            <el-button @click="search = { sorts: [] }">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <Table :data="data"
             :list="list"
             :pagination="pagination"
             @change="changePagine">
        
        <!--  -->
        <template v-slot:pay_status="scope">
          <span v-if="scope.text===1" style="color:#ff0000">{{getStatusText(scope.text)}}</span>
          <span v-else-if="scope.text===3" style="color:#0000ff">{{getStatusText(scope.text)}}</span>
          <span v-else>{{getStatusText(scope.text)}}</span>
        </template>
        <!-- 操作按钮 -->
        <template v-slot:operation="scope">
          <tooltip :data="{ content: '查看', type: 'primary',icon:'el-icon-search' }"
                   @event="handleSee(scope.row)" />
        </template>
      </Table>
    </el-card>
    <orderInfo :ruleForm="ruleForm"></orderInfo>
  </div>
</template>
<script>
import Table from "@/components/table";
import API from "@/api/orderMs";
import orderInfo from "./components/orderInfo";
import tooltip from "@/components/tooltip";
import {getYuYue} from "../../../utils/auth";
export default {
  name: "orderMs",
  components: {
    Table, orderInfo, tooltip
  },
  data () {
    return {
      ruleForm: {},
      search: {},
      dataPicker: [],
      orderStatus: getYuYue()?getYuYue():[],
      platformOpt: [
        { value: null, label: "全部" },
        { value: 1, label: "PC" },
        { value: 2, label: "微信公众号" },
        { value: 3, label: "微信小程序" },
        { value: 4, label: "APP" },
      ],
      data: [
        { prop: "id", label: "ID", showTooltip: true },
        { prop: "order_no", label: "订单编号", showTooltip: true },
        { prop: "member_name", label: "预约人", showTooltip: true },
        { prop: "doctor_name", label: "预约医生" },
        { prop: "hospital_name", label: "预约医院", showTooltip: true },
        { prop: "department2_name", label: "科室", showTooltip: true },
        { prop: "order_price", label: "价格", width: "150px" },
        { prop: "pay_status", label: "状态", showTooltip: true },
        { prop: "created_at", label: "创建时间", showTooltip: true },
        { prop: "operation", label: "操作" }
      ],
      list: [],
      pagination: {
        total: 0, // 总条数
        currentPage: 1, // 当前页码
        pageSize: 20 // 每页显示10条数据
      },
      sortColor: {
        close: {
          background: '#eaeaea', color: '#999', border: '1px solid #cfcfcf'
        },
        paybefore: {
          background: '#ffeded', color: '#ff4949', border: '1px solid #ffdbdb'
        },
        payafter: {
          background: '#e7faf0', color: '#13ce66', border: '1px solid #d0f5e0'
        }
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
        }
      });
    },
    changePagine (val) {
      this.pagination.currentPage = val.currentPage;
      this.pagination.pageSize = val.pageSize;
      this.initData();
    },
    getStatusText(val){
      for (let index = 0; index < this.orderStatus.length; index++) {
        const element = this.orderStatus[index];
        if(element.id === val){
          return element.name
        }
      }
      return val
    },
    handleSee (row) {
      API.getOrderDetail(row.id).then(response => {
        if (response.data) {
          this.orderDetail = response.data;
          this.ruleForm = {
            visible: true,
            title: `订单详情`,
            ...response.data
          };
        }
        
      });
      
    },
  },
};
</script>
<style lang="scss" scope>
.orderMs {
  .width150 {
    width: 150px;
  }
  .width164 {
    width: 164px;
  }
  .width375 {
    width: 375px;
  }
  .paymode {
    border-radius: 2px;
  }
}
</style>