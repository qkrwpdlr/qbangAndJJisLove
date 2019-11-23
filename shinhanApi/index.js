const request = require('request');
const options = {
    uri: 'http://localhost:8080/update',
    method: 'post',
    body: {
        datas: [{
            kind: "신한체",
            transNum: "171006",
            aprvno: "600171",
            inOutMoney: 1500000,
            clientSell: "쿠펑"
        },
        {
            kind: "신한체",
            transNum: "171007",
            aprvno: "700171",
            inOutMoney: 2400000,
            clientSell: "광개토연탄상회"
        },
        {
            kind: "신한체",
            transNum: "171008",
            aprvno: "800171",
            inOutMoney: 3000000,
            clientSell: "광개토연탄상회"
        },
        {
            kind: "신한체",
            transNum: "171009",
            aprvno: "900171",
            inOutMoney: 127000,
            clientSell: "조은마트"
        },
        {
            kind: "신한체",
            transNum: "171010",
            aprvno: "010171",
            inOutMoney: 480000,
            clientSell: "진로마트"
        },
        {
            kind: "신한체",
            transNum: "171011",
            aprvno: "110171",
            inOutMoney: 300000,
            clientSell: "전국고속버스운송"
        },
        {
            kind: "신한체",
            transNum: "171012",
            aprvno: "210171",
            inOutMoney: 70000,
            clientSell: "비주하우스"
        },
        {
            kind: "신한체",
            transNum: "171013",
            aprvno: "310171",
            inOutMoney: 110000,
            clientSell: "G225"
        },
        {
            kind: "신한체",
            transNum: "171014",
            aprvno: "410171",
            inOutMoney: 813000,
            clientSell: "티몸"
        },
        {
            kind: "신한체",
            transNum: "171015",
            aprvno: "510171",
            inOutMoney: 1000000,
            clientSell: "옥선"
        }
        ]
    },
    json: true
}
request.post({
    uri: 'http://10.3.17.61:8080/v1/search/transaction/history',
    method: 'POST',
    body: {
        "dataHeader": {},
        "dataBody": {
            "serviceCode": "D1110",
            "정렬구분": "1",
            "조회시작일": "2019.09.20",
            "조회종료일": "2019.09.27",
            "계좌번호": "110-294-129071"
        }
    },
    json: true
}, function (err, httpResponse, body) {
    request(options, function () {
        console.log("good")
    })
})
