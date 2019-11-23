var express = require('express');
var router = express.Router();
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const request = require('request');
var baordDao = require("./../model/board_DAO")
var transferDao = require("./../model/transfer_DAO")
const headers = {
  'Content-Type': 'application/json'
};
const descryptedAccount = caver.klay.accounts.decrypt({
  "version": 3,
  "id": "67a07dd3-bda7-48f9-8c89-6e789f490c4a",
  "address": "0xd087a57b54e917a9ac98dd09451a6252603426c9",
  "crypto": {
    "ciphertext": "74f0f1cbc5e4ee1a79d3920da869bd4211d2a067556f2aee143a3dfff5a6fb79",
    "cipherparams": {
      "iv": "6d0c7e1ad959f11c0ae6c75f30040648"
    },
    "cipher": "aes-128-ctr",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "salt": "798dcc2b7bc8f20b37b08f58d17948576a46d1c053b41a399fa85913147a1f45",
      "n": 4096,
      "r": 8,
      "p": 1
    },
    "mac": "937ffd303546969cd53b84fcc5667b427d61c3304351e4802091cb766e22fa53"
  }
}, 'Bang123~')

caver.klay.accounts.wallet.add(descryptedAccount)


/**
 * @param {String} req.param('transNum')
 */
router.get('/byTransNum', function (req, res, next) {
  baordDao.getDatas(req.param("transNum", "-1"), function (err, row) {
    /**
     * 없는경우에는 lenght가 0 이 됨
     */
    res.send(row)
  })
});

router.post("/update", async function (req, res, next) {
  let datas = req.body.datas
  for (let i in datas) {
    await new Promise(function (resolve, reject) {
      baordDao.getDatas(datas[i].transNum, function (err, row) {
        if (row.length == 0) {
          /**
           * 없는경우 / 업데이트 해야함
           */
          // 블록체인에 먼저 넣는다. 넣고 그 다음으로 트렌젝션 키를 받아오고, 그 받아온 키를 데이터 베이스 hash_1 에 넣는다
          var sendData_str = JSON.stringify(datas[i])
          // sendData를 인코딩
          var encoded = caver.utils.utf8ToHex(sendData_str)

          // 송금 트랜잭션 전송

          caver.klay.sendTransaction({
            type: 'VALUE_TRANSFER_MEMO',
            from: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
            to: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
            gas: '300000',
            value: caver.utils.toPeb('1', 'KLAY'),
            data: `${encoded}`,
          }).then(function (rawTransaction) {
            datas[i].hash_1 = rawTransaction.transactionHash
            baordDao.setData(datas[i], function (err) {
              if (err) {
                res.status(400).send(err)
              } else {
                resolve()
              }
            })
          }).catch(function (err) {
            reject(err)
          })
        } else {
          resolve()
          /**
           * 있는경우 / 넘어감
           */
        }
      })
    })
  }
  res.send("good")
})
router.get("/allData", function (req, res) {
  baordDao.getAllDatas(function (err, row) {
    res.send(row)
  })
})
router.get("/hexToUtf8", function (req, res) {
  var decoded = caver.utils.hexToUtf8(req.param("payload"))
  res.send(decoded)
})
/**
 * @param {String} req.body.money 얼마
 * @param {String} req.body.toSend  어디에 / 계좌
 * @param {String} req.body.purpose 목적
 */
router.post("/newTransfer", function (req, res) {
  transferDao.getMaxKind(function (err, row) {
    let newKind = row[0][`MAX(kind)`]
    if (newKind == null || newKind == undefined) {
      newKind = 0
    } else {
      newKind += 1
    }
    var sendData_str = JSON.stringify({
      money: req.body.money,
      toSend: req.body.toSend,
      purpose: req.body.purpose,
      kind: newKind,
      agree: 0,
      disagree: 0,
    })
    // sendData를 인코딩
    var encoded = caver.utils.utf8ToHex(sendData_str)

    // 송금 트랜잭션 전송

    caver.klay.sendTransaction({
      type: 'VALUE_TRANSFER_MEMO',
      from: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
      to: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
      gas: '300000',
      value: caver.utils.toPeb('1', 'KLAY'),
      data: `${encoded}`,
    }).then(function (rawTransaction) {
      let hash = rawTransaction.transactionHash
      transferDao.insertTransfer({
        money: req.body.money,
        toSend: req.body.toSend,
        purpose: req.body.purpose,
        kind: newKind,
        hash
      }, function (err, row) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(200).send("good")
        }
      })

    }).catch(function (err) {
      reject(err)
    })
  })
})
router.post("/vote/add", function (req, res) {
  transferDao.getByKind(req.body.kind, function (err, rows) {
    if (err) {

    } else {
      let row = rows[0]
      var sendData_str = JSON.stringify({
        money: row.money,
        toSend: row.toSend,
        purpose: row.purpose,
        kind: row.kind,
        agree: row.agree + 1,
        disagree: row.disagree,
      })
      var encoded = caver.utils.utf8ToHex(sendData_str)
      caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER_MEMO',
        from: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
        to: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
        gas: '300000',
        value: caver.utils.toPeb('1', 'KLAY'),
        data: `${encoded}`,
      }).then(function (rawTransaction) {
        let hash = rawTransaction.transactionHash
        transferDao.addVote({ kind: req.body.kind, hash }, function (err, row) {
          if (err) {
            res.status(400).send(err)
          } else {
            res.send(row)
          }
        })
      }).catch(function (err) {
        reject(err)
      })
    }
  })
})
router.post("/vote/sub", function (req, res) {
  transferDao.getByKind(req.body.kind, function (err, rows) {
    if (err) {

    } else {
      let row = rows[0]
      var sendData_str = JSON.stringify({
        money: row.money,
        toSend: row.toSend,
        purpose: row.purpose,
        kind: row.kind,
        agree: row.agree,
        disagree: row.disagree + 1,
      })
      var encoded = caver.utils.utf8ToHex(sendData_str)
      caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER_MEMO',
        from: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
        to: '0xd087a57b54e917a9ac98dd09451a6252603426c9',
        gas: '300000',
        value: caver.utils.toPeb('1', 'KLAY'),
        data: `${encoded}`,
      }).then(function (rawTransaction) {
        let hash = rawTransaction.transactionHash
        transferDao.subVote({ kind: req.body.kind, hash }, function (err, row) {
          if (err) {
            res.status(400).send(err)
          } else {
            res.send(row)
          }
        })
      }).catch(function (err) {
        reject(err)
      })
    }
  })
})
router.get("/getAllTransfer", function (req, res) {
  transferDao.getAll(function (err, rows) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(rows)
    }
  })
})
module.exports = router;
