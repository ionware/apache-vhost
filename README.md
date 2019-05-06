## Apache Virtual Host Automation Tool
Create Apache virtual host configuration easily on Linux. This automation tool
take care of all the steps to create vhost file and domain. Have a new project idea that uses Apache?
Just do the initialization with a single command.

## Installation
The tool is based on **Node.js** and can be install directly from npm. Simply run 
```npm
npm install -g apache-vhost
```
in your Terminal.

## Usage
The tool provides an executable to run commands
```bash
apache-vhost [-i] [-d domain name] [-n file-name] [ -r document-root]
```
#### Options
- [-i ] Flag run the program in interactive mode
- [-d <domain-name> ] The domain name to write to /etc/hosts file
- [-n <file-name> ] Name to give configuration file in /etc/apache2/sites-available
- [-r <document-root> ] Absolute path to the project (document) root
