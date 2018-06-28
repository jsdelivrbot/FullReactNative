'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Storer) {
  Storer.validatesUniquenessOf('warehousecode', { scopedTo: ['storerkey'] });
  Storer.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Storer.afterRemote('**', function (ctx, result, next) {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Storer.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
  });
  Storer.findStorer = function (filter, callback) {
    Storer.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  Storer.insertStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    Storer.findOne({ where: { 'warehousecode': data.warehousecode, 'storerkey': data.storerkey, 'type': data.type } }).then(function (object) {
      if (object) {
        if (object.deleted) {
          Storer.updateAll({ 'warehousecode': data.warehousecode, 'storerkey': data.storerkey, 'type': data.type }, {
            'parentuser': data.parentuser,
            'deleted': false,
            'company': data.company,
            'address1': data.address1,
            'lottable': JSON.stringify(data.lottable),
            'stockinfo': data.stockinfo,
            'freeday': data.freeday,
            'ageindays': data.ageindays,
            'notes1': data.notes1,
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
          err.message = 'Data is not existed';
          callback(err);
        }
      } else {
        Storer.create({
          'deleted': false,
          'warehousecode': data.warehousecode,
          'storerkey': data.storerkey,
          'type': data.type,
          'parentuser': data.parentuser,
          'company': data.company,
          'address1': data.address1,
          'lottable': JSON.stringify(data.lottable),
          'stockinfo': data.stockinfo,
          'freeday': data.freeday,
          'ageindays': data.ageindays,
          'notes1': data.notes1,
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
  Storer.updateStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    Storer.updateAll({ 'warehousecode': data.warehousecode, 'storerkey': data.storerkey, 'type': data.type }, {
      'parentuser': data.parentuser,
      'deleted': data.deleted,
      'company': data.company,
      'address1': data.address1,
      'lottable': JSON.stringify(data.lottable),
      'stockinfo': data.stockinfo,
      'freeday': data.freeday,
      'ageindays': data.ageindays,
      'notes1': data.notes1,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };
  Storer.getAllByWarehouseStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    Storer.dataSource.connector.execute('SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable from storer WHERE storer.warehousecode in (' + data.strwarehousecode + ') and storer.parentuser = ? and storer.type = ? and storer.deleted = ?', [data.parentuser, data.type, data.deleted], function (err, res) {
      if (err) callback(err);
      callback(null, res);
    })
  };

};
