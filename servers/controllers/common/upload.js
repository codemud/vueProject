const fs = require('fs'),
    path = require('path');
const uploadFilePath = path.resolve('servers/datas/uploads');

const uploadImg = async function (ctx) {
    const { file } = ctx.request.files;
    let fileInfo = {};
    const extName = file.name.substring(file.name.lastIndexOf('.'),file.name.length);//文件后缀名
    const imgType = ['.jpg','.jpeg','.png'];
    if(!imgType.includes(extName)){
        ctx.body = {
            success: true,
            code: 1001,
            data:{},
            message: '图片格式错误,不支持上传后缀名为'+extName+'的文件！'
        }
    }
    // console.log(uploadFilePath,'路径')
    const checkFilesAccess = function(){
        return new Promise((resolve,reject)=>{
            fs.access(uploadFilePath+'/',fs.constants.F_OK | fs.constants.W_OK,(err)=>{
                if(err){
                    console.log(`${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
                    if(err.code === 'ENOENT'){
                        fs.mkdir(uploadFilePath,(mkdirErr)=>{
                            if(mkdirErr){
                                //没创建好
                                reject('err')
                            }else {
                                resolve(mkdirErr)
                            }
                        })
                    }
                }else {
                    resolve(err)
                }
            })
        })
    };
    await checkFilesAccess().then(res=>{
        if(res){
            console.log(res,'reject');
            fileInfo = {
                success: true,
                code: 1001,
                data:{},
                message: '上传失败！'
            }
        }else {
            console.log('resolve')
            const reader = fs.createReadStream(file.path);
            const basename = path.basename(file.path);//文件名
            const stream = fs.createWriteStream(uploadFilePath+'/'+basename);
            reader.pipe(stream);
            fileInfo = {
                success: true,
                code: 200,
                data:`${ctx.origin}/datas/uploads/${basename}`,
                message: '上传成功！'
            }
        }
    });
    ctx.body = fileInfo;
};

module.exports = {
    uploadImg
};
