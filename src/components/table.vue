<template>
    <div>
        <el-table :border="pagination.border"
                  :data="list"
                  :height="pagination.selection?'55vh':'56vh'"
                  :load="load"
                  :tree-props="{ children: 'children', hasChildren: 'tip' }"
                  @selection-change="handleSelectionChange"
                  cell-class-name="table-cell-style"
                  header-cell-class-name="table-header-style"
                  lazy
                  row-key="id">
            <el-table-column type="selection" v-if="pagination.selection" width="55">
            </el-table-column>
            <el-table-column :align="d.align || 'center'" :key="d.id" :label="d.label"
                             :show-overflow-tooltip="d.showTooltip"
                             :sortable="d.sortable" :width="d.width || 'normal'" v-for="d in data">
                <template slot-scope="scope">
                    <div v-if="d.typeCode === 'img'">
                        <el-image :fit="scope.row[d.fit] || 'fill'" :preview-src-list="[scope.row[d.prop]]" :src="scope.row[d.prop]" :style="{cursor:d.isPreview?'pointer':'auto'}" class="img">
                            <div slot="error"></div>
                        </el-image>
                    </div>
                    <div v-else-if="d.typeCode === 'tooltipList'">
                        <tooltip :data="tipBtn" :key="index" @event="handleBtn(tipBtn,scope.row)" v-for="(tipBtn,index) in d.data"/>
                    </div>
                    <div v-else-if="d.typeCode === 'iconText'">
                        <p><i :class="showIconText(d.textList,scope.row[d.prop]).icon" :style="{color:showIconText(d.textList,scope.row[d.prop]).iconColor}" class="table-icon-style"/>{{showIconText(d.textList,scope.row[d.prop]).text}}
                        </p>
                    </div>
                    <div v-else-if="d.typeCode === 'textBtnList'">
                        <el-button v-for="(textBtn,index) in d.data" :key="index" @click="handleBtn(textBtn,scope.row)" type="text">{{textBtn.text}}</el-button>
                    </div>
                    <div v-else-if="d.typeCode === 'switch'">
                        <elSwitch :row="scope.row" :data="d" @event="handleSwitch"/>
                    </div>
                    <div v-else>
                        <slot :name="d.prop"
                              :row="scope.row"
                              :text="scope.row[d.prop]">
                            <span>{{ scope.row[d.prop] }}</span>
                        </slot>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="between margintop_20">
            <el-button :disabled="disabled"
                       @click="handleDelMore"
                       class="delBtn"
                       type="primary"
                       v-show="pagination.selection">批量删除
            </el-button>
            <!-- 分页组件 -->
            <el-pagination :current-page="pagination.currentPage"
                           :page-size="pagination.pageSize"
                           :page-sizes="[10, 20, 30, 40]"
                           :total="pagination.total"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import tooltip from "@/components/tooltip";
    import elSwitch from "@/components/switch";
    export default {
        props: {
            data: Array,
            list: Array,
            pagination: Object
        },
        components: {
            tooltip,
            elSwitch
        },
        data() {
            return {
                delArray: [],
                disabled: true
            }
        },
        methods: {
            handleSizeChange(val) {
                // 每页显示条数改变后，被触发,val是每页显示的最新条数
                this.pagination.pageSize = val;
                this.$emit("change", {
                    pageSize: val,
                    currentPage: this.pagination.currentPage
                });
            },
            handleCurrentChange(val) {
                // 切换页码
                this.pagination.currentPage = val;
                this.$emit("change", {
                    pageSize: this.pagination.pageSize,
                    currentPage: val
                });
            },
            load(tree, treeNode, resolve) {
                this.$emit("load", tree, treeNode, resolve);
            },
            handleSelectionChange(val) {
                this.delArray = val
                this.disabled = val.length <= 0
            },
            handleDelMore() {
                let ids = []
                this.delArray.forEach(e => {
                    ids.push(e.id)
                });
                this.$emit("delmore", ids)
            },
            //点击按钮的回调
            handleBtn(d, scope) {
                try {
                    d.callback && d.callback(d, scope, this.data);
                    // eslint-disable-next-line no-empty
                } catch (e) {

                }
            },
            //点击switch组件的回调
            handleSwitch(d,scope){
                try {
                    d.callback && d.callback(d, scope);
                    // eslint-disable-next-line no-empty
                } catch (e) {

                }
            }
        },
        computed: {
            /**
             * typeCode:'iconText',
             * 解决这类时使用计算属性，用闭包解决计算属性不能传值问题
             * @returns {function(*=, *=): *|number|bigint}
             */
            showIconText: function () {
                return function (arr, key) {
                    return arr.find(item => item.id === String(key));
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .table-header-style {
        text-align: center !important;
        color: #333;
    }

    .table-cell-style {
        /*text-align: center !important;*/
        cursor: default;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: rgba(0, 21, 41, 0.06) !important;
    }

    .el-table-text {
        font-size: 18px;
        cursor: pointer;

        &:hover {
            font-size: 20px;
        }
    }

    .el-table-redColor {
        color: #ce1818;
    }

    .el-table-greenColor {
        color: #2e962e;
    }

    .delBtn {
        margin-left: 10px;
    }

    .margintop_20 {
        margin-top: 20px;
    }

    .color-red {
        color: #e24444;
    }

    .inline-block {
        display: inline-block;
    }

    .margin-left-10 {
        margin-left: 10px;
    }
    .prevent-preview {
        pointer-events:none;
    }
    .img {
        width: 100%;
        height: 100%;
    }

    .table-icon-style {
        margin-right: 5px;
    }
</style>
