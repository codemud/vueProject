const fs = require('fs'),
    path = require('path');
const uploadImg = async function (ctx) {
    const { file } = ctx.request.files;
    console.log(file,'ffffff')
    const extName = file.name.substring(file.name.lastIndexOf('.'),file.name.length);//后缀名
    console.log(extName,'extName')
    const imgType = ['.jpg','.jpeg','.png'];
    if(!imgType.includes(extName)){
        return ctx.body = {
            success: true,
            code: 1001,
            data:{},
            message: '图片格式错误,不支持上传后缀名为'+extName+'的文件！'
        }
    }
    fs.access(path.join(__dirname, '/datas/uploads'), fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.error(
                `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
            if(err.code === 'ENOENT'){
                fs.mkdir("/servers/datas/uploads",function(err){
                    if (err){
                        //没创建好
                        console.error(err);
                        return ctx.body = {
                            success: true,
                            code: 1001,
                            data:{},
                            message: '上传失败！'
                        }
                    }
                    console.log("uploads目录创建成功");
                    const reader = fs.createReadStream(file.path);
                    const basename = path.basename(file.path);//文件名
                    const stream = fs.createWriteStream(path.join(__dirname,'servers/datas/uploads', basename+extName));
                    reader.pipe(stream);
                    return ctx.body = {
                        success: true,
                        code: 200,
                        data:`${ctx.origin}/datas/uploads/${basename}`,
                        message: '上传成功！'
                    }
                });
            }
        } else {
            //文件夹存在，并且可写
            console.log(`${file} 存在，且可写`);
            const reader = fs.createReadStream(file.path);
            const basename = path.basename(file.path);//文件名
            const stream = fs.createWriteStream(path.join(__dirname,'servers/datas/uploads/', basename+extName));
            reader.pipe(stream);
            console.log(stream,'stream')
            return ctx.body = {
                success: true,
                code: 200,
                data:`${ctx.origin}/datas/uploads/${basename}`,
                message: '上传成功！'
            }
        }
    });
};

module.exports = {
    uploadImg
};
