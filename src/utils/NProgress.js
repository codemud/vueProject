import { Loading } from "element-ui";
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
NProgress.configure({ showSpinner: false })
const loading = {
  loadingInstance: null,
  open () {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: ".el-table__empty-block",
        text: "拼命加载中",
        background: "#fff"
      });
    }
  },
  close () {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  }
};
function close () {
  NProgress.done()
  loading.close()
}
export { NProgress, close, loading }