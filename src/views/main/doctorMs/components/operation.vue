<template>
    <Dialog :dialog="{
      title: ruleForm.title,
      visible: ruleForm.visible,
      width: '750px',
      height:'500px',
      loading: ruleForm.loading
    }"
            @events="handleDialog">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="150px"
                 class="bo_form specialMs">
            <el-form-item label="医生名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入医生名称"/>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option v-for="(item, i) in ruleForm.sexOpt" :key="i" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="医生头像：" >
                <imgUpload :fileName="ruleForm.head" target="head" filesName="guahao" :files="getFileNames">
                </imgUpload>
            </el-form-item>
            <el-form-item label="医生职称：" prop="profession">
                <el-select v-model="ruleForm.profession" placeholder="请选择医生职称">
                    <el-option v-for="(item, i) in ruleForm.professionOpt" :key="i" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <span slot="label"><span class="labelred">*</span>执业医院及科室：</span>
                <div>
                    <el-row class="marginbottom_22">
                        <el-col :span="13">
                            <el-select v-model="cooperations1.hospital_id" placeholder="请选择医院" style="width: 100%;">
                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10" style="padding-left: 10px;">
                            <el-cascader v-model="cooperations1.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"
                                         @change="handleSelect1" placeholder="请选择科室">
                            </el-cascader>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="marginbottom_22">
                        <el-col :span="13">
                            <el-select v-model="cooperations2.hospital_id" placeholder="请选择医院" style="width: 100%;">
                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <el-cascader v-model="cooperations2.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"
                                         @change="handleSelect2" placeholder="请选择科室">
                            </el-cascader>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="marginbottom_22">
                        <el-col :span="13">
                            <el-select v-model="cooperations3.hospital_id" placeholder="请选择医院" style="width: 100%;">
                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <el-cascader v-model="cooperations3.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"
                                         @change="handleSelect3" placeholder="请选择科室">
                            </el-cascader>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
<!--            <div>-->
<!--                <el-form-item label="执业医院及科室：">-->
<!--                    <el-row>-->
<!--                        <el-col :span="13">-->
<!--                            <el-select v-model="cooperations1.hospital_id" placeholder="请选择医院" style="width: 100%;">-->
<!--                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-col>-->
<!--                        <el-col :span="10" style="padding-left: 10px;">-->
<!--                            <el-cascader v-model="cooperations1.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"-->
<!--                                         @change="handleSelect1" placeholder="请选择科室">-->
<!--                            </el-cascader>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-row :gutter="10">-->
<!--                        <el-col :span="13">-->
<!--                            <el-select v-model="cooperations2.hospital_id" placeholder="请选择医院" style="width: 100%;">-->
<!--                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-col>-->
<!--                        <el-col :span="10">-->
<!--                            <el-cascader v-model="cooperations2.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"-->
<!--                                         @change="handleSelect2" placeholder="请选择科室">-->
<!--                            </el-cascader>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-row :gutter="10">-->
<!--                        <el-col :span="13">-->
<!--                            <el-select v-model="cooperations3.hospital_id" placeholder="请选择医院" style="width: 100%;">-->
<!--                                <el-option v-for="(item, i) in ruleForm.hospitalsOpt" :key="i" :label="item.name" :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-col>-->
<!--                        <el-col :span="10">-->
<!--                            <el-cascader v-model="cooperations3.department" :options="ruleForm.parentsOpt" :show-all-levels="false" :props="{ checkStrictly: true }"-->
<!--                                         @change="handleSelect3" placeholder="请选择科室">-->
<!--                            </el-cascader>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </el-form-item>-->
<!--            </div>-->
            <el-form-item label="身份证号：" prop="identity_number">
                <el-input v-model="ruleForm.identity_number" placeholder="请输入身份证号"/>
            </el-form-item>
            <el-form-item label="医师资格证号：" prop="doctor_cert_card">
                <el-input v-model="ruleForm.doctor_cert_card" placeholder="请输入医师资格证号"/>
            </el-form-item>
            <el-form-item label="擅长疾病：" prop="good_at_disease">
                <el-input v-model="ruleForm.good_at_disease" placeholder="请输入擅长疾病,"/>
            </el-form-item>
            <el-form-item label="医生擅长：" prop="good_at">
                <el-input type="textarea" :rows="3" placeholder="请输入医生擅长" v-model="ruleForm.good_at"/>
            </el-form-item>
            <el-form-item label="医生简介：">
                <el-input type="textarea" :rows="3" placeholder="请输入医生简介" v-model="ruleForm.brief"/>
            </el-form-item>
            <el-form-item label="状态" prop="gh_state">
                <el-select class="width200" v-model="ruleForm.gh_state" placeholder="请选择状态">
                    <el-option v-for="(item, i) in ruleForm.stateOpt" :key="i" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </Dialog>
