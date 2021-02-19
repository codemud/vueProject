const userNameData = require('../datas/user/getUserName');
const { execute } = require('../config/db');

function findDara(param,type) {
    return userNameData.find(item=>item[type] === param)
}
const getUserByName = async function(username){
    let sql = `SELECT * FROM user_info WHERE user_name = '${username}';`;
    let sqlData = await execute(sql);
    return JSON.parse(JSON.stringify(sqlData));
};

const getUserById = async function(id){
    return await findDara(id,'id');
};

const getUserList = async function(){
    return userNameData;
};

module.exports = {
    getUserByName,
    getUserById,
    getUserList
};
