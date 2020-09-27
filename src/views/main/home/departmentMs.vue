<template>
    <div class="bannerMs bannerMs_self">
        <el-card class="box-card">
            <el-form :inline="true"
                     :model="search"
                     class="demo-form-inline">
<!--                <el-form-item label="科室名称：">-->
<!--                    <el-input class="width200" v-model="search.name" placeholder="请输入科室名称" @keyup.enter.native="pagination.currentPage=1;initData()">-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="状态：">-->
<!--                    <el-select class="width200" v-model="search.state" placeholder="请选择状态" @change="handleChangeType">-->
<!--                        <el-option v-for="item in stateOption"-->
<!--                                   :key="item.value"-->
<!--                                   :label="item.label"-->
<!--                                   :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-row class="margintop_20">
                    <el-form-item class="float_left">
                        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
                    </el-form-item>
<!--                    <el-form-item class="float_left">-->
<!--                        <el-button type="primary" @click="pagination.currentPage=1;initData()">查询</el-button>-->
<!--                        <el-button @click="search = {}">重置</el-button>-->
<!--                    </el-form-item>-->
                </el-row>
            </el-form>

        </el-card>

        <el-card class="box-card">
            <Table :data="data"
                   :list="list"
                   :pagination="pagination"
                   @change="changePagine"
                   @delmore="handleDel">
                <!-- 头像 -->
                <template v-slot:image="scope">
                    <el-image class="headimg" fit="fill" :src="scope.text">
                        <div slot="error"></div>
                    </el-image>
                </template>
                <!-- 操作按钮 -->
                <template v-slot:operation="scope">
                    <tooltip :data="{ content: '编辑', type: 'primary' }" @event="handleEdit(scope.row)" />
                    <tooltip :data="{ content: '删除', type: 'danger' }" @event="handleDel(scope.row)"/>
                </template>
            </Table>
        </el-card>

        <deptOperation v-if="ruleForm.visible" :ruleForm="ruleForm" @event="handleForm"/>
    </div>
</template>
<script>
    import Table from "@/components/table";
    import tooltip from "@/components/tooltip";
    import API from "@/api/home/departmentMs";
    import deptOperation from "./components/deptOperation";
    import {getState,} from "@/utils/auth";
    export default {
        name: "departmentMs",
        components: {
            Table,
            tooltip,
            deptOperation,
        },
        data () {
            return {
                ruleForm: {},
                search: {},
                data: [
                    { prop: "name", label: "科室名称", showTooltip: true,align:'left' },
                    { prop: "number", label: "科室编号", showTooltip: true },
                    { prop: "parent_name", label: "上级科室", showTooltip: true },
                    { prop: "sort", label: "顺序", showTooltip: true },
                    { prop: "image", label: "缩略图", width: "150px" },
                    { prop: "state_name", label: "状态" },
                    { prop: "created_at", label: "创建时间", showTooltip: true },
                    { prop: "operation", label: "操作" }
                ],
                list: [],
                parentsOpt: [],
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
            this.initParents();
            this.stateOption = getState().map(item=>({
                label:item.name,
                value:item.id
            }));
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
                            item.state_name = item.state === 0?'不启用':'启用';
                            if(item.children && item.children.length) {
                                item.children.map(t=>{
                                    t.state_name = t.state === 0?'不启用':'启用';
                                })
                            }
                        });
                        this.list = res.list;
                        if (this.list.length <= 0 && this.pagination.currentPage > 1) {
                            this.pagination.currentPage--;
                            this.initData()
                        }
                    }
                })
            },
            initParents() {
                this.parentsOpt = [{label:'无',value:0}];
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
                        this.parentsOpt = [...this.parentsOpt,...res.data];
                    }
                });
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
