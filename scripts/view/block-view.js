'use strict';

$('#eth-submit').click(function(e){ 
    e.preventDefault();
    ethTrans($('#eth-address').val());
  });