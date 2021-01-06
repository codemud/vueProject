module.exports = {
    publicPath: "./",
    devServer: {
        port: process.env.VUE_APP_SERVICE_PORT,
        open: true,
        https: false,
        proxy: {
            "/backstage": {
                target: process.env.VUE_APP_SERVICE_URL, //对应自己的接口
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/backstage": "/"
                }
            }
        }
    },
    lintOnSave: true,
    outputDir: "dist",
    assetsDir: "assets",
    indexPath: "index.html",
    productionSourceMap: false
};
