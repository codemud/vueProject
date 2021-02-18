const mysql = require('mysql');
// node连接mysql数据库配置文件
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vue_node_serve_sql'
});

const execute = function(sql,params){
    return new Promise((resolve,reject)=>{
        connection.connect((err, connection)=> {
            if (err) {
                reject(err)
            } else {
                connection.query(sql,params, (err, result) => {
                    err? reject(err):resolve(result);
                    connection.end();
                })
            }
        });
    })
};

module.exports = {
    connection,
    execute
};