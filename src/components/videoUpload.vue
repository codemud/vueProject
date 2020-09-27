<template>
  <div class="video">
    <input v-if="visible"
           :disabled="disabled"
           class="file"
           type="file"
           accept="video/*"
           @change="fileChange($event)">
    <el-button type="primary"
               :disabled="disabled">{{video_id?'修改视频文件':'选择视频文件'}}</el-button>
    <span class="tipText">{{coverImg ?(video_id|| tipText) : "请先上传封面"}}</span>
    <el-progress v-show="showProgress"
                 :text-inside="true"
                 :stroke-width="20"
                 :percentage="authProgress"></el-progress>
  </div>
</template>
<script>
import API from '@/api/sts'
export default {
  props: {
    coverImg: String,
    start: Boolean,
    video_id: String,
    visible: Boolean
  },
  data () {
    return {
      file: null,
      authProgress: 0,
      uploader: null,
      tipText: "",
      videoInfo: {},
      showProgress: false,
      disabled: false
    }
  },
  watch: {
    start (val) {
      if (val) {
        this.disabled = true
        if (this.file) {
          this.authUpload()
        } else {
          this.$emit('getVideoId', this.video_id)
        }
      } else {
        this.disabled = false
        this.showProgress = false
        this.authProgress = 0
      }
    },
    visible (val) {
      if (!val) {
        this.tipText = ""
      }
    }
  },
  created () {
    this.getVideoSet()
  },
  methods: {
    getVideoSet () {
      API.getVideoSet().then(res => {
        if (res.code === 200) {
          this.videoInfo = res.data
        }
      })
    },
    fileChange (e) {
      this.file = e.target.files[0]
      if (this.file) {
        if (this.file.size / 1024 / 1024 / 1024 > 5) {
          return this.$message.warning('视频文件大小不能超过5G!')
        }
        if (this.file.type.split("/").shift() !== 'video') {
          return this.$message.warning('请选择视频文件格式!')
        }
        if (!this.coverImg) {
          return this.$message.warning('请先上传视频封面!')
        }
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
        }
        this.uploader = this.createUploader();
        this.uploader.addFile(this.file, null, null, null, userData)
      }
    },
    authUpload () {
      // 调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload()
      }
    },
    // 暂停上传
    pauseUpload () {
      if (this.uploader !== null) {
        this.uploader.stopUpload()
      }
    },
    // 恢复上传
    resumeUpload () {
      if (this.uploader !== null) {
        this.uploader.startUpload()
      }
    },
    createUploader () {
      let that = this
      let { timeout, partSize, parallel, retryCount, retryDuration, region, account } = this.videoInfo
      let uploader = new AliyunUpload.Vod({
        timeout: timeout || 60000,
        partSize: partSize || 1048576,
        parallel: parallel || 5,
        retryCount: retryCount || 3,
        retryDuration: retryDuration || 2,
        region: region,
        userId: account.userid,
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
          that.tipText = uploadInfo.file.name
          that.$emit('filename', uploadInfo.file.name)
        },
        // 开始上传
        onUploadstarted: uploadInfo => {
          that.showProgress = true
          that.getVideoOss(uploadInfo).then(res => {
            let { UploadAuth, UploadAddress, VideoId } = res
            uploader.setUploadAuthAndAddress(uploadInfo, UploadAuth, UploadAddress, VideoId);
          })
        },
        // 文件上传成功
        onUploadSucceed: uploadInfo => {
          this.videoInfo.videoId = uploadInfo.videoId
          that.$emit('getVideoId', uploadInfo.videoId)
        },
        // 文件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          that.$message.warning('文件上传失败!')
        },
        // // 取消文件上传
        onUploadCanceled: (uploadInfo, code, message) => {
          console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          that.$message.warning('文件已暂停上传!')
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: (uploadInfo, totalSize, progress) => {
          let progressPercent = Math.ceil(progress * 100)
          that.authProgress = progressPercent
        },
        // 上传凭证超时
        onUploadTokenExpired: (uploadInfo) => {
          that.getVideoOss(uploadInfo).then(res => {
            let { UploadAuth, UploadAddress, VideoId } = res
            uploader.resumeUploadWithAuth(uploadInfo, UploadAuth, UploadAddress, VideoId);
          })
          that.$message.warning('文件超时...')
        },
        // 全部文件上传结束
        onUploadEnd: () => {
          that.tipText = ""
          that.$message.success('文件上传完毕!')
        }
      })
      return uploader
    },
    random_string (len) {// 获取随机字母
      len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    getVideoOss (uploadInfo) { //获取凭证
      return new Promise(resolve => {
        const file = uploadInfo.file
        const type = file.name.split('.').pop()
        const title = `${this.random_string(4)}_${Math.ceil(new Date().getTime() / 1000)}`
        const fullname = title + '.' + type
        let fileInfo = {
          title,
          fullname,
          description: "名医在播",
          cover: this.coverImg
        }
        API.getVideoOSS(fileInfo).then(resp => {
          if (resp.code === 200) {
            resolve(resp.data)
          } else {
            this.$message.warning('获取上传认证失败!')
          }
        })
      })

    }
  }
}
</script>
<style lang="scss" scoped>
.video {
  position: relative;
  .file {
    position: absolute;
    width: 130px;
    height: 40px;
    outline: none;
    background: red;
    opacity: 0;
  }
  .el-progress {
    margin-top: 10px;
  }
  .tipText {
    margin-left: 10px;
  }
}
</style>