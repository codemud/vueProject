<template>
  <div class="bannerMs">
    <el-card class="box-card">
      <el-form :inline="true"
               :model="search"
               class="demo-form-inline">
        <el-form-item label="医院名称：">
          <el-input v-model="search.name"
                    placeholder="请输入医院名称"
                    @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
        </el-form-item>
        <el-form-item label="区域：">
          <el-select v-model="search.province_id"
                     placeholder="全部">
            <el-option v-for="(item, i) in activeArea"
                       :key="i"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级：">
          <el-select v-model="search.level"
                     placeholder="全部">
            <el-option v-for="(item, i) in hospitalLeave"
                       :key="i"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院性质：">
          <el-select v-model="search.gh_hospital_type"
                     placeholder="全部">
                     
            <el-option v-for="(item, i) in hospitalType"
                       :key="i"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="医保类型：">
          <el-select v-model="search.hi_type"
                     placeholder="全部">
            <el-option v-for="(item, i) in medicalInsuranceType"
                       :key="i"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
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
        
        <template v-slot:logo="scope">
          <el-image class="headimg"
                    :src="scope.text"> 
                    <div slot="error"></div>
          </el-image>
        </template>
        <template v-slot:level="scope">
          <span>{{getLevelText(scope.text,hospitalLeave)}}</span>
        </template>
        <template v-slot:gh_hospital_type="scope">
          <span>{{getLevelText(scope.text,hospitalType)}}</span>
        </template>
        <template v-slot:hi_type="scope">
          <span>{{getLevelText(scope.text,medicalInsuranceType)}}</span>
        </template>
        <template v-slot:type="scope">
          <span>{{getLevelText(scope.text,bdnatureList)}}</span>
        </template>
        <!-- state -->
        <template v-slot:state="scope">
          <el-switch v-model="scope.row.state"
                     active-color="#13ce66"
                     inactive-color="#ccc"
                     :active-value="1"
                     :inactive-value="0"
                     @change="handleSwitch(scope.row)">
          </el-switch>
        </template>
        <!-- 操作按钮 -->
        <template v-slot:operation="scope">
          <!-- <tooltip :data="{ content: '查看', type: 'info' }"
                   @event="handleLook(scope.row)"></tooltip>  -->
          <tooltip :data="{ content: '编辑', type: 'primary' }"
                   @event="handleEdit(scope.row)" />
          <tooltip :data="{ content: '删除', type: 'danger' }"
                   @event="handleDel(scope.row)"></tooltip>
          
        </template>
      </Table>
    </el-card>

    <operation v-if="ruleForm.visible" :ruleForm="ruleForm" :leaveList="hospitalLeave" :hospitalType="hospitalType"
                :medicalList="medicalInsuranceType" :commonState="commonState" :bdnatureList ="bdnatureList"
               @event="handleForm"></operation>
  </div>
</template>
<script>
import Table from "@/components/table";
import tooltip from "@/components/tooltip";
import operation from "./components/operation";
import API from "@/api/specialMs";
import {getLevel,getArea,getProperty,getHitype,getGhState,getState,getBdnature} from "../../../utils/auth";
export default {
  name: "specialMs",
  components: {
    Table,
    tooltip,
    operation,
  },
  data () {
    return {
      ruleForm: {
        area: {
            province: {
                name: '',
                simple: ''
            },
            city: {
                name: '',
                simple: '',
            },
            district: {
                name: '',
                simple: ''
            }
        },
        position:{lng: 116.404, lat: 39.915}
      },
      search: {},
      activeArea: getArea()?getArea():[],
      hospitalLeave:getLevel()?getLevel():[],
      hospitalType:getProperty()?getProperty():[],
      medicalInsuranceType: getHitype()?getHitype():[],
      commonState:getState()?getState():[],
      bdnatureList:getBdnature()?getBdnature():[],
      data: [
        { prop: "id", label: "序号", showTooltip: true },
        { prop: "name", label: "医院名称", showTooltip: true },
        { prop: "logo", label: "LOGO", width: "120px" },
        { prop: "address", label: "所在地区", showTooltip: true },
        // { prop: "area", label: "所在地区", showTooltip: true },
        { prop: "level", label: "医院等级", width: "120px" },
        { prop: "type", label: "医院类型" },
        { prop: "hi_type", label: "医保类型" },
        { prop: "gh_hospital_type", label: "医院性质" },
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
    getLevelText(val,list){
      if (list.length > 0) {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          if(element.id === val){
            return element.name
          }
        }
      }
      return val
    },
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
      API.update(val).then(() => {
        this.initData();
      }).finally(() => {
        this.ruleForm.visible = false;
      });
    },
    handleEdit (row) {
      this.ruleForm = {
        visible: true,
        title: "编辑",
        loading: false,
        ...row
      };
    },
    handleForm (ruleForm) {
      this.ruleForm.loading = true;
      if (ruleForm.title === "新建") {
        API.create(ruleForm).then(() => {
          this.initData();
        }).finally(() => {
          this.ruleForm.loading = false;
          this.ruleForm.visible = false;
          //
          
        });
      }else if (ruleForm.title === "查看"){
        this.ruleForm.loading = false;
        this.ruleForm.visible = false;
      } else {
        API.update(ruleForm).then(() => {
          this.initData();
        }).finally(() => {
          this.ruleForm.visible = false;
        });
      }
    },
    handleAdd () {
      this.ruleForm = {
        visible: true,
        title: "新建",
        loading: false,
        state_search: 0,
        area:{},
        position:{}
      };
    },
    handleLook (row) {
      this.ruleForm = {
        visible: true,
        title: "查看",
        loading: false,
        ...row
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
