const { execute } = require('../config/db');
const getListTotal = async function(sql){
    let sqlData = await execute(sql);
    console.log(sqlData,'sqlData')
    let dataTotal = JSON.parse(JSON.stringify(sqlData));
    console.log(dataTotal,'dataTotal')
    return dataTotal[0];
};
module.exports = {
    getListTotal
};