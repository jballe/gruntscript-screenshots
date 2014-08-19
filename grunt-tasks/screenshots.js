'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('screenshots', 'take screenshot', function() {

    if(!this.data.files) {
      grunt.log.writeln('files must be specified');
      return;
    }


    var async = require('async');
    var path = require('path');
    var childProcess = require('child_process');
    var phantomjs = require('phantomjs');
    var phantomjsbin = phantomjs.path;

    /*
    var options = {
      folder: './',
      url: 'http://www.google.dk',
      size: 1024,
      files: {
        'homepage' : '/',
        'privacy'  : '/intl/da/policies/?fg=1'
      }
    };
    */
    var options = this.data;

    var files = [];
    for(var prop in options.files) {
      if(!Object.hasOwnProperty(prop))
        files.push(prop);
    }

    var done = this.async();
	
	grunt.file.mkdir(options.folder);
	
    async.forEach(files, function(prop, callback) {

      var url = (options.url || '') + options.files[prop];
      var file = (options.folder || '') + (options.prefix || '') + prop

      var cite = '\"';
      var space = ' ';
      var cmd = cite + phantomjsbin + cite
              + space + cite + path.join(path.resolve(), 'phantom-screenshot.js') + cite
              + space + cite + url + cite
              + space + cite + path.join(path.resolve(), file + '.png') + cite
              + space + options.size;


      grunt.log.debug('Saving ' + prop);
      childProcess.exec(cmd, function(err, stdout, stderr) {
        if(err || stderr)
			grunt.log.errorlns('error in '+ prop +': ' + stderr);
			
        callback();
      });

    }, function() {
		grunt.log.ok('Executed ' + files.length + ' screenshots');
		done();
	});

  });
};
