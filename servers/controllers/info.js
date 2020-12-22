const infoModel = require('../models/info');

const getTreeList = async function (ctx) {
    const result = await infoModel.getTreeData();
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

const getBaseList = async function (ctx) {
    const result = await infoModel.getBaseData();
    ctx.body = {
        success: true,
        code: 200,
        data:{
            total: result.length,
            list: result,
        },
        message: '获取成功！'
    }
};

const getFunctionList = async function (ctx) {
    const result = await infoModel.getFunctionData();
    ctx.body = {
        success: true,
        code: 200,
        data:{
            total: result.length,
            list: result,
        },
        message: '获取成功！'
    }
};

const getDetailFunction = async function (ctx) {
    const result = await infoModel.getFunctionData();
    ctx.body = {
        success: true,
        code: 200,
        data:result.find(item=>item.id === ctx.params.id),
        message: '获取成功！'
    }
};

const deleteFunction = async function (ctx) {
    const result = await infoModel.getFunctionData();
    const deleteIds = ctx.request.body.ids;//Array
    for(let id of deleteIds) {
        result.splice(result.findIndex(item => item.id === id), 1)
    }
    ctx.body = {
        success: true,
        code: 200,
        data:{},
        message: '删除成功！'
    }
};

module.exports = {
    getTreeList,
    getBaseList,
    getFunctionList,
    getDetailFunction,
    deleteFunction
};
