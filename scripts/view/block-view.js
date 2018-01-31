'use strict';

$('#eth-submit').click(function(e){ 
    e.preventDefault();
    ethTrans($('#eth-address').val());
  });

//round unix time to nearest whole day
// long timestamp = 1314297250;
// long beginOfDay = timestamp - (timestamp % 86400);