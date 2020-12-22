const fs = require('fs'),
    path = require('path');
const uploadFilePath = path.resolve('servers/datas/uploads');
const uploadImg = async function (ctx) {
    let bodyMessage = {};
    const { file } = ctx.request.files;
    // console.log(file,'ffffff')
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
    try {
        console.log('11')
        fs.accessSync(uploadFilePath, fs.constants.F_OK | fs.constants.W_OK);
        console.log('可以读写');
    } catch (err) {
        console.error('无权访问');
    }
    await fs.access(uploadFilePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.log(`${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
            if(err.code === 'ENOENT'){
                fs.mkdir(uploadFilePath,function(err){
                    if (err){
                        //没创建好
                        console.error(err,'xxxxx');
                        bodyMessage = {
                            success: true,
                            code: 1001,
                            data:{},
                            message: '上传失败！'
                        }
                    }
                    console.log("uploads目录创建成功");
                    const reader = fs.createReadStream(file.path);
                    const basename = path.basename(file.path);//文件名
                    const stream = fs.createWriteStream(uploadFilePath+'/'+basename);
                    reader.pipe(stream);
                    bodyMessage = {
                        success: true,
                        code: 200,
                        data:`${ctx.origin}/servers/datas/uploads/${basename}`,
                        message: '上传成功！'
                    }
                });
            }
        } else {
            //文件夹存在，并且可写
            console.log(`存在，且可写`);
            const reader = fs.createReadStream(file.path);
            const basename = path.basename(file.path);//文件名
            const stream = fs.createWriteStream(uploadFilePath+'/'+basename);
            reader.pipe(stream);
            // console.log('stream',`${ctx.origin}/servers/datas/uploads/${basename}`)
            return bodyMessage = {
                success: true,
                code: 200,
                data:`${ctx.origin}/servers/datas/uploads/${basename}`,
                message: '上传成功！'
            }
        }
        ctx.body = bodyMessage
    });
    console.log(bodyMessage,'xxxxxx')
};

module.exports = {
    uploadImg
};
