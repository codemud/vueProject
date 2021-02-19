const path = require('path'),
    koa = require('koa'),
    koaRouter = require('koa-router')(),
    koaStatic  = require('koa-static'),
    json = require('koa-json'),
    // bodyParser = require('koa-bodyparser'),
    koaBody = require('koa-body'),
    logger = require('koa-logger');
const user = require('./servers/routers/user');
const info = require('./servers/routers/info');
const upload = require('./servers/routers/upload');
const jwtKoa = require('koa-jwt');

const configService = require('./servers/config/config');
const {verifyToken} = require('./servers/config/token_verify');
const app = new koa();


app.use(koaStatic(path.resolve('servers')));
// app.use(bodyParser());
app.use(koaBody({
    multipart:true,//支持文件上传
    formidable:{
        // uploadDir: path.resolve('servers/datas/uploads'), //设置图片上传的目录
        keepExtensions: true,//图片上传后不改变扩展名
        maxFileSize: 5*1024*1024    // 设置上传文件大小最大限制，默认5M
    }
}));
app.use(json());
app.use(logger());

app.on('error', function (err, ctx) {
    console.log('server error',err);
});

app.use(async (ctx, next) => {
    let start = new Date;
    let token = ctx.headers.authorization;
    if(token){
        // 验证token
        verifyToken(token).then(res=>{
            // console.log('这是解析后的token',res)
            ctx.state = {
                data:res
            };
        });
    }
    await next();
    let ms = new Date - start;
    console.log(`method:${ctx.method} - url:${ctx.url} - ${ms}`);
});

app.use(jwtKoa({secret:configService.SECRET}).unless({
    path:[/^\/login/,/^\/favicon.ico/]
}));

app.use(async(ctx, next)=>{
    return next().catch((err) => {
        if (401 === err.status) {
            ctx.status = 401;
            ctx.body = {
                code:2001,
                message:'登录过期，请重新登录'
            }
        } else {
            throw err;
        }
    });
});

koaRouter.use(user.routes()).use(user.allowedMethods());
koaRouter.use(info.routes()).use(info.allowedMethods());
koaRouter.use(upload.routes()).use(upload.allowedMethods());
app.use(koaRouter.routes());


app.listen(8180,()=>{
    console.log(`koa is listening in http://localhost:${8180}`)
});

module.exports = app;
