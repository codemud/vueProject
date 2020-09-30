<template>
    <div class="bannerMs">
        <cardFrom :formData="formData" :form="search"/>
        <el-card class="box-card">
            <Table :data="data"
                   :list="list"
                   :pagination="pagination"
                   @change="changePagine"
                   @delmore="handleDel">
                <!-- 头像 -->
                <template v-slot:head="scope">
                    <el-image class="headimg" fit="fill" :src="scope.text">
                        <div slot="error"></div>
                    </el-image>
                </template>
                <!-- 操作按钮 -->
                <template v-slot:operation="scope">
                    <tooltip :data="{ content: '编辑', type: 'primary' }" @event="handleEdit(scope.row)"/>
                    <tooltip :data="{ content: '删除', type: 'danger' }" @event="handleDel(scope.row)"/>
                    <tooltip :data="{ content: '号池管理', type: 'primary',icon:'el-icon-date' }" @event="handleReg(scope.row)"/>
                </template>
            </Table>
        </el-card>

        <operation v-if="ruleForm.visible" :ruleForm="ruleForm" @event="handleForm">
        </operation>
        <register v-if="ruleRegForm.visible" :ruleRegForm="ruleRegForm" @event="handleRegForm">
        </register>
    </div>
</template>
<script>
    import Table from "@/components/table";
    import tooltip from "@/components/tooltip";
    import operation from "./components/operation";
    import register from "./components/register";
    import API from "@/api/doctorMs/doctorMs";
    import Hospitals from "@/api/specialMs";
    import source from "@/api/doctorMs/source";
    import cardFrom from '@/components/from/index'
    import {getSex,getProfession,getGhState} from "@/utils/auth";
    import common from "@/utils/common.js"

    export default {
        name: "rolesMs",
        components: {
            Table,
            tooltip,
            operation,
            register,
            cardFrom
        },
        data() {
            return {
                formData:[
                        {typeCode:'input',label:'医生名称医生名称医生名称',name:'name',placeholder:'请输入医生名称'},
                        {typeCode:'select',label:'性别',name:'sex',placeholder:'请选择性别',optionData:getSex(),},
                        {typeCode:'select',label:'医生职称',name:'profession',placeholder:'请选择医生职称',optionData:getProfession(),},
                        {typeCode:'cascader',label:'科室',name:'department_id',placeholder:'请选择医生职称',optionData:common.getOptions(
                                {
                                    url: '/ghback/departments/trees',
                                    target:()=>[this.formData,'department_id'],
                                    callback: (res,async) => {
                                        // 异步请求 option  回显处理内容
                                        res.data && res.data.map(item=>{
                                            item.label = item.name;
                                            item.value = item.id;
                                            item.children && item.children.map(t=>{
                                                t.label = t.name;
                                                t.value = t.id;
                                            })
                                        });
                                        async.optionData = res.data;
                                    }
                                },
                            )
                        },
                        {typeCode:'input',label:'执业医院',name:'hospital_id',placeholder:'请输入执业医院'},
                        {typeCode:'select',label:'状态',name:'state',placeholder:'请选择状态',optionData:getGhState(),},
                        {typeCode:'date',label:'开始时间',name:'start_time',placeholder:'请选择开始时间',isDisabledDate:true,ruleType:'notBefore',shortcut:true},
                        {typeCode:'date',label:'结束时间',name:'end_time',placeholder:'请选择结束时间',},
                        {typeCode:'btn',icon:'el-icon-plus',btnName:'新建',btnClick:(val,form)=>{
                                console.log('新建',val,form)
                                // this.handleAdd()
                            }
                        },
                        {typeCode:'btn',btnName:'查询',btnClick:(val,form)=>{
                                console.log('查询',val,form)
                                // this.initData()
                            }
                        },
                        {typeCode:'btn',btnName:'重置',btnType:'reset',btnClick:(val)=>{
                                console.log('重置',val)
                            }
                        }
                ],
                ruleForm: {},
                ruleRegForm: {},
                search: {},
                data: [
                    {prop: "head", label: "医生头像", width: "150px"},
                    {prop: "name", label: "医生姓名", showTooltip: true},
                    {prop: "sex_name", label: "医生性别", showTooltip: true},
                    {prop: "profession_name", label: "医生职称", showTooltip: true},
                    {prop: "hospital_name", label: "第一执业医院", showTooltip: true},
                    {prop: "parents", label: "科室", showTooltip: true},
                    {prop: "state_name", label: "状态"},
                    {prop: "operation", label: "操作"}
                ],
                department:[],
                hospitalsOpt:[],
                sexOpt: getSex(),
                professionOpt: getProfession(),
                stateOpt: getGhState(),
                list: [],
                parentsOpt:[],
                pagination: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 20, // 每页显示10条数据
                    selection: true
                }
            };
        },
        created() {
            this.initData();
            this.initParents();
            this.initHospitals();
        },
        methods: {
            initData() {
                let data = {
                    ...this.search,
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize
                };
                data.department_id = data.department_id &&  data.department_id.slice(data.department_id.length - 1).toString();
                API.getList(data).then(response => {
                    let res = response.data;
                    if (res) {
                        this.pagination.total = res.total;
                        res.list.map(item=>{
                            item.parents = item.department_name + (item.department_sub_name?'-'+item.department_sub_name:'');
                            // item.sex_name = item.sex === '0'?'未知':(item.sex === 1?'男':'女');
                            item.sex_name = item.sex === 1?'男':'女';
                            item.state_name = item.gh_state === 0?'未开通':(item.gh_state === 1?'开通':(item.gh_state === 2?'屏蔽状态':'审核中'));
                        });
                        this.list = res.list;
                        if (this.list.length <= 0 && this.pagination.currentPage > 1) {
                            this.pagination.currentPage--;
                            this.initData()
                        }
                    }
                });
            },
            initParents() {
                // this.parentsOpt = [{label:'无',value:0}];
                API.getParentsList().then(res => {
                    //加载科室
                    if (res.code === 200) {
                        res.data && res.data.map(item=>{
                            item.label = item.name;
                            item.value = item.id;
                            item.children && item.children.map(t=>{
                                t.label = t.name;
                                t.value = t.id;
                            })
                        });
                        // this.parentsOpt = [...this.parentsOpt,...res.data];
                        this.parentsOpt = res.data;
                    }
                });
            },
            initHospitals() {
                Hospitals.getHospitalsList().then(res => {
                    //加载科室
                    if (res.code === 200) {
                        this.hospitalsOpt = res.data;
                    }
                });
            },
            changePagine(val) {
                this.pagination.currentPage = val.currentPage;
                this.pagination.pageSize = val.pageSize;
                this.initData();
            },
            handleSelect(val){
                // console.log(val,val.slice(val.length - 1),this.search)
                this.search.department_id = val.slice(val.length - 1).toString()
            },
            handleForm() {
                this.ruleForm.loading = true;
                let param = {
                    id:this.ruleForm.id,
                    name:this.ruleForm.name,
                    sex:this.ruleForm.sex,
                    head:this.ruleForm.head,
                    profession:this.ruleForm.profession,
                    cooperations:this.ruleForm.cooperations,
                    identity_number:this.ruleForm.identity_number,
                    doctor_cert_card:this.ruleForm.doctor_cert_card,
                    good_at_disease:this.ruleForm.good_at_disease,
                    good_at:this.ruleForm.good_at,
                    brief:this.ruleForm.brief,
                    state:'1',
                    gh_state:this.ruleForm.gh_state,
                };
                if (this.ruleForm.title === "新建") {
                    API.create(param).then((res) => {
                        if(res.code === 200){
                            this.initData();
                            this.ruleForm.visible = false;
                            this.$message.success("新增成功!");
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                } else {
                    API.update(param).then((res) => {
                        if(res.code === 200){
                            this.initData();
                            this.ruleForm.visible = false;
                            this.$message.success("修改成功!");
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                }
            },
            handleRegForm(type) {
                let param = {
                    doctor_id:this.ruleRegForm.id,
                    hospital_id:this.ruleRegForm.hospitalId,
                    date:this.ruleRegForm.date,
                    record:this.ruleRegForm.record,
                    work_state:this.ruleRegForm.work_state,
                    stop_state:this.ruleRegForm.stop_state,
                };
                if (type === "add") {
                    source.create(param).then((res) => {
                        if(res.code === 200){
                            this.initData();
                            this.ruleRegForm.visible = false;
                            this.$message.success("新增成功!");
                        }
                    }).finally(() => {
                        this.ruleRegForm.loading = false;
                    });
                } else {
                    source.update(param).then((res) => {
                        if(res.code === 200){
                            this.initData();
                            this.ruleRegForm.visible = false;
                            this.$message.success("修改成功!");
                        }
                    }).finally(() => {
                        this.ruleRegForm.loading = false;
                    });
                }
            },
            handleEdit(row) {
                API.getDetail(row.id).then((res) => {
                    // res.data.sex = res.data.sex.toString();
                    // res.data.profession = res.data.profession.toString();
                    // res.data.state = res.data.state.toString();
                    this.ruleForm = {
                        visible: true,
                        title: "编辑",
                        loading: false,
                        sexOpt: this.sexOpt,
                        stateOpt: this.stateOpt,
                        parentsOpt: this.parentsOpt,
                        hospitalsOpt: this.hospitalsOpt,
                        professionOpt: this.professionOpt,
                        ...res.data
                    };
                }).catch((err) => {
                    console.log(err)
                });
            },
            handleAdd() {
                this.ruleForm = {
                    visible: true,
                    title: "新建",
                    loading: false,
                    sexOpt: this.sexOpt,
                    stateOpt: this.stateOpt,
                    parentsOpt: this.parentsOpt,
                    hospitalsOpt: this.hospitalsOpt,
                    professionOpt: this.professionOpt,
                    gh_state: 1,
                    sex: 1,
                    profession: 1,
                    head: "",
                    cooperations: [],
                };
            },
            handleReg(row) {
                API.getDetail(row.id).then((res) => {
                    this.ruleRegForm = {
                        visible: true,
                        title: "挂号池管理",
                        loading: false,
                        stop_state:0,
                        work_state:1,
                        ...res.data
                    };
                }).catch((err) => {
                    console.log(err)
                });
            },
            handleDel(row) {
                let tips = "";
                let colum = undefined;
                if (row.length > 0) {
                    colum = row;
                    tips = `此操作将永久删除这${row.length}条数据, 是否继续?`
                } else {
                    colum = [row.id];
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
                .catch(() => {
                });
            }
        }
    };
</script>
