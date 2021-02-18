const userNameData = require('../datas/user/getUserName');
const { execute } = require('../config/db');

function findDara(param,type) {
    return userNameData.find(item=>item[type] === param)
}
const getUserByName = async function(){

    let sql = 'SELECT * FROM `user_info`;';
    //查
    // connection.query(sql,function (err, result) {
    //     if(err){
    //         console.log('[SELECT ERROR] - ',err.message);
    //         return;
    //     }
    //     console.log('--------------------------SELECT----------------------------');
    //     console.log(result);
    //     console.log('------------------------------------------------------------\n\n');
    // });
    return await execute(sql);
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
