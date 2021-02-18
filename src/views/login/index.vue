<template>
    <div class="login">
        <div class="container">
            <img class="img_ysj" src="@/assets/img/login_rsj.png" alt="">
            <div class="l_left">
                <img src="@/assets/img/login_img.png" alt="">
            </div>
            <div class="l_block">
                <h1 class="title">后台管理系统</h1>
                <el-input placeholder="请输入账户" v-model="name" clearable @keyup.enter.native="login">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"/>
                </el-input>
                <el-input placeholder="请输入密码" v-model="password" type="password" show-password clearable @keyup.enter.native="login">
                    <i slot="prefix" class="el-input__icon el-icon-lock"/>
                </el-input>
                <div class="checkbox">
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                </div>
                <el-button type="success" @click="login" :loading="isload">登 录
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: "",
                password: "",
                isload: false,
                remember: false
            };
        },
        methods: {
            login() {
                this.isload = true;
                let remember = this.remember ? 1 : 0;
                let msg = [this.name, this.password, remember];
                this.$store.dispatch("loginin", msg).then(res => {
                    this.isload = false;
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
    };
</script>
<style lang="scss" scoped>
    .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background-image: linear-gradient(to right, #2e77bb, #34cfbd);
        background-image: url("../../assets/img/bg.png");
        background-color: #0088f4;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            width: 60%;
            height: 60%;
            background: #fff;
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding: 0 50px;
            box-sizing: border-box;
            position: relative;
            box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);

            .img_logo {
                position: absolute;
                top: 0;
                left: 0;
                margin: 10px;
                /*background: #128bf1;*/
                width: 15%;
                padding: 6px;
                border-radius: 4px;
            }

            .img_ysj {
                position: absolute;
                width: 22%;
                right: 1px;
                top: 1px;
                z-index: 0;
            }

            .l_left {
                width: 50%;

                img {
                    width: 90%;
                }
            }
        }

        .l_block {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;

            .title {
                color: #128bf1;
            }

            .el-input {
                width: 70%;
                margin-top: 5%;

                &:nth-child(2) {
                    margin-top: 10%;
                }

                .el-input__inner {
                    background: transparent;
                }

                .el-input__inner:focus {
                    border-color: #128bf1;
                }
            }

            .checkbox {
                margin-top: 5%;
                width: 70%;

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
                width: 70%;
                background: #128bf1;
                border-color: #128bf1;
                border-radius: 0;
                margin-top: 10%;
                border-radius: 4px;

                &:active {
                    background: #1270f1;
                    border-color: #1270f1;
                }
            }
        }
    }
</style>
