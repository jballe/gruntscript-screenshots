'use strict';

module.exports = function(grunt) {


grunt.registerMultiTask('compare-screenshots', 'compare screenshot', function() {

  var fs = require('fs');
  var path = require('path');
  var walk = require('walkdir');
  var q = require('q');

  var bin = this.data.bin || 'C:\\Program Files\\ImageMagick-6.8.9-Q16\\compare.exe';
  var folder = path.join( path.resolve(), this.data.folder);
  var outputDir = this.data.output || 'output';
  var beforeFolder = grunt.option('folder1') || 'before';
  var afterFolder = grunt.option('folder2') || 'after';

  var beforePath = path.join(folder, beforeFolder);
  var afterPath = path.join(folder, afterFolder);
  var outputPath = path.join(folder, outputDir);

  if(!fs.existsSync(beforePath)) {
    grunt.log.error('Folder doesn\'t exists: ' + beforePath);
    return;
  }

  if(!fs.existsSync(afterPath)) {
    grunt.log.error('Folder doesn\'t exists: ' + afterPath);
    return;
  }

  var images  = walk.sync(beforePath).filter(function(itemBefore) { return itemBefore.indexOf('.png')>0; })
                .map(function(itemBefore) {
    var itemAfter = path.join(afterPath, itemBefore.substring(beforePath.length));

    return {
      path1: itemBefore,
      path2: itemAfter
    };

  });

  var dones = images.map(function(itm){
    var targetFile = path.join(outputPath, path.basename(itm.path1));
    var deferred = q.defer();
    grunt.util.spawn({
      cmd: bin,
      args: [itm.path1, itm.path2, '-highlight-color', 'blue', targetFile]
    }, function(error, result, code) {
      if(result.code==1) {
        deferred.resolve(result, code);
      } else {
        grunt.log.errorlns('error generating file ' + targetFile + ' error: ', error, result);
        deferred.reject(error, result, code);
      }
    });

    return deferred.promise;
  });

  var done = this.async();
  q.all(dones).then(done);

});

};
