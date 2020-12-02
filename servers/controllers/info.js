const infoModel = require('../models/info');

const getInfoList = async function (ctx) {
    const result = await infoModel.getInfoData();
    ctx.body = {
        success: true,
        code: 200,
        data:{
            total: result.length,
            list: result,
        },
        message: '获取用户列表成功！'
    }
};

module.exports = {
    getInfoList
};
