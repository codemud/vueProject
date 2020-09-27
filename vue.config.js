module.exports = {
    publicPath: "./",
    devServer: {
        port: 8080,
        open: true,
        https: false,
        proxy: {
            "/backend": {
                target: process.env.VUE_APP_SERVICE_URL, //对应自己的接口
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/backend": "/"
                }
            }
        },
        overlay: {//vue-cli3关闭eslint语法检查
            warnings: true,
            errors: true
        }
    },
    lintOnSave: false,
    outputDir: "dist",
    assetsDir: "assets",
    indexPath: "index.html",
    productionSourceMap: false
};
