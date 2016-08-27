'use strict';

let http = require('http');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
});

let base = 'SEK';

rl.question('Enter a currency code: ', (answer) => {
  base = answer;

  /**
   * Finds and returns the currency data
   */
  let url = 'http://api.fixer.io/latest?base='+base;

  http.get(url, function(res){
    var body = '';
    res.on('data', function(bits){
      body += bits;
    });
    res.on('end', function(){
      let apiRes = JSON.parse(body);
      console.log("\n** Currency Converter **\n");
      console.log(base+"/ \n");
      console.log("CHF: ",apiRes.rates['CHF']);
      console.log("AUD: ",apiRes.rates['AUD']);
      console.log("-------------");
      console.log("Updated: ", apiRes.date+"\n");
    });
  }).on('error', function(e){
    console.log("Error: ", e)
  });

/**
 * Closes the readline
 */
rl.close();
});
