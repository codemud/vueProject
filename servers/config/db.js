const mysql = require('mysql');
// node连接mysql数据库配置文件
//创建连接池
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vue_node_serve_sql'
});

const execute = function(sql,params){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err, connection)=> {
            if (err) {
                reject(err)
            } else {
                connection.query(sql,params, (err, result) => {
                    err? reject(err):resolve(result);
                    pool.releaseConnection(connection);
                })
            }
        });
    })
};

module.exports = {
    pool,
    execute
};