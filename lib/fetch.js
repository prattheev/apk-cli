const request = require('request');
const chalk = require('chalk');
const Store = require('./store');
const $ = require('cheerio');

exports.getDetails=function(apk){
  console.log("Searching for the package with name " + chalk.bold.green(apk.args[0]));
  var url = "https://apkpure.com/search?q="+apk.args[0];
  request(url, function (error, response, body) {
    if (error || response.statusCode!=200) console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
    if(response.statusCode==200) {
      try{
        var link = "https://apkpure.com" + $('a',$('#search-res',body)).attr('target','_blank')[0].attribs.href;
        var linkSplit = link.split("/");
        if(linkSplit[linkSplit.length-1]!=apk.args[0]) console.log(chalk.bold.red("No APK found with package name ") + chalk.bold.blue(apk.args[0]) + chalk.bold.green("\nDid you mean ") + chalk.bold.magenta(linkSplit[linkSplit.length-1]));
        else{
          link+="/download?from=details";
          request(link, function (error, response, body) {
            if (error || response.statusCode!=200) console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
            if(response.statusCode==200) {
              try{
                link = $('#download_link',$('.fast-download-box',body))[0].attribs.href;
                link.match(/:\/\/download.apkpure.com/).index;
                Store.getAPK(link,apk.args[0]);
              }
              catch(err){
                console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
              }
            }
          });
        }
          }
          catch(err){
              console.log(chalk.bold.red("Something went wrong! Post an issue at the package repository :("));
          }
      }
    });  
};