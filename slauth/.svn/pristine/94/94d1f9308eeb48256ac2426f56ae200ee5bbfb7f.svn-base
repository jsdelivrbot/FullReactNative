'use strict';
var app = require('../../server/server');
var Promise = require('bluebird');
var DEFAULT_TTL = 3600; // seconds
module.exports = function(Token) {
  Token.validatesUniquenessOf('uid');
  Token._regisToken = function(obj) {
    return new Promise(function(resolve, reject) {
      Token.findOne({where: {'uid': obj.username}}).then(function(__){
        if(__) {
          Token.deleteById(__.id);
        }
        Token.create({ttl: DEFAULT_TTL, 'uid': obj.username, type: obj.type, 'parentuser': obj.parentuser}).then(function(token){
          resolve(token);
        })
      })
    })
  };
  Token._deleteToken = function(uid) {
    return new Promise(function(resolve, reject) {
      Token.findOne({where: {'uid': uid}}).then(function(__){
        if(__) {
          Token.deleteById(__.id).then(function(obj){
            resolve(obj);
          });
        } else {
          var err = new Error();
          err.statusCode = err.status = 200;
          err.code = err.message = 'INVALID_ACCESS';
          reject(err);
        }
      })
    })
  };
  Token._validToken = function(token) {
    return new Promise(function(resolve, reject) {
      Token.findOne({where: {'id': token}}).then(function(__){
        if(__) {
          __.validate(function(err, isValid){
            if (err) {
              reject(err);
            } else if (!isValid) {
              Token.deleteById(__.id).then(function(__){
                var err = new Error();
                err.statusCode = err.status = 404;
                err.code = err.message = 'TOKEN_EXPIRED';
                reject(err);
              });
            }
            else {
              Token.updateAll({'id': __.id}, {'created': new Date()}).then(function(obj){
                resolve(__);
              })
            }
          })
        }
        else {
          var err = new Error();
          err.statusCode = err.status = 404;
          err.code = err.message = 'INVALID_ACCESS';
          reject(err);
        }
      })
    })
  };
  Token._validRegisToken = function(id){
    return new Promise(function(resolve, reject) {
      Token.findOne({where: {'id': id}}).then(function(obj){
        if(obj) {
          var uid = obj.uid;
          var type = obj.type;
          var parentuser = obj.parentuser;
          Token.deleteById(obj.id);
          Token.create({ttl: DEFAULT_TTL, 'uid': uid, 'type': type, 'parentuser': parentuser}).then(function(token){
            resolve(token);
          })
        } else {
          var err = new Error();
          err.statusCode = err.status = 200;
          err.code = err.message = 'INVALID_ACCESS';
          reject(err);
        }
      })
    })
  }
};
