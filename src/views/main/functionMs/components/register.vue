<template>
    <Dialog :dialog="{
      title: ruleRegForm.title,
      visible: ruleRegForm.visible,
      width: '800px',
      height:'500px',
      loading: ruleRegForm.loading
    }"
            @events="handleDialog">
        <el-form :model="ruleRegForm"
                 :rules="rules"
                 ref="ruleRegForm"
                 label-width="80px"
                 class="bo_form specialMs">
            <el-form-item>
                <el-radio-group v-model="hospitalId" @change="handleRadioChange()">
                    <el-radio v-for="item in ruleRegForm.cooperations" :key="item.id" :label="item.hospital_id" border style="height: 100px;line-height: 100px;padding: 0 20px;">{{item.hospital_name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <Calendar class="calendar" v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :agoDayHide="getDateStr(0)" :futureDayHide="getDateStr(14)" :textTop="calendarTextTop">
                </Calendar>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="10" class="marginbottom_10">
                    <el-col :span="8">
                        <p v-if="toadyDate" class="dateNum">{{formatTime}}号源数量</p>
                    </el-col>
                    <el-col :span="16">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="今日停诊" style="text-align: right;">
                                    <el-switch v-model="ruleRegForm.stop_state" active-color="#13ce66" inactive-color="#ccc" :active-value="1" :inactive-value="0" @change="handleSwitch">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <el-form-item label="问诊状态">
                                    <el-select v-model="ruleRegForm.work_state" placeholder="请选择问诊状态">
                                        <el-option v-for="(item, i) in doctorWorkState"
                                                   :key="i"
                                                   :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row class="marginbottom_10" v-for="item in sourceList" :key="item.id">
                    <el-col :span="12">
                        <el-form-item :label="item.timeName" label-width="90px">
                            <el-input v-model="item.num" placeholder="请输入数量"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="价格">
                            <el-input v-model="item.price" placeholder="请输入价格" >
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </Dialog>
</template>
<script>
    import Dialog from "@/components/dialog";
    import Calendar from 'vue-calendar-component';
    import common from '@/utils/common.js';
    import API from "@/api/functionMs/source";
    import { getWorkTime,getDoctorWorkState } from "@/utils/auth";
    export default {
        components: {
            Dialog,Calendar
        },
        props: {
            ruleRegForm: Object
        },
        data() {
            return {
                hospitalId:'',
                toadyDate:'',
                calendarTextTop:['周一','周二','周三','周四','周五','周六','周日'],
                workState:[],
                workTime:{},
                sourceList:[],
                doctorWorkState:getDoctorWorkState(),
                httpType:'add',
                rules: {},
            };
        },
        created() {
            let today = new Date();
            today.setDate(today.getDate()+1);
            this.toadyDate = today;
            this.hospitalId = this.ruleRegForm.cooperations[0].hospital_id;
            this.getWorkTimeData();
            let sourceTime = getWorkTime();
            sourceTime.map(item=>{
                item.timeName = item.name + '号源数';
                item.num = '';
                item.price = '';
            });
            this.sourceList = sourceTime;
        },
        methods: {
            getWorkTimeData(){
                API.getWorkTimeList(this.hospitalId,this.ruleRegForm.id).then(res=>{
                    if(res.code === 200){
                        this.workTime = res.data
                    }
                })
            },
            handleRadioChange(){
                this.getWorkTimeData();
            },
            handleDialog(val) {
                if (val === "enter") {
                    this.$refs["ruleRegForm"].validate(valid => {
                        if (valid) {
                            this.ruleRegForm.record = this.sourceList;
                            this.ruleRegForm.hospitalId = this.hospitalId;
                            this.ruleRegForm.date = common.dateFormat(this.toadyDate,'yyyy-MM-dd');
                            this.$emit("event",this.httpType)
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.ruleRegForm.visible = false;
                }
            },
            getDateStr (dayCount) {
                let dd = new Date();
                dd.setDate(dd.getDate() + dayCount);
                let time = dd.getTime();
                return Math.round(time/1000) + ''
            },
            clickDay(data) {
                // console.log(data); //选中某天
                let selectDate = common.dateFormat(data,'yyyy-MM-dd');
                let source = this.workTime[selectDate];
                // this.ruleRegForm.stop_state = '1';
                if(source.length){
                    // console.log('111')
                    this.httpType = 'edit';
                    this.sourceList.map((item,index)=>{
                        source.map((t,i)=>{
                            if(index === i){
                                item.id = t.id || '';
                                item.num = t.num || '';
                                item.price = t.price || '';
                                this.toadyDate = t.date;
                                this.ruleRegForm.stop_state = t.stop_state;
                                this.ruleRegForm.work_state = t.work_state;
                            }
                        })
                    });
                }else {
                    // console.log('222')
                    this.ruleRegForm.stop_state = 0;
                    this.httpType = 'add';
                    this.toadyDate = data;
                    this.sourceList.map(item=>{
                        item.id = undefined;
                        item.num = '';
                        item.price = '';
                    });
                }
            },
            handleSwitch() {
                console.log(this.httpType,this.toadyDate,)
                if(this.httpType === 'edit'){
                    API.updateNotify(this.hospitalId,this.ruleRegForm.id,this.toadyDate,this.ruleRegForm.stop_state).then((res) => {
                        if(res.code === 200){
                            this.$message.success("修改成功!");
                            this.getWorkTimeData();
                        }
                    }).catch(err=>{
                        console.log(err)
                    });
                }
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
        },
        computed:{
            formatTime(){
                return common.dateFormat(this.toadyDate, 'MM月dd日')
            }
        }
    };
</script>
<style lang="scss">
    .wh_container {
        min-width: 100%;
        width: 100%;
    }
    .calendar {
        .wh_content_all {
            user-select: none;
            background-color: #ffffff !important;
            .wh_jiantou1 {
                border-top: 2px solid #333333;
                border-left: 2px solid #333333;
            }
            .wh_top_changge li {
                color: #333333;
            }
            .wh_jiantou2 {
                border-top: 2px solid #333333;
                border-right: 2px solid #333333;
            }
            .wh_content_item {
                color: #333333;
                .wh_item_date:hover {
                    background: #0091ff;
                    color: #ffffff;
                    border-radius: 100%;
                }
                .wh_isToday {
                    background-color: #ffffff;
                    color: #0091FF;
                    font-weight: bold;
                }
            }
            .wh_content_item .wh_chose_day {
                background: #0091ff;
                color: #ffffff;
            }
        }
    }
    .dateNum {
        color: #333333;
        font-size: 18px;
    }
</style>
