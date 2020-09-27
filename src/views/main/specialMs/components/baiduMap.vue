<template>
  <div v-dialogDrag>
    <el-dialog
      class="dialog"
      :title="dialogMap.title"
      :visible.sync="dialogMap.visible"
      :width="dialogMap.width"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="handleClick('close')"
    >
      <slot></slot>
      <div class="tpl">
        <div class="lefttext">
          <span class="areatext">
            <span class="labelred">*</span>医院详细地址
          </span>
        </div>
        <div class="righttext">
          <el-input ref v-model="keyword" placeholder="请输入医院详细地址"></el-input>
        </div>
      </div>

      <div class="divmap">
        <baidu-map
          class="map"
          :center="center"
          :scroll-wheel-zoom="true"
          @click="choosePoint"
          @ready="handlerMap"
          @rightclick="rightClick"
          :zoom="zoom"
        >
          <bm-marker
            :position="center"
            :dragging="true"
            @dragend="dragend"
            animation="BMAP_ANIMATION_BOUNCE"
          >
            <!-- <bm-label v-if="showRightMenu" :content="'设置当前地址'" :labelStyle="{color: 'red',fontSize : '16px'}" :offset="{width: -35, height: 30}"/>
            <bm-label v-else :content="'点击或拖动选择地址'" :labelStyle="{ fontSize : '16px'}" :offset="{width: -35, height: 30}"/>-->
          </bm-marker>
          <bm-context-menu>
            <bm-context-menu-item :callback="setPoint" text="设置当前地址"></bm-context-menu-item>
          </bm-context-menu>
          <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
            @locationSuccess="getLoctionSuccess"
          ></bm-geolocation>
        </baidu-map>
      </div>
      <span slot="footer" class="dialog-footer" v-show="!dialogMap.footHide">
        <el-button @click="handleClick('close')" v-if="!dialogMap.hideClose">取 消</el-button>
        <el-button
          type="primary"
          :loading="dialogMap.loading"
          @click="handleClick('enter')"
          v-if="!dialogMap.hideEnter"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  props: {
    dialogMap: Object,
    ruleForm:Object
  },
  data() {
    let ruleForm = this.ruleForm
    if(!ruleForm){
      ruleForm = {}
    }
    return {
      center:ruleForm.position?ruleForm.position: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      keyword: ruleForm.address?ruleForm.address:"",
      showRightMenu: false,
      map: {},
      point: ruleForm.address?ruleForm.address:{}, //只在右键点击确认设置点  处理编辑的时候
    };
  },
  watch: {
    dialogMap: {
      handler(val) {
        if (val.visible && val.height) {
          this.$nextTick(() => {
            let el = document.querySelector(".dialog .el-dialog__body");
            el.style.height = val.height;
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handlerMap({ BMap, map }) {
      let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (r) {
          //console.log(r,map);
          //_this.center = r.point;
        },
        { enableHighAccuracy: true }
      );

      this.map = map;
    },
    getLoctionSuccess(target) {
      this.center = target.point;
      // this.locData.latitude = point.point.lat;
    },
    handleClick(type) {
        if(type === "enter"){
            Message.closeAll();
            if(!this.keyword){
                this.$message.error("请输入医院详细地址");
                return
            }
            if(!this.point.lng){
                this.$message.error("请选择经纬度");
                return
            }
        }
      this.$emit("events", {type:type,data:{address:this.keyword,position:this.center}});
    },
    dragend(target) {
      this.setCenter(target);
    },
    rightClick(target) {
      this.showRightMenu = true;
    },
    setPoint(target) {
      this.setCenter(target);
      this.point = target.point;
    },
    choosePoint(target) {
      this.setCenter(target);
      this.showRightMenu = true;
    },
    setCenter(target) {
      this.center = target.point;
    //   this.$message({
    //     message: "设置经纬度成功",
    //     type: "success",
    //   });
      //通过经纬度获取详细地址
    },
  },
};
</script>
<style lang="scss">
.divmap {
  width: 100%;
  height: 500px;
  z-index: 999;
  .map {
    width: 100%;
    height: 100%;
  }
  
}

.el-dialog {
  margin-top: 7vh !important;
}
.el-dialog__body {
  padding: 10px 20px !important;
  // height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
  }
  .tpl {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
    .lefttext {
        width: 16%;
      .areatext {
        font-size: 16px;
        .labelred {
          color: #cf2727;
          margin-right: 4px;
        }
      }
    }
    .righttext{
        width: 75%;
    }
  }
}
@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
  &:hover {
    animation: myfirst 1s;
  }
}
</style>
