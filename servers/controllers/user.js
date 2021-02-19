const userModel = require('../models/user');
// let jwt = require('jsonwebtoken');
// const configService = require('../config/config');
const {signToken} = require('../config/token_verify');

const postUserAuth = async function (ctx) {
    const requestData = ctx.request.body;
    const userInfo = await userModel.getUserByName(requestData.name);
    const user = userInfo[0];
    if (user) {
        if (user.user_password !== requestData.password) {
            ctx.body = {
                code: 1001,
                success: false,
                data:{},
                message: '密码错误！'
            }
        } else {
            const userToken = {
                id: user.id,
                name: user.user_name,
                originExp: Date.now() + 60 * 60 * 1000, // 设置过期时间（毫秒）为 1 小时
            };
            // 签发 token
            signToken(userToken).then(res=>{
                ctx.body = {
                    success: true,
                    code: 200,
                    data:{
                        access_token: res,
                        config:{
                            userInfo:{id:user.user_id,name:user.user_name},
                            sexInfo:[{id:1,name:'男'},{id:2,name:'女'}],
                            statusInfo:[{id:1,name:'成功'},{id:2,name:'失败'}],
                            loginCode:[2001,2002,2003],
                            professionInfo:[{id:1,name:'程序猿'},{id:2,name:'程序媛'},{id:3,name:'产品狗'},{id:4,name:'攻城狮'},{id:5,name:'设计师'}],
                            levelInfo:[{id:1,name:'三品'},{id:2,name:'二品'},{id:3,name:'一品'},{id:4,name:'超一品'},{id:5,name:'极品'}]
                        }
                    },
                    message: '登陆成功！'
                }
            })
            // let token = jwt.sign(userToken, configService.SECRET,{ expiresIn: '1h' });
        }
    } else {
        ctx.body = {
            success: false,
            code: 1001,
            data:{},
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
