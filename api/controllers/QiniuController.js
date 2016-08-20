/**
 * QiniuController
 *
 * @description :: Server-side logic for managing qinius
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var qiniu = require('qiniu')
var bucketname = 'picfood-minos'
qiniu.conf.ACCESS_KEY = process.env.ACCESS_KEY || ''
qiniu.conf.SECRET_KEY = process.env.SECRET_KEY || ''

module.exports = {
  upToken (req, res) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname)
    putPolicy.callbackUrl = 'http://picfood.cn/qiniu/upload-callback'
    putPolicy.callbackBody = 'bucket=$(bucket)&key=$(key)&name=$(fname)&hash=$(etag)&mimeType=$(mimeType)&imageAve=$(imageAve)'
    //putPolicy.returnUrl = returnUrl
    //putPolicy.returnBody = returnBody
    //putPolicy.asyncOps = asyncOps
    //putPolicy.expires = expires
    res.send({token: putPolicy.token()})
  }
};

