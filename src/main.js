import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from "vue-clipboard2";
import echarts from 'echarts'

import "./assets/css/reset.css";
import "./utils/promise";
import * as variables from "./utils/variables"
import "./utils/drag";

import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.prototype.$variables = variables;
Vue.prototype.$echarts = echarts;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Ixarda9OtE1IgY0QfTUrrz7xATGhbong'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
