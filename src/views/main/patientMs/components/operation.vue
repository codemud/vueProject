<template>
  <Dialog
    :dialog="{
      title: ruleForm.title,
      visible: ruleForm.visible,
      width: '600px',
      height:'500px',
      loading: ruleForm.loading
    }"
    @events="handleDialog"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="bo_form">
      <el-form-item label="患者名称" prop="realname">
        <el-input v-model="ruleForm.realname" placeholder="请输入患者名称"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择">
          <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="患者手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入患者手机号"></el-input>
      </el-form-item>

      <el-form-item label="患者身份证号" prop="id_card">
        <el-input v-model="ruleForm.id_card	" placeholder="请输入患者身份证号"></el-input>
      </el-form-item>

      <!-- <el-form-item label="认证状态"
                          prop="centerstatus">
                <el-select v-model="ruleForm.centerstatus"
                           placeholder="请选择">
                    <el-option v-for="item in statusList"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
      </el-form-item>-->

      <el-form-item label="患者生日" prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"

          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <!-- <el-input v-model="ruleForm.birthday" placeholder="请输入患者生日"></el-input> -->
      </el-form-item>

      <el-form-item>
        <span slot="label"><span class="labelred">*</span>所在地区</span>
        <div class="rowform">
          <el-select
            v-model="ruleForm.province_id"
            @change="chooseFirstArea"
            class="maginRight"
            placeholder="请选择"
          >
            <el-option
              v-for="itemSigle in areaFirstList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="ruleForm.city_id"
            @change="chooseSecondArea"
            class="maginRight"
            placeholder="请选择"
          >
            <el-option
              v-for="itemSigle in areaSecondList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="ruleForm.district_id"
            @change="chooseThreeArea"
            class="maginRight"
            placeholder="请选择"
          >
            <el-option
              v-for="itemSigle in areaThreeList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
  </Dialog>
</template>
<script>
import Dialog from "@/components/dialog";
import imgUpload from "@/components/imgUpload";
import areaData from "@/data/area.json";
import API from "@/api/specialMs";
export default {
  components: {
    Dialog,
    imgUpload,
  },
  props: {
    ruleForm: Object,
    sexList: Array,
    statusList: Array,
  },
  data() {
    let validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入患者手机号'))
      }else{
        callback()
      }
      // if (/^1[3456789]\d{9}$/.test(value)) {
      //   callback()
      // } else {
      //   callback(new Error('手机号格式不正确'))
      // }
    }
    return {
      rules: {
        realname: [{ required: true, message: "请输入患者名称", trigger: "blur" }],
        sex: [{ required: true, message: "请选择患者性别", trigger: "blur" }],
        mobile: [{ required: true,validator: validateMobile, trigger: "blur" }],
        id_card: [{ required: true, message: "请输入患者身份证号", trigger: "blur" }],
        birthday: [{ required: true, message: "请选择患者生日", trigger: "blur" }],
      },
      sort: [],
      areaFirstList: areaData,
      areaSecondList: [],
      areaThreeList: [],
    };
  },
  watch: {
    ruleForm(val) {
      this.handReadArea(this.areaFirstList)
    },
  },
  created() {
      // this.loadAreaList();
  },
  methods: {
    handReadArea(newData){
      if(this.ruleForm.title === "新建"){
        return
      }
      //开始处理区域三级
      let province_id = this.ruleForm.province_id
      let city_id = this.ruleForm.city_id
      let district_id = this.ruleForm.district_id
      for (let provinceindex = 0; provinceindex < newData.length; provinceindex++) {
        let provinceelement = newData[provinceindex];//省级
        if(provinceelement.id === province_id){
          let cityelement = provinceelement.children//
          this.areaSecondList = cityelement
          for (let cityindex = 0; cityindex < cityelement.length; cityindex++) {
            let citydo = cityelement[cityindex];
            if(citydo.id === city_id){
              this.areaThreeList = citydo.children//
            }
          }
        }
      }
    },
    chooseFirstArea(e) {
      //清空2  3 级的联动数据
      this.areaSecondList = [];
      this.areaThreeList = [];
      //联动处理二级地区
      for (let index = 0; index < this.areaFirstList.length; index++) {
        const item = this.areaFirstList[index];
        if (item.id === e) {
          this.areaSecondList = item.children;
          //设置选择的一级地区
          this.ruleForm.province_id = e;
          this.ruleForm.city_id = ""
          this.ruleForm.district_id = ""
          this.$forceUpdate();
          return;
        }
      }
    },
    chooseSecondArea(e) {
      //清空3 级的联动数据
      this.areaThreeList = [];
      //联动处理3级地区
      for (let index = 0; index < this.areaSecondList.length; index++) {
        const item = this.areaSecondList[index];
        if (item.id === e) {
          this.areaThreeList = item.children;
          //设置选择的2级地区
          this.ruleForm.city_id = e;
          this.ruleForm.district_id =""
          this.$forceUpdate();
          return;
        }
      }
    },
    chooseThreeArea(e) {
      //设置选择的3级地区
      this.ruleForm.district_id = e;
      this.$forceUpdate();
    },
    // loadAreaList() {
    //   API.getAreaList().then((res) => {
    //     if (res.code === 200) {
    //       if (res.data) {
    //         this.areaFirstList = res.data;
    //         //如果不是新建 处理三级每一级地区联动 初始化显示地区
    //       }
    //     }
    //   });
    // },
    handleDialog(val) {
      if (val === "enter") {
        if (this.ruleForm.title === "查看") {
          this.ruleForm.visible = false;
          return;
        }
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            //console.log(this.ruleForm);
            if(!this.ruleForm.province_id){
              this.$message.error('请选择省级');
              return 
            }
            if(!this.ruleForm.city_id){
              this.$message.error('请选择市级');
              return 
            }
            if(!this.ruleForm.district_id){
              this.$message.error('请选择区级');
              return 
            }
            this.$emit("event", this.ruleForm);
          } else {
            return false;
          }
        });
      } else {
        this.ruleForm.visible = false;
      }
    },
    handleChange(val) {
      this.ruleForm.cate_id = val[0] - 0;
      this.ruleForm.cate_sub_id = val[1] - 0 || 0;
    },

    updateDocStatus(name, id) {
      this.ruleForm.doctor_name = name;
      this.ruleForm.d_id = id;
    },
  },
};
</script>
<style lang="scss" scope>
.labelred{
  color: #cf2727;
  margin-right: 4px;
}
  .rowform {
    display: flex;
    .maginRight {
      margin-right: 10px;
    }
  }
</style>
