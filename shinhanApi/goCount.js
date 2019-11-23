const request = require('request');

function goCount() {
    return new Promise((resolve) => {
        request.post({
            uri: 'http://10.3.17.61:8080/v1/transfer/krw',
            method: 'POST',
            body: {
                "dataHeader":
                {
                },
                "dataBody":
                {
                    "serviceCode": "D2600",
                    "거래일련번호": "233023",
                    "클라이언트_거래번호": "0510134537",
                    "입금계좌메모": "",
                    "출금계좌메모": "",
                }
            },
            json: true
        }, function (err, httpResponse, body) {
            resolve(body)
        })
    })
}

request({
    uri: 'https://sujecookie.xyz/api/getAllTransfer',
    method: 'GET',
    body: {
        "dataHeader":
        {
        },
        "dataBody":
        {
            "serviceCode": "D2600",
            "거래일련번호": "233023",
            "클라이언트_거래번호": "0510134537",
            "입금계좌메모": "",
            "출금계좌메모": "",
        }
    },
    json: true
}, function (err, httpResponse, body) {
    for (let i in body) {
        let year = body[i].transferDate.split(".")[0]
        let mounth = body[i].transferDate.split(".")[1]
        let day = body[i].transferDate.split(".")[2]

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if ((mm - mounth) >= 1 || (dd - day) >= 1) {
            goCount()
        }
    }
})
