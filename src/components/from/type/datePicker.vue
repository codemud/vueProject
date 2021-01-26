<template>
    <el-date-picker
        class="initDateClass"
        v-model="form[inputData.name]"
        :type="inputData.dateType||'date'"
        :format="inputData.format"
        :value-format="inputData.valueFormat || 'yyyy-MM-dd'"
        :placeholder="inputData.placeholder"
        :picker-options="pickerOptions"
    >
    </el-date-picker>
</template>

<script>
    export default {
        name: "datePicker",
        props:{
            inputData:{
                type:Object,
                default:function () {
                    return {}
                }
            },
            form:{
                type:Object,
                default:function () {
                    return {}
                }
            },
        },
        data(){
            return {
                //时间选择规则
                timeSelectRule:[
                    {type:'notBefore',msg:'当前时间之前不能选择',fun:(time)=>this.notBefore(time)},
                    {type:'notAfter',msg:'当前时间之后不能选择',fun:(time)=>this.notAfter(time)},
                ],
                //时间选择框快捷键-可自行配置
                shortcutKey:[
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ],
                pickerOptions: {},
            }
        },
        created() {
            this.pickerOptions = {
                disabledDate:this.inputData.isDisabledDate || false ? (time)=>this.timeSelectRule.find(item=>item.type===this.inputData.ruleType).fun(time) :undefined,
                shortcuts:this.inputData.shortcut || false ?this.shortcutKey:undefined
            }
        },
        methods:{
            notBefore(time) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return time.getTime() < date;
            },
            notAfter(time){
                return time.getTime() > Date.now();
            },
            timeChange(time){
                //时间范围选择，可以使用||来达到上面单个操作
                //只能选择当前时间-当前时间后7天之内得时间
                const date = new Date();
                const afterDate = new Date().getTime() + 3600 * 1000 * 24 * 6;
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return time.getTime() < date || time.getTime() > afterDate;
            }
        },
        computed:{

        }
    }
</script>

<style scoped>
.initDateClass {
    width: 100% !important;
}
</style>
