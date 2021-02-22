const { execute } = require('../config/db');
const getListTotal = async function(tablename){
    let sql = `select COUNT(1) as count FROM ${tablename};`;
    let sqlData = await execute(sql);
    let dataTotal = JSON.parse(JSON.stringify(sqlData));
    return dataTotal[0].count;
};
module.exports = {
    getListTotal
};