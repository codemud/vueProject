const treeData = require('../datas/configInfo/info');
const baseData = require('../datas/configInfo/baseMs');
const functionData = require('../datas/configInfo/functionMs');

const getTreeData = async function(){
    return treeData;
};

const getBaseData = async function(){
    return baseData;
};

const getFunctionData = async function(){
    return functionData;
};

module.exports = {
    getTreeData,
    getBaseData,
    getFunctionData
};
