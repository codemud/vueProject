<template>
  <Dialog
    :dialog="{
      title: ruleForm.title,
      visible: ruleForm.visible,
      width: '600px',
      height:'500px',
      loading: ruleForm.loading
    }"
    @events="handleDialog"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="bo_form specialMs"
    >
      <el-form-item label="医院名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入医院名称"></el-input>
      </el-form-item>
      <el-form-item prop="logo">
        <span slot="label"><span class="labelred">*</span>医院LOGO</span>
        <imgUpload :fileName="ruleForm.logo" target="image" filesName="guahao" :files="getFileNames">
        </imgUpload>
      </el-form-item>
      <el-form-item prop="area">
        <span slot="label"><span class="labelred">*</span>所在地区</span>
        <div class="rowform">
          <el-select v-model="ruleForm.province_id" @change="chooseFirstArea"
          class="maginRight" placeholder="请选择">
            <el-option
              v-for="itemSigle in areaFirstList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
          <el-select v-model="ruleForm.city_id"
          @change="chooseSecondArea"
          class="maginRight" placeholder="请选择">
            <el-option
              v-for="itemSigle in areaSecondList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
          <el-select v-model="ruleForm.district_id"
          @change="chooseThreeArea"
          class="maginRight" placeholder="请选择">
            <el-option
              v-for="itemSigle in areaThreeList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="医院等级" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择">
            <el-option
              v-for="itemSigle in leaveList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
      </el-form-item>
      <!--  公立  私立 -->
      <el-form-item label="医院性质" prop="gh_hospital_type">
        <el-select v-model="ruleForm.gh_hospital_type" placeholder="请选择">
            <el-option
              v-for="itemSigle in hospitalType"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
      </el-form-item>
      <!-- 添加修改  综合 儿童 -->
      <el-form-item label="医院类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="itemSigle in bdnatureList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="医保类型" prop="hi_type">
        <el-select v-model="ruleForm.hi_type" placeholder="请选择">
            <el-option
              v-for="itemSigle in medicalList"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="医院特色科室" prop="special_departments">
        <el-input v-model="ruleForm.special_departments" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="医院标签" prop="tags">
        <el-input v-model="ruleForm.tags" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="医院联系电话" prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="address">
        <span slot="label"><span class="labelred">*</span>医院详细地址</span>
        <div class="left">
           <el-input v-model="ruleForm.address" :disabled="true" placeholder="请选择医院详细地址"></el-input>
        </div>
        <!-- <div class="left">
           <span>{{ruleForm.address?ruleForm.address:"请选择"}}</span>
        </div> -->
        <div class="right">
          <el-button type="primary" @click="openMap">点击选择地址</el-button>
        </div>
        
        
      </el-form-item>

      <!-- <el-form-item prop="hosaposition">
        <span slot="label"><span class="labelred">*</span>经纬度</span>
        <div class="position">
          <baidu-map class="baiduposition"
           :center="ruleForm.position" :zoom="zoom" @ready="handler"
                   :scroll-wheel-zoom="true"
                   @click="clickEvent" >
                  <bm-local-search :keyword="ruleForm.address" :auto-viewport="true" ></bm-local-search>
                  <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"  :showAddressBar="true" :autoLocation="true" @locationSuccess="getLoctionSuccess" ></bm-geolocation>
                  <bm-view class="baiduposition"></bm-view>
          </baidu-map>
        </div>
      </el-form-item> -->

      <el-form-item label="预约须知" prop="subscribe">
        <el-input type="textarea" v-model="ruleForm.subscribe" class="desc"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="itemSigle in commonState"
              :key="itemSigle.id"
              :label="itemSigle.name"
              :value="itemSigle.id"
            ></el-option>
          </el-select>
      </el-form-item>

    </el-form>
    <baiduMap v-if="showMapDialog" :ruleForm="ruleForm" :dialogMap="{
      title: '选择经纬度',
      visible: showMapDialog,
      width: '800px',
      height:'600px'
    }"
    @events="handleMapDialog">
    </baiduMap>
  </Dialog>
