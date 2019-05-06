const program = require('commander');
const inquirer = require('inquirer');
const app = require('./src/app');
const prompt = require('./src/prompt');

program
  .version('1.0.0')
  .option('-i, --interactive', 'Run in interactive mood')
  .option('-r, --document-root <document-root>', 'Document root for the apache vhost')
  .option('-d, --domain <domainName>', 'Domain name to use')
  .option('-n, --name <file-name>', 'The name the conf file should bear in apache configuration folder')
  .parse(process.argv);
const {
  interactive, domain, documentRoot, fileName } = program;

if (interactive) {
  inquirer.prompt(prompt).then(({ domain, documentRoot, fileName }) => {
    const confString = app.getConfString(domain, documentRoot);
    app.create(domain, confString, fileName);
    console.log("Configuration file has been created Successfully!!");
  });
}
