const path = require('path'),
    koa = require('koa'),
    koaRouter = require('koa-router')(),
    koaStatic  = require('koa-static'),
    json = require('koa-json'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger');
const user = require('./servers/routers/user');
const jwtKoa = require('koa-jwt');

const configService = require('./servers/config/config');
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

app.use(jwtKoa({secret:configService.SECRET}).unless({
    path:[/^\/login/,/^\/favicon.ico/]
}));

koaRouter.use(user.routes()).use(user.allowedMethods());
app.use(koaRouter.routes());


app.listen(8080,()=>{
    console.log('koa is listening in http://localhost:8080')
});

module.exports = app;
