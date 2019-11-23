var baseDAO = require('./base_DAO')
var mysql = require('mysql')

exports.getDatas = function (payload, callback) {
    let sql = `select * from board where transNum=${payload}`
    baseDAO.select(sql, callback)
}
exports.getAllDatas = function (callback) {
    let sql = `select * from board ORDER BY id DESC`
    baseDAO.select(sql, callback)
}
exports.setData = function (payload, callback) {
    let sql = `insert into board(transNum,inOutMoney,kind,aprvno,clientSell,hash_1) VALUES('${payload.transNum}',${payload.inOutMoney},'${payload.kind}','${payload.aprvno}',${mysql.escape(payload.clientSell)},'${payload.hash_1}')`
    baseDAO.update(sql, callback)
}
exports.setWrite = function ({ id, content, hash }, callback) {
    let sql = `UPDATE board SET content="${content}",hash_2="${hash}" where id=${id}`
    baseDAO.update(sql, callback)
}