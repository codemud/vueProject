const path = require('path'),
    koa = require('koa'),
    koaRouter = require('koa-router')(),
    koaStatic  = require('koa-static'),
    json = require('koa-json'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger');
const user = require('./servers/routers/user');
const info = require('./servers/routers/info');
const jwtKoa = require('koa-jwt');

const configService = require('./servers/config/config');
const {verifyToken} = require('./servers/config/token_verify');
const app = new koa();

app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(function* (next) {
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s',this.method,this.url,ms);
});

app.on('error', function (err, ctx) {
    console.log('server error',err);
});

app.use(koaStatic(path.resolve('dist')));

app.use(async (ctx, next) => {
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
});

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

app.use(jwtKoa({secret:configService.SECRET}).unless({
        path:[/^\/login/,/^\/favicon.ico/]
}));



koaRouter.use(user.routes()).use(user.allowedMethods());
koaRouter.use(info.routes()).use(info.allowedMethods());
app.use(koaRouter.routes());


app.listen(8180,()=>{
    console.log('koa is listening in http://localhost:8180')
});

module.exports = app;
