var mysql = require('mysql');
var config = require('../config.js');


var connection = mysql.createConnection({
    host: config.mysql_config.host,
    user: config.mysql_config.user,
    database: config.mysql_config.database,
    password: config.mysql_config.password,
    port: config.mysql_config.port
});

exports.select = function (params, callback) {
    connection.query(params, function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log("err" + err);
            callback(err, false);
        }
    });
};

exports.insert = function (params, inform, callback, args) {
    connection.query(params, inform, function (err, rows, fields) {
        if (!err) {
            callback(null, args ? args : true);
        } else {
            console.log("err" + err);
            callback(err, false);
        }
    });
};

exports.update = function (params, callback) {
    connection.query(params, function (err, rows, fields) {
        if (!err) {
            callback(null, true);
        } else {
            console.log("err" + err);
            callback(err, false);
        }
    });
};

exports.deletion = function (params, callback) {
    connection.query(params, function (err, rows, fields) {
        if (!err) {
            callback(null, true);
        } else {
            console.log("err" + err);
            callback(err, false);
        }
    });
}

exports.lastInsertId = function (params, inform, callback) {
    connection.query(params, inform, function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log("err" + err);
            callback(err, false);
        }
    });
};
