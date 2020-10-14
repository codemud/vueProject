<template>
    <div class="home_page">
        <p class="title marginbottom_10"><i class="el-icon-cloudy"/>{{timeValue }}, {{$store.state.user.user.name}}</p>
        <p class="title">欢迎访问后台管理系统</p>
        <!-- <el-card class="box-card">
          <div class="echarts-dom"
               style="width:100%;height:376px"></div>
        </el-card> -->
    </div>
</template>
<script>
    import anime from 'animejs'

    export default {
        data() {
            return {
                timeValue: ""
            }
        },
        mounted() {
            const now = new Date();
            const hours = now.getHours();
            this.timeValue = "" + ((hours >= 12) ? "下午好 " : "上午好 ")
            // this.animateText()
            // this.getEchartData()
        },
        methods: {
            animateText() {
                anime({
                    targets: ".home_page .title li",
                    scale: [
                        {value: .1, easing: 'easeOutSine', duration: 300},
                        {value: 1, easing: 'easeInOutQuad', duration: 1000}
                    ],
                    delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
                });
            },
            getEchartData() {
                let myChart = this.$echarts.init(document.querySelector(".echarts-dom"));
                const ROOT_PATH = "https://echarts.apache.org/examples/"
                let option = {
                    backgroundColor: '#000',
                    globe: {
                        baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
                        heightTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
                        displacementScale: 0.04,
                        shading: 'realistic',
                        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
                        realisticMaterial: {
                            roughness: 0.9
                        },
                        postEffect: {
                            enable: true
                        },
                        light: {
                            main: {
                                intensity: 5,
                                shadow: true
                            },
                            ambientCubemap: {
                                texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                                diffuseIntensity: 0.2
                            }
                        }
                    }
                };
                myChart.setOption(option);
            }
        },
    }
</script>
<style lang="scss">
    .home_page {
        padding-top: 50px;

        .title {
            font-size: 22px;
            text-align: center;

            li {
                list-style: none;
                display: inline-block;
            }
        }
    }
</style>
