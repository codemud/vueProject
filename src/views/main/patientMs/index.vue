<template>
    <div class="patientMs">
        <el-card class="box-card">
            <el-form :inline="true"
                     :model="search"
                     class="demo-form-inline">
                <el-form-item label="患者名称：">
                    <el-input class="width220"
                              v-model="search.name"
                              placeholder="请输入患者姓名"
                              @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
                </el-form-item>
                <el-form-item label="患者手机号：">
                    <el-input class="width220"
                              v-model="search.mobile"
                              placeholder="请输入患者手机号码"
                              @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
                </el-form-item>
                <!-- <el-form-item label="患者身份证号：">
                    <el-input class="width220"
                              v-model="search.id_card"
                              placeholder="请输入患者身份证号"
                              @keyup.enter.native="pagination.currentPage=1;initData()"></el-input>
                </el-form-item> -->
                <el-form-item label="性别：">
                    <el-select v-model="search.sex"
                               placeholder="请选择">
                        <el-option v-for="(item, i) in sexList"
                                   :key="i"
                                   :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="float_right">
                    <el-button type="primary"
                               @click="pagination.currentPage=1;initData()">查询
                    </el-button>
                    <el-button @click="search = { }">重置</el-button>
                </el-form-item>
                <div class="margintop_20">
                    <el-form-item>
                        <el-button type="primary"
                                   icon="el-icon-plus"
                                   @click="handleAdd">新建
                        </el-button>
                        
                    </el-form-item>
                </div>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <Table :data="data"
                   :list="list"
                   :pagination="pagination"
                   @change="changePagine"
                   @delmore="handleDel">

                <template v-slot:sex="scope">
                    <span>{{getLevelText(scope.text,sexList)}}</span>
                </template>
                
                
                <template v-slot:mobile="scope">
                    <span>{{filterStr(scope.text,3,4)}}</span>
                </template>
                <template v-slot:id_card="scope">
                    <span>{{filterStr(scope.text,3,1)}}</span>
                </template>
                <!-- 操作按钮 -->
                <template v-slot:operation="scope">
                    <!-- <tooltip :data="{ content: '查看', type: 'info' }"
                             @event="handleLook(scope.row)"></tooltip>  -->
                    <tooltip :data="{ content: '编辑', type: 'primary' }"
                             @event="handleEdit(scope.row)"/>
                    <!-- <tooltip :data="{ content: '删除', type: 'danger' }"
                             @event="handleDel(scope.row)"></tooltip> -->
                </template>
            </Table>
        </el-card>

        <operation :ruleForm="ruleForm" :sexList="sexList" :statusList="statusList"
                   @event="handleForm"></operation>
    </div>
</template>
<script>
    import Table from "@/components/table";
    import tooltip from "@/components/tooltip";
    import excelUpload from '@/components/excelUpload'
    import operation from "./components/operation";
    import API from "@/api/patientMs";
    import {getSex,getMenberCert} from "../../../utils/auth";
    export default {
        name: "patientMs",
        components: {
            Table,
            tooltip,
            operation,
            excelUpload
        },
        data() {
            return {
                ruleForm: {},
                search: {},
                sexList: getSex()?getSex():[],
                statusList:getMenberCert()?getMenberCert():[],
                data: [
                    {prop: "id", label: "序号", showTooltip: true},
                    {prop: "realname", label: "患者姓名", showTooltip: true},
                    {prop: "sex", label: "患者性别", width: "150px"},
                    {prop: "mobile", label: "患者手机号", showTooltip: true},
                    {prop: "city_name", label: "所在城市", showTooltip: true},
                    {prop: "birthday", label: "患者出生年月", showTooltip: true},
                    {prop: "id_card", label: "身份证号", showTooltip: true},
                    {prop: "operation", label: "操作", width: "150px"}
                ],
                list: [],
                pagination: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 10, // 每页显示10条数据
                    selection: false
                }
            };
        },
        created() {
            this.initData();
        },
        methods: {
            filterStr(str,len1,len3){
                let fi = str.length - len1 - len3;
                let strsMART = "";
                for (let index = 0; index < fi; index++) {
                    strsMART = strsMART + "*";
                }
                return str.substring(0,len1) + strsMART + str.substring(str.length-len3,str.length)
            },
            getLevelText(val,list){
                if (list.length > 0) {
                    for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    if(element.id === val){
                        return element.name
                    }
                    }
                }
                return ""
            },
            initData() {
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
            changePagine(val) {
                this.pagination.currentPage = val.currentPage;
                this.pagination.pageSize = val.pageSize;
                this.initData();
            },
            handleSwitch(val) {
                API.updateState(val.recommend, val.id);
            },
            handleAdd() {
                this.ruleForm = {
                    visible: true,
                    title: "新建",
                    loading: false
                };
            },
            handleEdit(row) {
                row.zid = row.zid ? row.zid + '' : undefined;
                this.ruleForm = {
                    visible: true,
                    title: "编辑",
                    loading: false,
                    ...row,
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
            handleForm(ruleForm) {
                this.ruleForm.loading = true;
                if (ruleForm.title === "新建") {
                    API.create(ruleForm).then((res) => {
                        if (res.code == 200) {
                            this.initData();
                            this.ruleForm.visible = false;
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                } else if (ruleForm.title === "查看"){
                    this.ruleForm.loading = false;
                    this.ruleForm.visible = false;
                } else {
                    delete ruleForm.topic_names;
                    API.update(ruleForm).then((res) => {
                        if (res.code == 200) {
                            this.initData();
                            this.ruleForm.visible = false;
                        }
                    }).finally(() => {
                        this.ruleForm.loading = false;
                    });
                }
            },

            handleDel(row) {
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
                    .catch(() => {
                    });
            }
        }
    };
</script>
<style lang="scss" scope>
    .patientMs {
        .width220 {
            width: 220px;
        }

        .flex {
            .el-form-item__content {
                display: flex;
            }
        }

        .noimg {
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: #e1e1e1;
            border-radius: 4px;
            display: block;
        }
    }
</style>
