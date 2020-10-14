const userModel = require('../models/user');
let jwt = require('jsonwebtoken');
const configService = require('../config/config');

const postUserAuth = async function (ctx) {
    const requestData = ctx.request.body;
    const userInfo = await userModel.getUserByName(requestData.name);
    if (userInfo) {
        if (userInfo.password !== requestData.password) {
            ctx.body = {
                success: false,
                code: 200,
                message: '密码错误！'
            }
        } else {
            const userToken = {
                id: userInfo.id,
                name: userInfo.user_name,
                originExp: Date.now() + 60 * 60 * 1000, // 设置过期时间（毫秒）为 1 小时
            };
            // 签发 token
            let token = jwt.sign(userToken, configService.SECRET,{ expiresIn: '1h' });
            ctx.body = {
                success: true,
                code: 200,
                data:{
                    access_token: token,
                    config:{
                        userInfo:{id:userInfo.id,name:userInfo.user_name}
                    }
                },
                message: '登陆成功！'
            }
        }
    } else {
        ctx.body = {
            success: false,
            code: 200,
            message: '用户不存在！'
        }
    }
};

const getUserInfo = async function (ctx) {
    const id = ctx.request.body.id; // 获取 url 里传过来的参数里的 id
    ctx.body = await userModel.getUserById(id)
};

const getUserList = async function (ctx) {
    const result = await userModel.getUserList();
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
    postUserAuth,
    getUserInfo,
    getUserList
};
