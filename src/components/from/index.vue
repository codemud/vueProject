<template>
    <el-card class="box-card" shadow="always">
        <el-form :inline="true" :model="form" class="demo-form-inline rows-flex">
            <div v-for="(item, index) in formData" :key="index" class="marginbottom_10" :class="item.label?'rows-item':'rows'" :style=" 'width:' + (item.width?item.width:(item.typeCode==='btn'?'':340)) +'px;'">
                <span  v-if="item.label" class="font-14 pr-10 text-right" :style="'width:'+(item.labelWidth || 120) +'px;line-height: 40px;'">
                     <el-tooltip :class="item.required?'required_box':''"  v-if="item.label.replace(/[^\x00-\xff]/g, '**').length>=number" class="item" effect="dark" :content="item.label" placement="bottom">
                        <div class="g-ellipse">
                            {{item.label}}
                        </div>
                    </el-tooltip>
                    <div v-else :class="item.required?'required_box':''">
                        {{item.label}}
                    </div>
                </span>
                <el-row v-if="item.label" :style="'width: calc(100% - ' + (item.labelWidth || 120) + 'px);'">
                    <el-input v-if="item.typeCode==='input'" v-model="form[item.name]" :placeholder="item.placeholder">
                    </el-input>
                    <el-select v-if="item.typeCode==='select'" v-model="form[item.name]" :placeholder="item.placeholder" style="width: 100%;">
                        <el-option v-for="(t, i) in item.optionData" :key="i" :label="t.name" :value="t.id">
                        </el-option>
                    </el-select>
                    <el-cascader v-if="item.typeCode==='cascader'" v-model="form[item.name]" :options="item.optionData" :show-all-levels="false" :props="{ checkStrictly: true }" style="width: 100%;">
                    </el-cascader>
                </el-row>
                <el-row v-else>
                        <div :class="item.className" v-show="!item.hide">
                            <el-button v-if="item.btnType === 'reset'" :icon="item.icon" :style="item.style" :type="item.type || 'primary'" class="fn-fl" @click="reset(item)" >
                                <span v-if="item.v_html" v-html="item.v_html"/>
                                <span v-else>{{item.btnName}}</span>
                            </el-button>
                            <el-button v-else :style="item.style" :icon="item.icon" :type="item.type || 'primary'" class="fn-fl" @click="item.btnClick(item, form)" >
                                <span v-if="item.v_html" v-html="item.v_html"/>
                                <span v-else>{{item.btnName}}</span>
                            </el-button>
                        </div>
                </el-row>
            </div>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "index",
        props:{
            formData:{
                type:Array,
                default:function () {
                    return []
                }
            },
            form:{
                type:Object,
                default:function () {
                    return {}
                }
            },
            number : {
                type:Number,
                default:12
            },
        },
        mounted() {
            console.log(this.formData,this.form)
        }
    }
</script>

<style scoped>

</style>
