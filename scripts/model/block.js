'use strict';

let __API_URL__ = 'http://api.etherscan.io'
// const __API_KEY__ = 'insert api key'

function EthXfer(formattedTime,etherAmt,txId) {
  this.date = formattedTime;
  this.amount = etherAmt;
  this.txId = txId;
}

EthXfer.prototype.toHtml = function(){
    let template = Handlebars.compile($('#weather-template').html());
    return template(this);
  };

function ethTrans(address) {
    console.log(address)
    $.get(`${__API_URL__}/api?module=account&action=txlist&address=${address.toString()}&startblock=0&endblock=99999999&sort=asc&apikey=${__API_KEY__}`)
    .then(data => appendXfer(data))
}
function dollarVal(data) {
    for (let i = 0; i < data.result.length; i++) {
        $.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR&ts=${data.result[i].timeStamp}&extraParams=block_view`)
        .then(res => $(`#dollar-${i}`).text(`${(res.ETH.USD * (data.result[i].value/1000000000000000000)).toFixed(2)}`).delay(300))
        .then(res => console.log(res.ETH))
    }
}

function appendXfer(data) {
    console.log(data)

    for (let i = 0; i < data.result.length; i++) {
        let etherAmt =  data.result[i].value/1000000000000000000
        let txId = i;

        let date = new Date(data.result[i].timeStamp*1000);

        let ethX = new EthXfer(date, etherAmt, txId)
        
        $("#block-display").append(ethX.toHtml());
    }
    dollarVal(data)
}