</template>
<script>
import Dialog from "@/components/dialog";
import baiduMap from "./baiduMap";
import imgUpload from "@/components/imgUpload";
import areaData from "@/data/area.json";
import API from "@/api/specialMs";
export default {
  components: {
    Dialog,
    imgUpload,
    baiduMap
  },
  props: {
    ruleForm: Object,
    leaveList:Array,
    hospitalType:Array,
    medicalList:Array,
    commonState:Array,
    bdnatureList:Array
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入医院名称", trigger: "blur" }],
        level: [{ required: true, message: "请输入医院等级", trigger: "blur" }],
        type: [{ required: true, message: "请输入医院类型", trigger: "blur" }],
        hi_type: [{ required: true, message: "请输入医保类型", trigger: "blur" }],
        tel: [{ required: true, message: "请输入医院联系电话", trigger: "blur" }],
      },
      sort: [],
      areaFirstList:areaData,
      areaSecondList:[],
      areaThreeList:[],
      getFileNames: (fileName, file) => {
        this.ruleForm.logo = file;
        this.$forceUpdate()
      },
      keyword:"",
      zoom:10,
      address:"",
      showMapDialog:false,
    };
  },
  created() {
    this.handReadArea(this.areaFirstList)
  },
  watch: {
    ruleForm(val,old) {
      this.handReadArea(this.areaFirstList)

    },
    areaFirstList:{
      handler: function(newData,oldData) {
        //判断是新建还是其他 新建不做处理
        this.handReadArea(newData)
      },
      deep: true
    }
    // "ruleForm.province_id":{
    //   handler:function(val){
    //     console.log("新数据",val);
    //   }
    // }
  },
  methods: {
    openMap(){
      this.showMapDialog = true
    },
    handleMapDialog(e){
      //删除遮罩层  有点体验度需要优化
      let v_modal = document.getElementsByClassName("v-modal")
      while(v_modal.length > 0){
        v_modal[0].parentNode.removeChild(v_modal[0]);
      }
      if(e.type === "close"){
        //取消
        this.showMapDialog = false
      }else if(e.type === "enter"){
        //确定
        this.showMapDialog = false
        this.ruleForm.address = e.data.address
        this.ruleForm.position = e.data.position
        this.$forceUpdate()
      }
    },
    handReadArea(newData){
      if(this.ruleForm.title === "新建"){
        return
      }
      //开始处理区域三级
      let province_id = this.ruleForm.province_id
      let city_id = this.ruleForm.city_id
      let district_id = this.ruleForm.district_id
      for (let provinceindex = 0; provinceindex < newData.length; provinceindex++) {
        let provinceelement = newData[provinceindex];//省级
        if(provinceelement.id === province_id){
          let cityelement = provinceelement.children//
          this.areaSecondList = cityelement
          for (let cityindex = 0; cityindex < cityelement.length; cityindex++) {
            let citydo = cityelement[cityindex];
            if(citydo.id === city_id){
              this.areaThreeList = citydo.children//
            }
          }
        }
      }
    },
    chooseFirstArea(e){
      //清空2  3 级的联动数据
      this.areaSecondList = [];
      this.areaThreeList = [];
      //联动处理二级地区
      for (let index = 0; index < this.areaFirstList.length; index++) {
        const item = this.areaFirstList[index];
        if(item.id === e){
          this.areaSecondList = item.children
          //设置选择的一级地区
          this.ruleForm.province_id = e
          this.ruleForm.city_id = ""
          this.ruleForm.district_id = ""
          this.$forceUpdate()
          return
        }
      }
    },
    chooseSecondArea(e){
       //清空3 级的联动数据
      this.areaThreeList = [];
      //联动处理3级地区
      for (let index = 0; index < this.areaSecondList.length; index++) {
        const item = this.areaSecondList[index];
        if(item.id === e){
          this.areaThreeList = item.children
          //设置选择的2级地区
          this.ruleForm.city_id = e
          this.ruleForm.district_id =""
          this.$forceUpdate()
          return
        }
      }
    },
    chooseThreeArea(e){
      //设置选择的3级地区
      this.ruleForm.district_id = e
      this.$forceUpdate()
    },
    // loadAreaList(){
    //   API.getAreaList().then((res) => {
    //     if(res.code === 200){
    //       if(res.data){
    //         this.areaFirstList = res.data
    //         //如果不是新建 处理三级每一级地区联动 初始化显示地区
    //       }
    //     }
    //   });
    // },
    handArea(){
      //处理area
      let area = {
          province: {
              name: '',
              simple: ''
          },
          city: {
              name: '',
              simple: '',
          },
          district: {
              name: '',
              simple: ''
          }
      }
      let provincedo = this.areaFirstList[this.ruleForm.province_id]
      for (let provinceindex = 0; provinceindex < this.areaFirstList.length; provinceindex++) {
        let provinceelement = this.areaFirstList[provinceindex];
        if(provinceelement.id === this.ruleForm.province_id){//省级

          area.province.name = provinceelement.name
          area.province.simple = provinceelement.simple

          let cityelement = provinceelement.children
          for (let cityindex = 0; cityindex < cityelement.length; cityindex++) {
            let citydo = cityelement[cityindex];
            if(citydo.id === this.ruleForm.city_id){
              area.city.name = citydo.name
              area.city.simple = citydo.simple
              let districtdo = citydo.children
              for (let index = 0; index < districtdo.length; index++) {
                let element = districtdo[index];
                if(element.id === this.ruleForm.district_id){
                  area.district.name = element.name
                  area.district.simple = element.simple
                  return area
                }

              }

            }

          }
        }
      }
      return area
    },
    handleDialog(val) {
      if (val === "enter") {
        if(this.ruleForm.title === "查看"){
          this.ruleForm.visible = false;
          return
        }
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if(!this.ruleForm.province_id){
              this.$message.error('请选择省级');
              return 
            }
            if(!this.ruleForm.city_id){
              this.$message.error('请选择市级');
              return 
            }
            if(!this.ruleForm.district_id){
              this.$message.error('请选择区级');
              return 
            }
            if(!this.ruleForm.position.lng){
              this.$message.error('请选择经纬度');
              return 
            }
            if(!this.ruleForm.logo){
              this.$message.error('请上传医院LOGO');
              return 
            }
            if(!this.ruleForm.address){
              this.$message.error('请选择医院详细地址');
              return 
            }
            //开始处理区域
            let area =this.handArea()
            this.ruleForm.area = area;
            this.$emit("event", this.ruleForm);
          } else {
            return false;
          }
        });
      } else {
        this.ruleForm.visible = false;
      }
    },
    handler ({BMap, map}) {
        let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            //console.log(r,map);
            _this.ruleForm.position = {lng: r.point.lng, lat: r.point.lat};		// 设置center属性值  必须设置zoom属性才能切换到当前视图
            _this.zoom = 19;//缩放至最大
            // _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};		// 自定义覆盖物
            // _this.initLocation = true;
        },{enableHighAccuracy: true})

        this.map = map;
    },
    //点击地图监听
    //https://blog.csdn.net/zhy18820612/article/details/95059593
    clickEvent(e){
        //console.log(e);
        this.ruleForm.position = {lng: e.point.lng, lat: e.point.lat};
        // this.map.clearOverlays();
        // let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
        // var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: Icon_0});
        // this.map.addOverlay(myMarker);
        // //用所定位的经纬度查找所在地省市街道等信息
        let point = new BMap.Point(e.point.lng, e.point.lat);
        let gc = new BMap.Geocoder();
        let _this = this;
        gc.getLocation(point, function (rs) {
            let addComp = rs.addressComponents;
            //console.log("地址信息",rs);//地址信息
            _this.address = rs.address

        });
        // this.locData.longitude = e.point.lng;
        // this.locData.latitude = e.point.lat;
    },
    //定位成功回调
    getLoctionSuccess(point, AddressComponent, marker){
        console.log(point, AddressComponent, marker);
        // this.map.clearOverlays();
        // let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
        // var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat),{icon: Icon_0});
        // this.map.addOverlay(myMarker);
        // this.locData.longitude = point.point.lng;
        // this.locData.latitude = point.point.lat;
    },
  },
};
</script>
<style lang="scss" scope>
.labelred{
  color: #cf2727;
  margin-right: 4px;
}
.specialMs {
  .inputorder {
    width: 30%;
  }
  .left{
    width: 70%;
    display: inline-block;
  }
  .right{
    width: 20%;
    display: inline-block;
    background: brown;
    margin-left: 5px;
    
  }
  .img-block {
    width: 25% !important;
  }
  .rowform {
    display: flex;
    .maginRight {
      margin-right: 10px;
    }
  }
  .el-form-item__label{
        text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    width: 120px !important;
  }
  .el-form-item__content{
        margin-right: 30px;
        margin-left: 120px !important;
  }
  .position{
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    .baiduposition{
      width: 100%;
      height: 100%;
    }
  }
  .bmControl{
    display: flex;
  }

}
</style>
