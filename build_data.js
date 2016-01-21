var fs = require("fs");
var YAML = require('yamljs');
var escape = require('escape-html');
var jade = require('jade');
var mkdirp = require('mkdirp');

var _getAllFilesFromFolder = function(dir) {
    var filesystem = require("fs");
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);
    });
    return results;
};

var _splitPostFile = function (rawString) {
  var stringArray = rawString.split('---');
  return {
    yaml: stringArray[1].trim(),
    post: escape(stringArray[2].trim())
  }
}

var _writeAppPage = function(app){
  if (app.slug == undefined) {
    app.slug = app.permalink.split('/')[2];
  }
  mkdirp('./_site/'+app.slug, function (err) {
    if (err) {
      console.error(err)
    } else {
      var html = appFn(app);
      fs.writeFile('./_site/'+app.slug+'/index.html', html, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log(app.slug);
      });
    }
  });
}

var _writeAppPaginatePage = function(apps, pageNumber, pageTotal){
  var path = pageNumber == 0 ? './_site/' : './_site/page'+(pageNumber+1)+'/';
  mkdirp(path, function (err) {
    if (err) {
      console.error(err)
    } else {
      var html = appPaginateFn({apps:apps, pageNumber:(pageNumber+1), pageTotal:pageTotal});
      fs.writeFile(path+'index.html', html, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log(path);
      });
    }
  });
}

var appFn = jade.compileFile('./src/layouts/app.jade');
var appPaginateFn = jade.compileFile('./src/layouts/app-paginate.jade');

var _finishedParsingFiles = function () {
  dataArray.forEach(_writeAppPage);

  var appsPerPage = 30;
  var pageCount = 0;
  var pageTotal = Math.ceil(dataArray.length / appsPerPage);
  while (pageCount * appsPerPage < dataArray.length){
    var pageSet = dataArray.slice(pageCount * appsPerPage, pageCount * appsPerPage + appsPerPage);
    _writeAppPaginatePage(pageSet, pageCount, pageTotal);
    pageCount++;
  }
}

var _readFile = function (filepath) {
  fs.readFile(filepath, "utf8", function(err, data) {
    if (err) throw err;
    try {
      var tempObj = _splitPostFile(data);
    } catch (e) {
      console.error("Missing yaml or post data "+filepath);
    }
    try {
      var dataObj = YAML.parse(tempObj.yaml);
    } catch (e) {
      console.error("Invalid yaml data on "+filepath);
    }
    dataObj.post = tempObj.post;
    dataArray.push(dataObj);
    if(dataArray.length == postFiles.length){
      _finishedParsingFiles();
    }
  })
};

var postFiles = _getAllFilesFromFolder("./posts");
var dataArray = [];
postFiles.map(function(str) {
  _readFile(str);
});
