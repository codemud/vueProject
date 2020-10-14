const userController = require('../controllers/user.js');
const router = require('koa-router')();

router.post('/login', ctx => userController.postUserAuth(ctx));
router.get('/user/:id', ctx => userController.getUserInfo(ctx)); // 定义 url 的参数 id
router.post('/user/list', ctx => userController.getUserList(ctx));

module.exports = router;