const infoController = require('../controllers/info');
const router = require('koa-router')();

router.post('/category/trees', ctx => infoController.getTreeList(ctx));
router.post('/baseMs/list', ctx => infoController.getBaseList(ctx));
router.post('/functions/list', ctx => infoController.getBaseList(ctx));
router.post('/functions/detail/:id', ctx => infoController.getDetailFunction(ctx));
router.post('/functions/delete', ctx => infoController.deleteFunction(ctx));

module.exports = router;