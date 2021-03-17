<template>
  <div class="myMain">
    <div class="tabs"
         @contextmenu.prevent="rightClick($event)"
         @dblclick="dblclickMenu($event)">
      <el-tabs class="eltab"
               v-model="sto_main.menuBarCurrentPath"
               type="card"
               closable
               @tab-click="clickTab"
               @tab-remove="removeTab"
               v-show="showTabs">
        <el-tab-pane v-for="item in editableTabs"
                     :key="item.path"
                     :label="item.name"
                     :name="item.path">
        </el-tab-pane>
      </el-tabs>
    </div>
    <keep-alive :include="includeComponents">
      <router-view v-if="!!$store.state.user.user.name"></router-view>
    </keep-alive>
    <transition name="el-fade-in">
      <ul class="menuAlert"
          :style="`left:${menuX}px;top:${menuY}px`"
          v-show="showMenuAlert">
        <li @click="$router.go(0)"><i class="el-icon-refresh"></i> 刷新</li>
        <li @click="onRemoveOther"><i class="el-icon-close"></i> 关闭其他</li>
        <li @click="onRemoveAll"><i class="el-icon-circle-close"></i> 关闭全部</li>
      </ul>
    </transition>
  </div>
</template>
<script>
import anime from 'animejs'
export default {
  props: ["showMenubars"],
  data () {
    return {
      sto_main: this.$store.state.main,
      editableTabs: this.$store.state.main.menuBar,
      tabIndex: '1',
      menuX: 0,
      menuY: 0,
      showMenuAlert: false,
      currentMenuPath: "/",
      showTabs: true
    }
  },
  computed: {
    includeComponents () {
      let pathes = []
      this.$store.state.main.menuBar.forEach(e => {
        pathes.push(e.path.split("/").pop())
      });
      return pathes
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.showMenuAlert = false
    })
  },
  watch: {
    '$store.state.main.menuBar' (val) {
      this.editableTabs = val;
    },
    showMenubars (val) {
      val ? this.handleOpenMenu() : this.handleCloaseMenu()
    }
  },
  methods: {
    clickTab () {
      if (this.sto_main.menuBarCurrentPath != this.$route.path) {
        this.$router.push(this.sto_main.menuBarCurrentPath)
      }
    },
    removeTab (targetName) {
      let tabs = this.editableTabs;
      let activeName = this.sto_main.menuBarCurrentPath;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.path;
            }
          }
        });
      }
      this.editableTabs = tabs.filter(tab => tab.path !== targetName);
      this.$store.dispatch("removeMenuBar", { menuBar: this.editableTabs, path: activeName })
      if (activeName != this.$route.path) {
        this.$router.push(activeName)
      }
    },
    rightClick (e) {
      if (e.target.id) {
        this.showMenuAlert = true
        this.menuX = e.clientX
        this.menuY = e.clientY
        this.currentMenuPath = e.target.id.split("-")[1]
      }
    },
    dblclickMenu (e) {
      e.target.id && this.removeTab(e.target.id.split("-")[1])
    },
    onRemoveAll () {
      this.editableTabs = [{ name: "首页", path: "/" }]
      this.$store.dispatch("removeMenuBar", { menuBar: [{ name: "首页", path: "/" }], path: "/" })
      this.$router.push("/")
    },
    onRemoveOther () {
      if (this.currentMenuPath == '/') {
        this.onRemoveAll()
      } else {
        const current = this.editableTabs.find(f => f.path == this.currentMenuPath)
        this.editableTabs = [{ name: "首页", path: "/" }, current]
        this.$store.dispatch("removeMenuBar", { menuBar: [{ name: "首页", path: "/" }, current], path: this.currentMenuPath })
        if (this.currentMenuPath != this.$route.path) {
          this.$router.push(this.currentMenuPath)
        }
      }
    },
    handleCloaseMenu () {
      const that = this
      anime({
        targets: '.myMain .eltab',
        opacity: 0,
        easing: 'easeInOutSine',
        duration: 200,
        complete: function () {
          that.showTabs = false
        }
      });
      anime({
        targets: '.myMain .tabs',
        height: 0,
        marginTop: "-10px",
        easing: 'easeInOutSine',
        duration: 300,
        delay: 100
      });
    },
    handleOpenMenu () {
      const that = this
      anime({
        targets: '.myMain .tabs',
        height: '50px',
        marginTop: 0,
        easing: 'easeInOutSine',
        duration: 300,
        complete: function () {
          that.showTabs = true
        }
      });
      anime({
        targets: '.myMain .eltab',
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 200,
        delay: 200,
      });

    }
  },
}
</script>
<style lang="scss" scoped>
.myMain {
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #eaeaea;
  }

  .menuAlert {
    width: 100px;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 2;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 4px;
    li {
      font-size: 12px;
      user-select: none;
      cursor: pointer;
      width: 100%;
      height: 30px;
      display: inline-flex;
      align-items: center;
      padding-left: 13px;
      box-sizing: border-box;
      &:hover {
        background: #eceff4;
        color: #3c5b92;
        border-radius: 2px;
      }
      i {
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }
  .menu_jt {
    font-size: 20px;
    position: absolute;
    top: 0;
    font-size: 30px;
  }
  .float_right {
    float: right;
  }
  .box-card {
    width: 96%;
    margin: 0 auto;
    margin-top: 1.5%;
    &:nth-child(2) {
      margin-bottom: 2%;
    }
    .el-form {
      width: 100%;
      .el-form-item {
        margin: 0 10px;
        margin-bottom: 10px;
      }
    }
    .add {
      margin-top: 30px;
      margin-left: 20px;
    }
  }
  .el-card.is-always-shadow {
    box-shadow: 0 2px 10px 0 rgba(119, 119, 119, 0.08);
  }
  .bo_form {
    .el-form-item__content {
      margin-right: 30px;
    }
    .img-block {
      width: 40%;
      height: 98px;
      border-radius: 4px;
      border: 1px dashed #ccc;
      padding: 2px;
      box-sizing: border-box;
      position: relative;
      &:hover {
        border-color: #1b6cc0;
      }
      .img {
        width: 100%;
        height: 100%;
      }
      .plus {
        font-size: 40px;
        text-align: center;
        height: 98px;
        line-height: 98px;
        color: #bfbcbc;
      }
      .hiddenInput {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .avatar {
      width: 98px;
      height: 98px;
      display: block;
    }
  }
  .el-table__body-wrapper {
    overflow-y: scroll !important;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #ccc;
    }
    &::-webkit-scrollbar-track {
      border-radius: 0;
    }
  }
  .tabs {
    box-sizing: border-box;
    padding-left: 2%;
    padding-top: 10px;
    background: #fff;
    height: 50px;
    .el-tabs {
      width: 100%;
      position: relative;
    }
    .el-tabs__header {
      position: absolute;
      width: 100%;
    }
    .el-tabs--card > .el-tabs__header,
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: 0;
    }
    .el-tabs__item.is-active {
      background: transparent;
      border-bottom: 0;
    }
    .el-tabs__item {
      border-top: 1px solid #e4e7ed;
      border-bottom: 1px solid #e4e7ed;
      background: #fff;
      border-radius: 2px;
      user-select: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
      border-left: 1px solid #e4e7ed;
      .el-icon-close {
        display: none;
      }
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
      border-right: 1px solid #e4e7ed;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      background: #3c5b92;
      text-align: center;
      color: #fff;
    }
  }
}
.el-radio__inner,
.el-checkbox__inner {
  border-color: #3c5b92;
}
</style>
