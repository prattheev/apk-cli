#!/usr/bin/env node

const apk = require('commander');
const chalk = require('chalk');
const Fetch = require('./fetch');

  apk
  .version(chalk.bold.green("1.1.0"))
  .description(chalk.bold.blue('Download APKs from CLI'))
  .usage(chalk.bold.green('<package_name> ') + chalk.dim.cyan('[options]'))
  .parse(process.argv);
  
  if (!apk.args.length) apk.help();
  else if(apk.args.length>1) console.log(chalk.bold.red("One at a Time!"));
  else Fetch.getDetails(apk);