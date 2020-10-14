<template>
    <div>
        <div class="navbar_menu">
            <el-menu :router="true"
                     :default-active="$route.path"
                     :background-color="skin.navBarColor"
                     text-color="#909399"
                     active-text-color="#fff"
                     :collapse="!collapse"
                     :unique-opened="true"
                     ref="elmenu">
                <div class="navbar_logo">
                    后台管理系统
                </div>
                <el-submenu v-for="(m, key) in menuList"
                            :index="m.path"
                            :key="key">
                    <template slot="title">
                        <i :class="m.meta.icon"></i>
                        <span slot="title">{{ m["meta"].parentName }}</span>
                    </template>
                    <el-menu-item v-for="(ml, key) in m.children"
                                  :index="ml.path"
                                  :key="key"
                                  @click="handleSetMenuBar(ml)">
                        {{ ml.name }}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import menuList from "@/router/module/menu";

    export default {
        props: {
            collapse: Boolean
        },
        data() {
            return {
                skin: this.$store.state.main.skin,
                menuList: menuList()
            };
        },
        methods: {
            handleSetMenuBar(item) {
                this.$store.dispatch("setMenuBar", {path: item.path, name: item.name})
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/css/layout";

    .navbar_menu {
        overflow-y: scroll;
        height: 100%;
    }

    .navbar_menu::-webkit-scrollbar {
        display: none;
    }

    .el-menu {
        user-select: none;
        height: 100%;

        .navbar_logo {
            height: $headerHeight;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 16px;

            .logo {
                width: 70%;
            }
        }

        &:not(.el-menu--collapse) {
            width: $navbarWidth;
        }
    }
</style>
