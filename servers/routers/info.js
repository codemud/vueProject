const infoController = require('../controllers/info');
const router = require('koa-router')();

router.post('/category/trees', ctx => infoController.getTreeList(ctx));
router.post('/baseMs/list', ctx => infoController.getBaseList(ctx));

module.exports = router;