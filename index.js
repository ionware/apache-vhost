#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const app = require('./src/app');
const prompt = require('./src/prompt');

/**
 * Walk through all routines to create the virtual host.
 * @param domain
 * @param documentRoot
 * @param fileName
 */
function run(domain, documentRoot, fileName) {
    const confString = app.getConfString(domain, documentRoot);
    app.createConf(fileName, confString);
    console.log("✔️  Created configuration file.");
    app.createDomain(domain);
    console.log("✔️  Domain name created.");
    console.log("⚙️  Running Clean up commands");
    app.runCommand(fileName);
    console.log("✔️  Apache Virtual Host created successfully!!");
    process.exit(0);
}
program
    .version('1.0.0')
    .option('-i, --interactive', 'Run in interactive mood')
    .option('-r, --document-root <document-root>', 'Document root for the apache vhost')
    .option('-d, --domain <domain>', 'Domain name to use')
    .option('-n, --name <file-name>', 'The name the conf file should bear in apache configuration folder')
    .parse(process.argv);
const {
    interactive, domain, documentRoot, name: fileName } = program;

if (interactive) {
    inquirer.prompt(prompt).then(({ domain, documentRoot, fileName }) => {
        run(domain, documentRoot, fileName);
    });
} else {
    if (domain && documentRoot && fileName) {
        run(domain, documentRoot, fileName);
    } else {
        console.error("❌️  Insufficient arguments passed.");
        process.exit(1);
    }
}

