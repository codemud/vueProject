let jwt = require('jsonwebtoken');
const configService = require('../config/config');
// 生成token
const signToken = function (userInfo){
    return new Promise((resolve,reject)=>{
        let token = jwt.sign(userInfo, configService.SECRET,{ expiresIn: '1h' });
        resolve(token)
    }).catch(err=>{
        console.log('signToken err:'+err)
    });
};
// 解析token
const verifyToken = function (token) {
    let _token = token.split(' ')[1];
    return new Promise((resolve,reject)=>{
        jwt.verify(_token, configService.SECRET, (error, decoded) => {
            console.log('zxzxzxzxzxzxzxzx',error,decoded)
            if (error) {
                console.log('error', error)
                return reject(error.message)
            }
            console.log('decoded', decoded)
            return resolve(decoded)
        })
    }).catch(err=>{
        console.log('verifyToken err:'+err)
    });
};
module.exports = {
    signToken,
    verifyToken
};