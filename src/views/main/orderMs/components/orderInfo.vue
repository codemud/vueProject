<template>
  <el-dialog class="orderInfo"
             :title="ruleForm.title"
             :visible.sync="ruleForm.visible"
             width="400px">
    <el-row>
      <el-col :span="24">订单号： {{ruleForm.order_no}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">创建时间： {{ruleForm.pay_time}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊医院： {{ruleForm.hospital_name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊科室： {{ruleForm.department2_name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊医生： {{ruleForm.doctor_name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊人： {{ruleForm.member_name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊人手机： {{ruleForm.mobile}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊人身份证： {{ruleForm.id_card}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊时间： {{ruleForm.date}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">就诊费用： {{ruleForm.pay_amount}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">支付方式： <span style="color:#ff0000">{{ruleForm.pay_type}}</span></el-col>
    </el-row>
    
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="ruleForm.visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import API from '@/api/orderMs'
export default {
  props:{
    ruleForm:Object
  },
  data() {
    return {

    }
  },
  created() {
    
  },
  methods: {
    
  },
  
}
</script>
<style lang="scss" scope>
.orderInfo {
  .el-row {
    height: 40px;
    font-size: 16px;
  }
}
</style>