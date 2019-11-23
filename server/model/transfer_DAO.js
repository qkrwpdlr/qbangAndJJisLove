var baseDAO = require('./base_DAO')
var mysql = require('mysql')

/**
    money: req.body.money,
    toSend: req.body.toSend,
    purpose: req.body.purpose,
    kind: newKind
 */
exports.insertTransfer = function (payload, callback) {
    let sql = `INSERT INTO transfer(money,toSend,purpose,kind,hash) VALUES("${payload.money}","${payload.toSend}","${payload.purpose}","${payload.kind}","${payload.hash}")`
    baseDAO.update(sql, callback)
}
exports.getMaxKind = function (callback) {
    let sql = `SELECT MAX(kind) FROM transfer`
    baseDAO.select(sql, callback)
}

exports.getAll = function (callback) {
    baseDAO.select("SELECT * FROM transfer ORDER BY id DESC", callback)
}
exports.addVote = function ({ kind, hash }, callback) {
    console.log(hash)
    let sql = `SELECT MAX(id) FROM transfer where kind=${kind}`
    baseDAO.select(sql, function (err, row) {
        let id = row[0]["MAX(id)"]
        let insertSql = `UPDATE transfer SET agree=agree+1,hash="${hash}" where id=${id}`
        baseDAO.update(insertSql, callback)
    })
}
exports.subVote = function ({ kind, hash }, callback) {
    let sql = `SELECT MAX(id) FROM transfer where kind=${kind}`
    baseDAO.select(sql, function (err, row) {
        let id = row[0]["MAX(id)"]
        let insertSql = `UPDATE transfer SET disagree=disagree+1,hash="${hash}" where id=${id}`
        baseDAO.update(insertSql, callback)
    })
}
exports.getByKind = function (kind, callback) {
    baseDAO.select(`SELECT * FROM transfer where kind=${kind}`, callback)
}