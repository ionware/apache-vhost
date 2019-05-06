const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

// Read the template for virtual host configuration file.
const virtualConf = fs.readFileSync(path.join('src', 'templates', 'vhost'))
    .toString();
/**
 * Create configuration file by replacing template markers.
 * @param domain
 * @param documentRoot
 * @returns {string}
 */
function getConfString(domain, documentRoot) {
    return virtualConf.split('\n\r')
        .map(ln => ln.replace(/__domain_name__/g, domain)
            .replace(/__dR__/g, documentRoot))
        .join('\r\n');
}
/**
 * Check if the configuration file exist in Apache dir or not.
 * @param fileName String
 * @returns {boolean}
 */
function assertConfExists (fileName) {
    return fs.existsSync(fileName)
}
/**
 * Creates configuration file within Apache Sites-available folder.
 * @param name
 * @param confString
 */
function createConf (name, confString) {
    const fileName = path.join('/etc/apache2/sites-available', `${name}.conf`);
    // Check if configuration file exists before proceeding.
    if (assertConfExists(fileName)) {
        console.error("✖️  Configuration file already exists!!");
        process.exit(1);
    }
    fs.writeFileSync(
        path.join('/etc/apache2/sites-available', `${name}.conf`),
        confString,
    );
}
/**
 * Creates domain name within /etc/hosts file.
 * @param domain
 */
function createDomain(domain) {
    // We want to strip www. from domain names.
    if (domain.slice(0, 3) == 'www')
        domain = domain.slice(4);
    const hosts = path.join('/etc/hosts');
    const fd = fs.openSync(hosts, 'a');
    fs.writeSync(fd, `127.0.0.1\t${domain.trim()}\r\n`);
}

/**
 * Run activation and clean up commands.
 * @param fileName
 */
function runCommand(fileName) {
    const commands = [
        `sudo a2ensite ${fileName}.conf`,
        `sudo systemctl reload apache2`
    ];
    for (let command of commands) {
        shell.exec(command);
    }
}

module.exports = {
    getConfString,
    createConf,
    createDomain,
    runCommand,
};
