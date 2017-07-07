var Download = require('download');
var downloadStatus = require('./status');
const chalk = require('chalk');

exports.getAPK=function(url,pkg){
  console.log(chalk.bold.magenta("APK found!"));
  var download = new Download()
    .get(url)
    .dest(__dirname)
    .rename(pkg+'.apk')
    .use(downloadStatus())
    .run(function(err,files){
      if(err) console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
      if(files) console.log(chalk.bold.green("Download Successful!"));  
    });
};