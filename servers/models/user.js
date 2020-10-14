const userNameData = require('../datas/user/getUserName');

function findDara(param,type) {
    return userNameData.find(item=>item[type] === param)
}
const getUserByName = async function(name){
    return await findDara(name,'user_name');
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
