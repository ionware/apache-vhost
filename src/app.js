const path = require('path');
const fs = require('fs');

const virtualConf = fs.readFileSync(path.join('src', 'templates', 'vhost'))
  .toString();

const getConfString = (domain, documentRoot) => virtualConf
  .split('\n\r')
  .map(ln => ln.replace(/__domain_name__/g, domain)
    .replace(/__dR__/g, documentRoot))
  .join('\r\n');

const assertConfNotExist = name => fs.existsSync(`/etc/apache2/sites-available/${name}.conf`);

module.exports = {
  getConfString,
  assertConfNotExist,
};
