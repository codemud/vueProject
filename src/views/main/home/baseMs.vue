<template>
    <div class="bannerMs bannerMs_self">
        <cardFrom :formData="formData" :form="search"></cardFrom>

        <el-card class="box-card">
            <Table :data="data"
                   :list="list"
                   :pagination="pagination"
                   @change="changePagine"
                   @delmore="handleDel">
            </Table>
        </el-card>

        <deptOperation v-if="ruleForm.visible" :ruleForm="ruleForm" @event="handleForm"/>
        <PDFDocument v-if="pdfOption.url" :url="pdfOption.url" :scale = pdfOption.scale></PDFDocument>
    </div>
</template>
<script>
    import Table from "@/components/table";
    import API from "@/api/home/baseMs";
    import deptOperation from "./components/deptOperation";
    import PDFDocument from "@/components/pdfPreview/PDFDocument";
    import cardFrom from '@/components/from/index';
    import {getSex, getState} from "@/utils/auth";
    import common from "@/utils/common.js"

    export default {
        name: "departmentMs",
        components: {
            Table,
            deptOperation,
            cardFrom,
            PDFDocument
        },
        data () {
            return {
                formData:[
                    {typeCode:'input',label:'名称',name:'name',placeholder:'请输入名称'},
                    {typeCode:'select',label:'性别',name:'sex',placeholder:'请选择性别',optionData:getSex(),},
                    {typeCode:'cascader',label:'类别',name:'category',placeholder:'请选择类别',optionData:common.getOptions(
                            {
                                url: '/category/trees',
                                target:()=>[this.formData,'category'],
                                callback: (res,async) => {
                                    // 异步请求 option  回显处理内容
                                    if(res.code === 200){
                                        async.optionData = common.changeTree(res.data.list, {
                                            id: 'value',
                                            name: 'label'
                                        });
                                    }
                                }
                            },
                        )
                    },
                    {typeCode:'select',label:'状态',name:'state',placeholder:'请选择状态',optionData:getState(),},
                    {typeCode:'date',label:'开始时间',name:'start_time',placeholder:'请选择开始时间',isDisabledDate:true,ruleType:'notBefore',shortcut:true},
                    {typeCode:'date',label:'结束时间',name:'end_time',placeholder:'请选择结束时间',},
                    {typeCode:'btn',icon:'el-icon-plus',btnName:'新建',btnClick:(val,form)=>{
                            console.log('新建',val,form)
                            // this.handleAdd()
                        }
                    },
                    {typeCode:'btn',btnName:'查询',btnClick:(val,form)=>{
                            console.log('查询',val,form)
                            this.initData()
                        }
                    },
                    {typeCode:'btn',btnName:'重置',btnType:'reset',btnClick:(val)=>{
                            console.log('重置',val)
                        }
                    },
                ],
                ruleForm: {},
                search: {},
                data: [
                    {typeCode:'', prop: "name", label: "名称", showTooltip: true,align:'left' },
                    {typeCode:'', prop: "number", label: "编号", showTooltip: true },
                    {typeCode:'', prop: "sex_name", label: "性别", showTooltip: true },
                    {typeCode:'', prop: "category", label: "类别", showTooltip: true },
                    {typeCode:'img', prop: "src", label: "缩略图", width: "150px",isPreview:true},
                    {typeCode:'', prop: "state_name", label: "状态" },
                    {typeCode:'', prop: "created_time", label: "创建时间", showTooltip: true },
                    {typeCode:'iconText',prop:'state',label:'图标状态',textList:[
                            {id:'1',icon:'el-icon-success',iconColor:'#409eff',text:'成功'},
                            {id:'2',icon:'el-icon-error',iconColor:'#f56c6c',text:'失败'},
                            {id:'3',icon:'el-icon-warning',iconColor:'#e6a23c',text:'警告'},
                        ]
                    },
                    {typeCode:'textBtnList', prop: "", label: "文本按钮操作" ,width: "200px",data:[
                            {text:'改变状态',callback:(item,scope)=>{
                                    console.log(item,scope,'文本按钮')
                                }
                            },
                            {text:'改变状态',callback:(item,scope)=>{
                                    console.log(item,scope,'文本按钮')
                                }
                            },
                        ]
                    },
                    {typeCode:'tooltipList', prop: "", label: "操作" ,width: "150px",data:[
                            {content: '编辑', type: 'primary',callback:(item,scope) => {
                                    console.log(item,scope,'编辑')
                                }
                            },
                            {content: '删除', type: 'danger',callback:(item,scope) => {
                                    console.log(item,scope,'编辑')
                                    this.handleDel(scope);
                                }
                            }
                        ]
                    }
                ],
                list: [],
                parentsOpt: [],
                pdfOption:{
                    url: '',
                    scale: 2.5,
                },
                pagination: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 20, // 每页显示20条数据
                    selection: true
                },
                stateOption: [],
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
                        res.list.map(item=>{
                            item.sex_name = common.getSelectName(getSex(),item.sex,'id').name;
                            item.state_name = common.getSelectName(getState(),item.state,'id').name;
                            item.created_time = common.dateFormat(item.created_at,'yyyy-MM-dd');
                        });
                        this.list = res.list;
                        if (this.list.length <= 0 && this.pagination.currentPage > 1) {
                            this.pagination.currentPage--;
                            this.initData()
                        }
                    }
                })
            },
            handleChangeType () {
                this.pagination.currentPage = 1;
                this.initData();
            },
            changePagine (val) {
                this.pagination.currentPage = val.currentPage;
                this.pagination.pageSize = val.pageSize;
                this.initData();
            },
            handleForm () {
                this.ruleForm.loading = true;
                if (this.ruleForm.title === "编辑") {
                    API.update(this.ruleForm).then(res => {
                        if (res.code === 200) {
                            this.initData();
                            this.initParents();
                            this.ruleForm.visible = false;
                            this.$message.success("修改成功!");
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                } else {
                    API.create(this.ruleForm).then(res => {
                        if (res.code === 200) {
                            this.ruleForm.visible = false;
                            this.initData();
                            this.initParents();
                            this.$message.success("新增成功!");
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                }
            },
            handleEdit (row) {
                row.pid = row.pid.toString().split().map(Number);
                this.ruleForm = {
                    visible: true,
                    title: "编辑",
                    parentsOpt: this.parentsOpt,
                    loading: false,
                    ...row,
                };
            },
            handleAdd () {
                this.ruleForm = {
                    visible: true,
                    loading: false,
                    title: "新建",
                    parentsOpt: this.parentsOpt,
                    sort: "1",
                    image: "",
                    name: '',
                    easy: '',
                    number: '',
                    state: 1,
                    pid:[]
                };
            },
            handleDel (row) {
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
                            this.initParents();
                        }
                    });
                })
                .catch(() => { });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .bannerMs_self {
        .width200 {
            width: 200px;
        }
    }
</style>
