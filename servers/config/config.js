const configService = {
    SECRET: 'vue-koa-secret',//jwt指定密钥，用来判断 token 合法性的标志
    deepCopy:function (obj) {
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deepCopy(obj[key]) // 递归复制
                } else {
                    result[key] = obj[key]
                }
            }
        }
        return result
    }
};
module.exports = configService;