const uploadController = require('../controllers/common/upload');
const router = require('koa-router')();

router.post('/common/upload', ctx => uploadController.uploadImg(ctx));

module.exports = router;