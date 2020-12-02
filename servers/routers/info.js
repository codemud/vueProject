const infoController = require('../controllers/info');
const router = require('koa-router')();

router.post('/category/trees', ctx => infoController.getInfoList(ctx));

module.exports = router;