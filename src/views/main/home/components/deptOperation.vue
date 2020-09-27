<template>
    <Dialog :dialog="{
      title: ruleForm.title,
      visible: ruleForm.visible,
      width: '600px',
      height: '500px',
      loading: ruleForm.loading
    }"
            @events="handleDialog">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="bo_form">
            <el-form-item label="科室名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入科室名称">
                </el-input>
            </el-form-item>
            <el-form-item label="首拼" prop="easy">
                <el-input v-model="ruleForm.easy" placeholder="请输入首拼">
                </el-input>
            </el-form-item>
            <el-form-item label="上级科室：" prop="pid">
<!--                <el-select v-model="ruleForm.pid" placeholder="请选择上级科室">-->
<!--                    <el-option v-for="(item, i) in parentsOpt"-->
<!--                               :key="i"-->
<!--                               :label="item.name"-->
<!--                               :value="item.id">-->
<!--                    </el-option>-->
<!--                </el-select>-->
                <el-cascader v-model="ruleForm.pid"
                             :options="ruleForm.parentsOpt"
                             :show-all-levels="false"
                             :props="{ checkStrictly: true }"
                             @change="handleSelect"
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="科室编号" prop="number">
                <el-input v-model="ruleForm.number" placeholder="请输入科室编号">
                </el-input>
            </el-form-item>
            <el-form-item label="科室图标" prop="image">
                <imgUpload :fileName="ruleForm.image" target="image" filesName="guahao" :files="getFileNames">
                </imgUpload>
            </el-form-item>
            <el-form-item label="顺序" prop="sort">
                <el-input-number v-model="ruleForm.sort" controls-position="right" :min="1" :max="100">
                </el-input-number>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-switch v-model="ruleForm.state" active-color="#13ce66" inactive-color="#ccc" :active-value="1" :inactive-value="0">
                </el-switch>
            </el-form-item>
        </el-form>
    </Dialog>
</template>
<script>
    import Dialog from "@/components/dialog";
    import imgUpload from "@/components/imgUpload";

    export default {
        components: {
            Dialog,
            imgUpload
        },
        props: {
            ruleForm: Object
        },
        data () {
            return {
                parentsId:[],
                rules: {
                    name: [{ required: true, message: "请输入科室名称", trigger: "blur" }],
                    image: [],
                    easy: [{ required: true, message: "请输入首拼", trigger: "blur" }],
                    sort: [],
                    number: [{ required: true, message: "请输入科室编号", trigger: "blur" }],
                    pid: [{ required: true, message: "请选择上级科室", trigger: "change" }],
                },
                getFileNames: (fileName, file) => {
                    this.ruleForm[fileName] = file
                }
            };
        },
        created () {

        },
        methods: {
            handleSelect(val){
                // console.log(val,val.slice(val.length - 1),this.ruleForm)
                if(val.slice(val.length - 1)[0] === this.ruleForm.id){
                    this.$message.error("不能选择自身科室!");
                    this.ruleForm.pid=[]
                }else{
                    this.parentsId = val
                }
            },
            handleDialog (val) {
                if (val === "enter") {
                    this.$refs["ruleForm"].validate(valid => {
                        if (valid) {
                            // this.ruleForm.pid = this.parentsId.slice(this.parentsId.length - 1).toString();
                            this.ruleForm.pid = this.ruleForm.pid.join(',');
                            this.$emit("event");
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
<style lang="scss" scope>
    .banner_position {
        .el-form-item__content {
            display: flex;
        }
        .bannerarea {
            width: 40%;
            margin-left: 5%;
        }
        .spacilOptName {
            margin-right: 20px;
        }
    }
</style>
