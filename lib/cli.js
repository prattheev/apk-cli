const apk = require('commander');
const chalk = require('chalk');
const Fetch = require('./fetch');
const jsonfile = require('jsonfile');
const path = require('path');

var version="";
  
jsonfile.readFile(path.join(__dirname + '/../package.json'), function(err, obj) {
    version = obj.version;
    apk
      .version(chalk.bold.green(version))
      .description(chalk.bold.blue('Download APKs from CLI'))
      .usage(chalk.bold.green('<package_name> ') + chalk.dim.cyan('[options]'))
      //.option('-d , --detail', 'get details for APK package')
      //.option('-s , --search', 'search for APK package with the APK name')
      .parse(process.argv);
      
      if (apk.args.length>1) console.log(chalk.bold.red("One at a Time!"));
      else {
        //if (apk.detail) console.log("Detail");
        //else if (apk.search) console.log("Search");
       // else{ 
          if (!apk.args.length) apk.help();
          else Fetch.getDetails(apk);
        //}
      }
});