</template>
<script>
    import Dialog from "@/components/dialog";
    import imgUpload from "@/components/imgUpload";

    export default {
        components: {
            Dialog, imgUpload
        },
        props: {
            ruleForm: Object
        },
        data() {
            return {
                cooperations1:{},
                cooperations2:{},
                cooperations3:{},
                rules: {
                    name: [{required: true, message: "请输入医生名称", trigger: "blur"}],
                    sex: [{required: true, message: "请选择性别", trigger: "change"}],
                    profession: [{required: true, message: "请选择医生职称", trigger: "change"}],
                    identity_number: [{required: true, message: "请输入身份证号", trigger: "blur"}],
                    doctor_cert_card: [{required: true, message: "请输入医师资格证号", trigger: "blur"}],
                    good_at_disease: [{required: true, message: "请输入擅长疾病", trigger: "blur"}],
                    good_at: [{required: true, message: "请输入医生擅长", trigger: "blur"}],
                    // hospital_id: [{required: true, message: "请选择医院及科室", trigger: "change"}],
                },
                getFileNames: (fileName, file) => {
                    this.ruleForm[fileName] = file
                }
            };
        },
        // watch: {
        //     ruleForm (val) {
        //         if (val.cooperations) {
        //             let [cooperations1, cooperations2, cooperations3] = [...val.cooperations];
        //             this.cooperations1 = this.handleSelectData(cooperations1);
        //             this.cooperations2 = this.handleSelectData(cooperations2);
        //             this.cooperations3 = this.handleSelectData(cooperations3);
        //         }
        //     }
        // },
        created() {
            if (this.ruleForm.cooperations) {
                console.log(222)
                let [cooperations1, cooperations2, cooperations3] = [...this.ruleForm.cooperations];
                this.cooperations1 = this.handleSelectData(cooperations1);
                this.cooperations2 = this.handleSelectData(cooperations2);
                this.cooperations3 = this.handleSelectData(cooperations3);
            }
        },
        methods: {
            handleSelect1(val) {
                console.log('111')
                let [department_id,department_sub_id] = [...val];
                this.cooperations1 = {...this.cooperations1,department_id,department_sub_id};
            },
            handleSelect2(val) {
                let [department_id,department_sub_id] = [...val];
                this.cooperations2 = {...this.cooperations2,department_id,department_sub_id};
            },
            handleSelect3(val) {
                let [department_id,department_sub_id] = [...val];
                this.cooperations3 = {...this.cooperations3,department_id,department_sub_id};
            },
            handleSelectData(val){
                let obj = {};
                if(val){
                    obj.hospital_id = val.hospital_id;
                    obj.department = [val.department_id,val.department_sub_id];
                    obj.department_id=val.department_id;
                    obj.department_sub_id=val.department_sub_id;
                }
                return obj;
            },
            handleDialog(val) {
                if (val === "enter") {
                    this.$refs["ruleForm"].validate(valid => {
                        if (valid) {
                            if((this.cooperations1.hospital_id && this.cooperations1.department_sub_id) || (this.cooperations2.hospital_id && this.cooperations2.department_sub_id) || (this.cooperations3.hospital_id && this.cooperations3.department_sub_id)){
                                this.ruleForm.cooperations=[this.cooperations1,this.cooperations2,this.cooperations3];
                                this.$emit("event")
                            }else{
                                this.$message.warning("请选择医院及科室!");
                            }
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.ruleForm.visible = false;
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
    .labelred{
        color: #cf2727;
        margin-right: 4px;
    }
    .marginbottom_22 {
        margin-bottom: 22px;
    }
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
