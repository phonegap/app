var fs = require("fs");
var YAML = require('yamljs');
var escape = require('escape-html');

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

var _finishedFiles = function () {
  var fileString = JSON.stringify(dataArray, null, 2);
  var permalinks = ["/"];
  dataArray.map(function(post){
    var permalink = post.permalink;
    permalinks.push(permalink.replace("/app/","/"));
  });
  fileString = "module.exports = {\n  posts:"+fileString+",";
  fileString += "\n  routes:"+JSON.stringify(permalinks, null, 2)+"\n}";
  fs.writeFile("./data.js", fileString, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
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
      _finishedFiles();
    }
  })
};

var postFiles = _getAllFilesFromFolder("./posts");
var dataArray = [];
postFiles.map(function(str) {
  _readFile(str);
});
