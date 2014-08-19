'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('screenshot', 'take screenshot', function() {

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

    async.forEach(files, function(prop, callback) {

      var url = options.url + options.files[prop];
      var file = options.folder + prop

      var cite = '\"';
      var space = ' ';
      var cmd = cite + phantomjsbin + cite
              + space + cite + path.join(__dirname, 'phantom-screenshot.js') + cite
              + space + cite + url + cite
              + space + cite + path.join(__dirname, file + '.png') + cite
              + space + options.size;


      console.log('execute: ' + cmd);
      childProcess.exec(cmd, function(err, stdout, stderr) {
        if(err || stderr)
        console.log('return for ', prop, err, stdout, stderr);
        callback();
      });

    }, done);

  });
};
