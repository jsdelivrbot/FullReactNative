'use strict';
var app = require('../../server/server');
var shortid = require('shortid');
var _ = require("underscore");
module.exports = function (Rolexstorer) {
  Rolexstorer.validatesUniquenessOf({ scopedTo: ['username', 'rolecode'] });
  Rolexstorer.beforeRemote('*', function (ctx, unused, next) {
    app.models.Auth.validateToken(ctx.req.headers.token).then((token_info) => {
      next();
    }).catch(err => {
      return next(err);
    })
  });
  Rolexstorer.afterRemote('**', function (ctx, result, next) {
    if (result.res['count']) {
      _.extend(ctx.result, { 'total': result.res['count'] });
      next();
    } else {
      var where = ctx.args;
      if (ctx.args.filter) {
        where = JSON.parse(ctx.args.filter).where;
      }
      Rolexstorer.count(where, function (err, count) {
        _.extend(ctx.result, { 'total': count });
        next();
      })
    }
  });

  //new version
  Rolexstorer.findRolexStorer = function (filter, callback) {
    Rolexstorer.find(JSON.parse(filter)).then(function (obj) {
      callback(null, obj);
    }).catch(function (err) {
      callback(err);
    })
  };
  Rolexstorer.listRolexStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    Rolexstorer.dataSource.connector.execute("SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable "
      + "from storer left join rolexstorer on storer.storerkey = rolexstorer.storerkey and storer.warehousecode = rolexstorer.warehousecode  "
      + "where storer.deleted = false and storer.type = '1' and  rolexstorer.deleted = false and rolexstorer.rolecode = ? and  rolexstorer.warehousecode in  "
      + "( "
      + "SELECT warehouse.warehousecode "
      + "From warehouse left join rolexwarehouse on warehouse.warehousecode = rolexwarehouse.warehousecode  "
      + "Where warehouse.deleted = false and warehouse.hide = false and rolexwarehouse.deleted = false and rolexwarehouse.rolecode = ? "
      + ")", [res_role.rolecode, res_role.rolecode],
      function (err_rolexstorer, res_rolexstorer) {
        if (err_rolexstorer) callback(err_rolexstorer);
        Rolexstorer.dataSource.connector.execute("SELECT storer.id, storer.warehousecode, storer.storerkey, storer.type, storer.company, storer.address1, storer.lottable "
          + "From storer  "
          + "WHERE storer.deleted = false and storer.type = '1' and storer.warehousecode in  "
          + "( "
          + "SELECT warehouse.warehousecode "
          + "From warehouse left join rolexwarehouse on warehouse.warehousecode = rolexwarehouse.warehousecode  "
          + "Where warehouse.deleted = false and warehouse.hide = false and rolexwarehouse.deleted = false and rolexwarehouse.rolecode = ? "
          + ")   "
          + "and concat(storer.storerkey, storer.warehousecode) not in  "
          + "( "
          + "SELECT concat(storer.storerkey, storer.warehousecode) "
          + "From storer left join rolexstorer on storer.storerkey = rolexstorer.storerkey and storer.warehousecode = rolexstorer.warehousecode  "
          + "Where storer.deleted = false and storer.type = '1' and  rolexstorer.deleted = false and rolexstorer.rolecode = ? and  rolexstorer.warehousecode in  "
          + "( "
          + "SELECT warehouse.warehousecode "
          + "From warehouse left join rolexwarehouse on warehouse.warehousecode = rolexwarehouse.warehousecode  "
          + "Where warehouse.deleted = false and warehouse.hide = false and rolexwarehouse.deleted = false and rolexwarehouse.rolecode = ? "
          + ") "
          + ")", [data.parentuser, data.rolecode, data.rolecode],
          function (err_storer, res_storer) {
            if (err_storer) callback(err_storer);
            var response = { 'rolexstorer': res_rolexstorer, 'storer': res_storer };
            callback(null, response);
          })
      })
  };
  Rolexstorer.updateRolexStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    console.log(data);
    
    Rolexstorer.dataSource.connector.execute('Update rolexstorer SET deleted = true Where rolecode = ? ', [data.rolecode],
      function (err_del, res_del) {
        if (err_del) callback(err_del);
        data.rolexstorer.forEach(function (value, index, arr) {
          Rolexstorer.findOne({ where: { 'rolecode': data.rolecode, 'warehousecode': value.warehousecode, 'storerkey': value.storerkey } }).then(function (res_find) {
            if (res_find) {
              Rolexstorer.updateAll({ 'rolecode': data.rolecode, 'warehousecode': value.warehousecode, 'storerkey': value.storerkey }, {
                'deleted': false,
                'editdate': new Date().toISOString(),
                'editwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            } else {
              Rolexstorer.create({
                'rolecode': data.rolecode,
                'warehousecode': value.warehousecode,
                'storerkey': value.storerkey,
                'deleted': false,
                'adddate': new Date().toISOString(),
                'addwho': data.currentuser
              }).then(function (res) {
              }).catch(function (err) {
                callback(err);
              })
            }
          }).catch(function (err) {
            callback(err);
          })
        });
        callback(null, data);
      })
  };
  Rolexstorer.deleteRolexStorer = function (obj, callback) {
    var data = JSON.parse(obj);
    Rolexstorer.updateAll({ 'rolecode': data.rolecode }, {
      'deleted': true,
      'editdate': new Date().toISOString(),
      'editwho': data.currentuser
    }).then(function (res) {
      callback(null, data);
    }).catch(function (err) {
      callback(err);
    })
  };


}
