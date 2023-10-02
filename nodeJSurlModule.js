const url=require('url');
const address = 'https://www.google.com/';
const parsed = url.parse(address, true);
// Parse method returns an object containing url properties
console.log(parsed.host);
console.log(parsed.pathname);
console.log(parsed.search);
// console.log(parsed);

var qdata = parsed.query;
// console.log(qdata);
console.log(qdata.month);