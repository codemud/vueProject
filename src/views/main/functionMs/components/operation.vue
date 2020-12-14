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
                 class="bo_form specialMs"
                 label-width="150px"
                 ref="ruleForm">
            <el-form-item label="名称：" prop="name">
                <el-input placeholder="请输入名称" v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select placeholder="请选择性别" v-model="ruleForm.sex">
                    <el-option :key="i" :label="item.name" :value="item.id" v-for="(item, i) in ruleForm.sexOpt">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像：">
                <imgUpload :fileName="ruleForm.head" :files="getFileNames" filesName="guahao" target="head">
                </imgUpload>
            </el-form-item>
            <el-form-item label="职称：" prop="profession">
                <el-select placeholder="请选择职称" v-model="ruleForm.profession">
                    <el-option :key="i" :label="item.name" :value="item.id" v-for="(item, i) in ruleForm.professionOpt">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号：" prop="identity_number">
                <el-input placeholder="请输入身份证号" v-model="ruleForm.identity_number"/>
            </el-form-item>
            <el-form-item label="简介：">
                <el-input :rows="3" placeholder="请输入医生简介" type="textarea" v-model="ruleForm.brief"/>
            </el-form-item>
            <el-form-item label="状态" prop="gh_state">
                <el-select class="width200" placeholder="请选择状态" v-model="ruleForm.state">
                    <el-option :key="i" :label="item.name" :value="item.id" v-for="(item, i) in ruleForm.stateOpt">
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
                rules: {
                    name: [{required: true, message: "请输入名称", trigger: "blur"}],
                    sex: [{required: true, message: "请选择性别", trigger: "change"}],
                    profession: [{required: true, message: "请选择职称", trigger: "change"}],
                    identity_number: [{required: true, message: "请输入身份证号", trigger: "blur"}]
                },
                getFileNames: (fileName, file) => {
                    this.ruleForm[fileName] = file
                }
            };
        },
        created() {

        },
        methods: {
            handleDialog(val) {
                if (val === "enter") {
                    this.$refs["ruleForm"].validate(valid => {
                        if (valid) {
                            this.$emit("event")
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
    .labelred {
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
