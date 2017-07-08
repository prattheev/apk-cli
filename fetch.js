const request = require('request');
const chalk = require('chalk');
const Store = require('./store');

exports.getDetails=function(apk){
  console.log("Searching for the package with name " + chalk.bold.green(apk.args[0]));
  var url = "http://apkfind.com/store/download?id="+apk.args[0];
    request(url, function (error, response, body) {
      if (error || response.statusCode!=200) console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
      if(response.statusCode==200) {
          try{
              var valid = require("cheerio")("a",body)[4].attribs.href;
              var pattern = 'dl.apk-cloud.com';
              var regEx = new RegExp(pattern);
              valid.match(regEx).index;
              var link = "http:" + valid;
              Store.getAPK(link,apk.args[0]);
          }
          catch(err){
              console.log(chalk.bold.red("No APK found with the package ") + chalk.bold.blue(apk.args[0]));
          }
      }
    });  
};