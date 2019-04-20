const fs = require('fs');
const path = require('path');

const virtualHostConf = fs.readFileSync(path.join('src', 'templates', 'vhost'))
  .toString()

const parsedVirtualHostConf = virtualHostConf.split('\n\r');

console.log(parsedVirtualHostConf.join('\n\r'));