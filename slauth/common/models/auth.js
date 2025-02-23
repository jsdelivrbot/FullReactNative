'use strict';
var app = require('../../server/server');
var lbContext = require('loopback-context');
var http = require('http');
module.exports = function (Auth) {
    Auth.validateToken = function (token) {
        let options = {
            // host: 'slauth-lb.gogoviet.com',
            // port: '',
            host: 'localhost',
            port: '2999',
            path: '/api/Users/checktoken',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve, reject) => {
            if (!token) reject("TOKEN_REQUIRED");
            let request = http.request(options, function (response) {
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    var err = new Error();
                    err.statusCode = err.status = 404;
                    err.message = 'TOKEN_EXPIRED';
                    return reject(err);
                }
                response.setEncoding('utf8');
                response.on('data', function (token_info) {
                    let currentContext = lbContext.getCurrentContext();
                    currentContext.set('token', token_info);
                    resolve(token_info);
                });
            });
            request.on('error', err => {
                reject(err);
            });
            request.write(JSON.stringify({ token: token }));
            request.end();
        });
    };

};
