const treeData = require('../datas/configInfo/info');
const baseData = require('../datas/configInfo/baseMs');
const functionData = require('../datas/configInfo/functionMs');
const {getListTotal} = require('./listTotal');
const configService = require('../config/config');
const { execute } = require('../config/db');

const getTreeData = async function(){
    return treeData;
};

const getBaseData = async function(paramData){
    let data = configService.deepCopy(paramData);
    let sqlQuery = '';
    let sql = '';
    const pageInfo = {
        page:paramData.page - 1,
        pageSize:paramData.pageSize
    };
    delete data.page;
    delete data.pageSize;
    for (let [key, value] of Object.entries(data)){
        if(key === 'name' && value !== ""){
            sqlQuery += ` \`${key}\` LIKE '%${value}%'`;
        }
        if (key !== 'name' && value !== "") {
            if(key === 'start_time' && value !== ""){
                sqlQuery += `AND \`create_time\` >=  ${value}`;
            }
            if(key === 'end_time' && value !== ""){
                sqlQuery += `AND \`create_time\` <=  ${value}`;
            }
            if(sqlQuery){
                sqlQuery += 'AND';
            }
            sqlQuery += `\`${key}\` = ${value}`;
        }
    }
    if(sqlQuery !== ''){
        sqlQuery = 'WHERE ' + sqlQuery;
        sql = `SELECT * FROM base_list ${sqlQuery} LIMIT ${pageInfo.page || 0}, ${pageInfo.pageSize || 1000};`;
    }else {
        sql = `SELECT * FROM base_list LIMIT ${pageInfo.page || 0}, ${pageInfo.pageSize || 1000};`;
    }
    let sqlQueryData = await execute(sql);
    let queryData = JSON.parse(JSON.stringify(sqlQueryData));
    let queryDataTotal = await getListTotal('base_list');
    return {
        total:queryDataTotal,
        data:queryData
    };
};

const getFunctionData = async function(){
    return functionData;
};

module.exports = {
    getTreeData,
    getBaseData,
    getFunctionData
};
