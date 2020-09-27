<template>
    <div class="elLayout">
        <elNavBar class="elNavBar" :collapse="collapse"/>
        <div class="elRight"
             :style="'width:' + getViewWidth + 'px'">
            <elHeader class="elHeader" :collapse="collapse" @collapse="getCollpValue" @openMenubars="handleMenuBars"/>
            <elMain class="elMain" :style="'height:' + (getViewHeight - 50) + 'px;background:'+skin.headerColor" :showMenubars="showTabs"/>
        </div>
    </div>
</template>

<script>
    import elHeader from "./header";
    import elNavBar from "./navBar";
    import elMain from "./main";

    export default {
        components: {
            elHeader,
            elNavBar,
            elMain
        },
        data() {
            return {
                getViewWidth: document.documentElement.clientWidth,
                getViewHeight: document.documentElement.clientHeight,
                collapse: true,
                skin: this.$store.state.main.skin,
                showTabs: true
            };
        },
        mounted() {
            window.onresize = () => {
                this.getViewWidth = document.documentElement.clientWidth;
                this.getViewHeight = document.documentElement.clientHeight;
                if (this.getViewWidth <= 1120) {
                    this.collapse = false
                }
            };
            const tabs_nav = document.querySelector(".elMain .el-tabs__nav")
            tabs_nav.style.background = this.skin.headerColor
        },
        methods: {
            getCollpValue(val) {
                this.collapse = !val;
            },
            handleMenuBars() {
                this.showTabs = !this.showTabs
            },
        }
    };
</script>
<style lang="scss" scope>
    @import "@/assets/css/layout";

    .elLayout {
        display: flex;

        .elNavBar {
            height: 100vh;
            border-right: 0;
            box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
        }

        .elRight {
            height: 100vh;
            display: flex;
            flex-direction: column;

            .elHeader {
                height: $headerHeight;
            }
        }

        .elMain {
            background: #f0f2f5;
        }
    }
</style>
