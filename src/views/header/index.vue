<template>
    <div class="header">
        <div class="onepart">
            <div class="left">
                <i class="icon" :class="collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="closeCollapse"/>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="bread" v-show="$route.name">
                    <el-breadcrumb-item>{{ $route.meta.parentName }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="right">
                <!-- 搜索 -->
                <el-select class="serach_ani"
                           v-show="showSelect"
                           v-model="value"
                           filterable
                           remote
                           reserve-keyword
                           placeholder="请输入菜单"
                           clearable
                           :remote-method="remoteMethod"
                           @change="handleChange">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <i class="el-icon-search icon" @click="handleShowSearch"/>
                <!-- 菜单展开 -->
                <i class="el-icon-menu icon" @click="handleMenuBars"/>
                <!-- 换肤 -->
                <i class="el-icon-brush icon" @click="handleSkin"/>
                <!-- 全屏 -->
                <div class="icon" @click.prevent="handleFullscreen">
                    <img :src="require('@/assets/img/'+fsImgName+'.png')" alt="">
                </div>

                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <el-avatar class="headimg" shape="square" icon="el-icon-user-solid" src=""/>
                        <span class="username ellipsis">{{ $store.state.user.user.name }}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-edit" command="update">
                            修改密码
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="exit">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <Dialog :dialog="dialog"
                @events="handleDialogEvent">
            <ul class="skin">
                <li v-for="(skin, i) in skins"
                    :key="i"
                    :style="'background:' + skin.navBarColor"
                    @click="handleCheckSkin(skin, i)">
                    {{ skin.txt }}
                </li>
            </ul>
        </Dialog>
        <Dialog :dialog="dialogUpdate" @events="handleDialogUpdate">
            <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldpassword">
                    <el-input type="password" v-model="passwordForm.oldpassword" autocomplete="off" placeholder="请输入原密码"/>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="passwordForm.password" autocomplete="off" placeholder="请输入新密码"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpassword">
                    <el-input type="password" v-model="passwordForm.checkpassword" autocomplete="off" placeholder="确认密码"/>
                </el-form-item>
            </el-form>
        </Dialog>
    </div>
</template>
<script>
    import anime from 'animejs'
    import Dialog from "@/components/dialog";
    import data from "@/data/header.json";
    import mainMenu from "@/router/module/main";
    import {fullScreen, exitFullscreen} from '@/utils/variables'
    import { updatePassword } from "@/api/login";

    export default {
        components: {
            Dialog
        },
        props: ['collapse', "showTabs"],
        data() {
            var validatePass = (rule, value, callback) => {
                if (this.passwordForm.checkpassword !== '') {
                    this.$refs.passwordForm.validateField('checkpassword');
                }
                callback();
            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.passwordForm.password) {
                    callback(new Error('您输入的密码不匹配!'));
                } else {
                    callback();
                }
            };
            return {
                skinsActive: 0,
                skins: data,
                dialog: {
                    title: "切换皮肤",
                    visible: false,
                    hideClose: true,
                    hideEnter: true,
                    width: "30%"
                },
                passwordForm:{},
                dialogUpdate: {
                    title: "修改密码",
                    visible: false,
                    width: "30%"
                },
                fsImgName: 'fullscreen_alt',
                options: [],
                value: [],
                list: [],
                states: [],
                showSelect: false,
                isAnimaComplete: false,
                rules: {
                    password: [{required: true, message: "请输入新密码", trigger: "blur"},{ validator: validatePass, trigger: 'blur' }],
                    checkpassword: [{required: true, message: "请再次输入密码", trigger: "blur"},{ validator: validatePass2, trigger: 'blur' }],
                    oldpassword: [{required: true, message: "请输入原密码", trigger: "blur"}]
                }
            };
        },
        mounted() {
            // let arry = this.$store.state.user.user.menu
            let arry = mainMenu;
            arry.forEach(e => {
                this.states.push(...e.children)
            });
            this.list = this.states.map(item => {
                return {value: item.path, label: item.name};
            });
        },
        methods: {
            closeCollapse() {
                this.$emit("collapse", this.collapse);
            },
            handleCheckSkin(item, i) {
                if (this.$store.state.main.skin.navBarColor !== item.navBarColor) {
                    this.skinsActive = i;
                    this.$store.dispatch("updateSkin", item);
                    location.reload()
                }
            },
            handleFullscreen() {
                if (this.fsImgName === 'fullscreen_alt') {
                    fullScreen();
                    this.fsImgName = 'fullscreen_exit_alt'
                } else {
                    this.fsImgName = 'fullscreen_alt';
                    exitFullscreen()
                }
            },
            handleSkin() {
                this.dialog.visible = true;
            },
            handleDialogEvent() {
                this.dialog.visible = false;
            },
            handleCommand(command) {
                switch (command) {
                    case "update":
                        this.dialogUpdate.visible = true; // 打开修改密码弹窗
                        break;
                    case "exit":
                        this.handleLogout();
                        break;
                    default:
                        break;
                }
            },
            handleDialogUpdate(val){
                if (val === "enter") {
                    this.$refs["passwordForm"].validate(valid => {
                        if (valid) {
                            updatePassword({oldpassword:this.passwordForm.oldpassword,password:this.passwordForm.password}).then(res=>{
                                if(res.code === 200){
                                    this.dialogUpdate.visible = false;
                                    this.$store.dispatch("loginout").then(res => {
                                        if (res) {
                                            this.$message.success({
                                                message: "修改成功",
                                                duration: 1000,
                                                onClose: () => {
                                                    this.$router.push('/login', () => {
                                                        location.reload()
                                                    })
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.dialogUpdate.visible = false;
                }
            },
            handleLogout() {
                this.$confirm("是否退出登录？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        // 退出登录
                        this.$store.dispatch("loginout").then(res => {
                            if (res) {
                                this.$message.success({
                                    message: "退出成功",
                                    duration: 1000,
                                    onClose: () => {
                                        this.$router.push('/login', () => {
                                            location.reload()
                                        })
                                    }
                                });
                            }
                        });
                    })
                    .catch(() => {
                    });
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.options = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                } else {
                    this.options = [];
                }
            },
            setAnimate() {
                const that = this
                if (this.isAnimaComplete) {
                    this.showSelect = this.isAnimaComplete
                }
                anime({
                    targets: '.serach_ani',
                    width: that.isAnimaComplete ? ['50px', '180px'] : ['180px', '50px'], // -> from '28px' to '100%',
                    easing: 'easeInOutQuad',
                    duration: 500,
                    complete: function () {
                        if (!that.isAnimaComplete) {
                            that.showSelect = that.isAnimaComplete
                        }
                    }
                });
            },
            handleShowSearch() {
                this.isAnimaComplete = !this.isAnimaComplete;
                this.setAnimate()
            },
            handleChange(val) {
                if (val != this.$route.path) {
                    this.$router.push(val)
                }
            },
            handleMenuBars() {
                this.$emit("openMenubars")
            }
        },
    };
</script>
<style lang="scss" scope>
    @import "@/assets/css/element-variables.scss";
    @import "@/assets/css/layout.scss";

    .header {
        position: relative;

        .onepart {
            box-shadow: 0 2px 2px 0 rgba(119, 119, 119, 0.08);

            .left {
                display: flex;
                align-items: center;

                .bread {
                    margin-left: 10px;
                }

                .icon {
                    font-size: 22px;
                    width: $headerHeight;
                    height: $headerHeight;
                    line-height: $headerHeight;
                    text-align: center;

                    &:hover {
                        background: #f1f1f1;
                    }
                }
            }

            .right {
                position: absolute;
                top: 0;
                right: 3%;
                display: flex;
                align-items: center;

                .el-select {
                    width: 180px;
                    margin-right: 5px;
                }

                .el-dropdown {
                    width: 100px;
                    height: $headerHeight;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: #f8f8f8;
                    }
                }

                .el-dropdown-link {
                    display: flex;
                    align-items: center;
                    width: 90%;
                }

                .icon {
                    font-size: 22px;
                    width: 40px;
                    height: $headerHeight;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: #f8f8f8;
                    }
                }

                .headimg {
                    width: 50%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .username {
                    cursor: pointer;
                    margin-left: 10px;
                    width: 60%;
                }
            }

            .pwdInput {
                margin: 20px auto;
                width: 80%;
                display: flex;
            }
        }

        .skin {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            li {
                width: 30%;
                height: 50px;
                line-height: 50px;
                border-radius: 4px;
                margin-bottom: 10px;
                color: #fff;
                text-align: center;
                cursor: pointer;
            }
        }
    }
</style>
