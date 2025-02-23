'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var md5 = require('md5');
var _ = require('underscore');
const nodemailer = require('nodemailer');
module.exports = function (SysMail) {
  SysMail.validatesUniquenessOf('appcode', { scopedTo: ['user'] });
  SysMail.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  SysMail.afterRemote('**', function (ctx, result, next) {
    var where = ctx.args;
    if (ctx.args.filter) {
      where = JSON.parse(ctx.args.filter).where;
    }
    SysMail.count(where, function (err, count) {
      _.extend(ctx.result, { 'total': count });
      next();
    })
  });
  SysMail.findSysMail = function (filter, callback) {
    SysMail.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  SysMail.insertSysMail = function (obj, callback) {
    var data = JSON.parse(obj);
    SysMail.findOne({ where: { 'appcode': data.appcode } }).then(function (response) {
      if (response) {
        if (data.isdefault) {
          SysMail.updateAll({ 'appcode': data.appcode }, {
            'isdefault': false,
            'editdate': new Date().toISOString(),
            'editwho': data.currentuser
          }).then(function (res) {
          }).catch(function (err) {
            callback(err);
          });
        }
        if (response.user === data.user) {
          if (response.deleted) {
            SysMail.updateAll({ 'appcode': data.appcode, 'user': data.user }, {
              'pass': data.pass,
              'deleted': false,
              'isdefault': data.isdefault,
              'type': data.type,
              'host': data.host,
              'secure': data.secure,
              'port': data.port,
              'notes': data.notes,
              'editdate': new Date().toISOString(),
              'editwho': data.currentuser
            }).then(function (res) {
              data['id'] = object.id;
              callback(null, data);
            }).catch(function (err) {
              callback(err);
            })
          } else {
            var err = new Error();
            err.statusCode = err.status = 404;
            err.message = 'Data is existed';
            callback(err);
          }
        } else {
          SysMail.create({
            'appcode': data.appcode,
            'user': data.user,
            'pass': data.pass,
            'isdefault': data.isdefault,
            'deleted': false,
            'type': data.type,
            'host': data.host,
            'secure': data.secure,
            'port': data.port,
            'notes': data.notes,
            'adddate': new Date().toISOString(),
            'addwho': data.currentuser
          }).then(function (res) {
            callback(null, res);
          }).catch(function (err) {
            callback(err);
          })
        }
      } else {
        SysMail.create({
          'appcode': data.appcode,
          'user': data.user,
          'pass': data.pass,
          'isdefault': true,
          'deleted': false,
          'type': data.type,
          'host': data.host,
          'secure': data.secure,
          'port': data.port,
          'notes': data.notes,
          'adddate': new Date().toISOString(),
          'addwho': data.currentuser
        }).then(function (res) {
          callback(null, res);
        }).catch(function (err) {
          callback(err);
        })
      }
    })
  };
  SysMail.updateSysMail = function (obj, callback) {
    var data = JSON.parse(obj);
      if (data.isdefault) {
        SysMail.updateAll({ 'appcode': data.appcode }, {
          'isdefault': false,
          'editdate': new Date().toISOString(),
          'editwho': data.currentuser
        }).then(function (res) {
        }).catch(function (err) {
          callback(err);
        });
      }
      SysMail.updateAll({ 'appcode': data.appcode, 'user': data.user }, {
        'pass': data.pass,
        'deleted': data.deleted,
        'isdefault': data.isdefault,
        'type': data.type,
        'host': data.host,
        'secure': data.secure,
        'port': data.port,
        'notes': data.notes,
        'editdate': new Date().toISOString(),
        'editwho': data.currentuser
      }).then(function (res) {
        callback(null, data);
      }).catch(function (err) {
        callback(err);
      })
  };
  SysMail.sendSysMail = function (obj, callback) {
    var data = JSON.parse(obj);
    SysMail.findOne({ where: { 'appcode': data.appcode, 'isdefault': true } }).then(function (object) {
      if (object) {
        let user = object.user;
        let pass = object.pass;
        let transporter = nodemailer.createTransport({
          type: object.type,
          host: object.host,
          port: object.port,
          secure: object.secure,
          auth: {
            user: user,
            pass: pass
          }
        });
        let mailOptions = {
          from: '"Support" <' + user + '>',
          to: data.to,
          subject: data.subject,
          html: data.body
        };
        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
      }
      else {
        var err = new Error();
        err.statusCode = err.status = 404;
        err.message = 'Mail is not found';
        callback(err);
      }
    })
  };

};
