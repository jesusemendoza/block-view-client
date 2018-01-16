'use strict';

let __API_URL__ = 'http://api.etherscan.io'
const __API_KEY__ = '6H8JFIWHE4ZF5Y3CF58YXH6RFEICXYTETZ'

function EthXfer(formattedTime,etherAmt,txId, direction) {
  this.date = formattedTime;
  this.amount = etherAmt;
  this.txId = txId;
  this.direction = direction;
}

EthXfer.prototype.toHtml = function(){
    let template = Handlebars.compile($('#weather-template').html());
    return template(this);
  };

function ethTrans(address) {
    console.log(typeof address)
    address = address.toLowerCase();
    console.log(address)
    $.get(`${__API_URL__}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${__API_KEY__}`)
    .then(data => appendXfer(data, address))
}
function dollarVal(data) {
    
        for(let i = 0; i < data.result.length; i++) {
            setTimeout(function() {
                $.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR&ts=${data.result[i].timeStamp}&extraParams=block_view`)
                .then(res => $(`#dollar-${i}`).text(`${(res.ETH.USD * (data.result[i].value/1000000000000000000)).toFixed(2)}`))
                .then(res => console.log(res))
                .then(() => {
                    if (i === data.result.length-1) return console.log('done')
                });
            }, 200 * i) // With each iteration, the delay increases
          }
          
    }


function appendXfer(data, address) {
    console.log(data)

    for (let i = 0; i < data.result.length; i++) {
        let direction = 'in';
        let sign 
        if (address == data.result[i].from.toString()) {
            direction = 'out'
        }
        let etherAmt =  data.result[i].value/1000000000000000000
        let txId = i;

        let date = new Date(data.result[i].timeStamp*1000);

        let ethX = new EthXfer(date, etherAmt, txId, direction)
        
        $("#block-display").append(ethX.toHtml());
    }
    dollarVal(data)
}
