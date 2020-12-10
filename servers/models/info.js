const treeData = require('../datas/configInfo/info');
const baseData = require('../datas/configInfo/baseMs');

const getTreeData = async function(){
    return treeData;
};

const getBaseData = async function(){
    return baseData;
};

module.exports = {
    getTreeData,
    getBaseData
};
