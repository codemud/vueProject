<template>
    <div class="login">
        <div class="wrapper">
            <div class="login-form">
                <div style="width: 90%;">
                    <h2 class="title">登录您的账号</h2>
                    <el-form :model="loginForm" label-position="top" label-width="80px" class="form-content">
                        <el-form-item label="账户">
                            <el-input placeholder="请输入账户" clearable v-model="loginForm.name" @keyup.enter.native="login">
                                <i slot="prefix" class="el-input__icon el-icon-user-solid"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" show-password clearable @keyup.enter.native="login">
                                <i slot="prefix" class="el-input__icon el-icon-lock"/>
                            </el-input>
                        </el-form-item>
                        <div style="display: flex;align-items: center;justify-content: space-between;">
                            <div class="checkbox">
                                <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
                            </div>
<!--                            <p style="color: #DFE2E6;cursor: pointer;">忘记密码</p>-->
                        </div>
                        <el-button type="success" @click="login" :loading="isLoad">登 录</el-button>
                    </el-form>
                </div>
            </div>
            <div class="img"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login_new",
        data() {
            return {
                loginForm: {
                    name: '',
                    password: "",
                    remember: false
                },
                isLoad: false
            }
        },
        methods: {
            login() {
                this.isLoad = true;
                let remember = this.loginForm.remember ? 1 : 0;
                let msg = [this.loginForm.name, this.loginForm.password, remember];
                this.$store.dispatch("loginin", msg).then(res => {
                    this.isLoad = false;
                    if (res) {
                        this.$message({
                            message: "登陆成功",
                            type: "success",
                            duration: 1000,
                            onClose: () => {
                                this.$router.push("/");
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F7F7F7;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrapper {
            background: #FFFFFF;
            height: 500px;
            width: 700px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            overflow: auto;
            display: flex;
            flex-wrap: nowrap;

            .login-form {
                width: 50%;
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                .title {
                    width: 100%;
                    text-align: left;
                    color: #252529;
                    margin-bottom: 20px;
                }
                .form-content {
                    width: 100%;
                    .el-form-item {
                        margin-bottom: 15px;
                        .el-form-item__label {
                            color: #6B6C6F;
                            line-height: 20px !important;
                        }
                    }
                }
                .el-form--label-top ::v-deep .el-form-item__label {
                    color: #6B6C6F;
                    line-height: 20px;
                }
                ::v-deep .el-input {
                    width: 100%;
                    .el-input__inner {
                        border-radius: 20px;
                        border: solid 1px #dfe2e6;
                        background: #ffffff;
                        box-shadow: 0 0 3px rgba(0,0,0,0.05);
                    }

                    .el-input__inner:focus {
                        border-color: #128bf1;
                    }
                }

                .checkbox {
                    .el-checkbox__input.is-checked + .el-checkbox__label {
                        color: #606266 !important;
                    }

                    .el-checkbox__input.is-checked .el-checkbox__inner {
                        background-color: #128bf1;
                        border-color: #128bf1;
                    }

                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #128bf1;
                    }
                }

                .el-button {
                    margin-top: 20px;
                    width: 100%;
                    border-radius: 20px;
                    background: #29b1cc;
                    border-color: #29b1cc;
                    box-shadow: 0 10px 20px rgba(41,177,204,0.3);
                    &:active {
                        background: #29b1cc;
                        border-color: #29b1cc;
                    }
                }
            }

            .img {
                width: 50%;
                background-image: url("../../assets/img/pexels-fauxels.jpg");
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
    }
</style>