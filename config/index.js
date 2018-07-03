const path = require('path')

let p = path.join(__dirname, 'logs')

console.log(p)
console.log('========')
console.log(path.resolve(__dirname, '../logs'))