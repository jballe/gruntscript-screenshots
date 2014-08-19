'use strict';

module.exports = function(grunt) {

	function getFolderName(path, dir) {
		var dirs = dir.split('\\');
		return dirs[dirs.length-2];
	}

  grunt.registerMultiTask('screenshots-report', 'Report of screenshot', function() {

var folder = path.join(path.resolve(), this.data.folder);
var files = this.data.files;
var prefixes = this.data.prefixes;

var reportName = getFolderName(path, folder) + '.pdf';
var reportPath = path.join(folder, reportName);

var files = [];
for(var prop in files) {
	for(var index = 0; index<prefixes.length; index++) {
		var prefix = prefixes[index];
		var imgname = prefix + prop;
		var imgsrc = folder + imgname + '.png';
		files.push({
			name: imgname,
			url: files[prop],
			src: imgsrc
		});

var data = {
		date: new Date(),
		files: files
};



/*
	var PDFDocument = require('pdfkit');
	var fs = require('fs');
	var path = require('path');

	var folder = path.join(path.resolve(), this.data.folder);
	var files = this.data.files;
	var prefixes = this.data.prefixes;

	var reportName = getFolderName(path, folder) + '.pdf';
	var reportPath = path.join(folder, reportName);

	var doc = new PDFDocument();
	var stream = doc.pipe(fs.createWriteStream(reportPath));

	for(var prop in files) {
		for(var index = 0; index<prefixes.length; index++) {
			var prefix = prefixes[index];
			var img = folder + prefix + prop + '.png';

			doc.addPage({page_size: 'a4'});

			var text = prefix + ' ' + files[prop];
			doc.text(text, 30, 30, {link: files[prop], underline: false});
			doc.image(img);
		}
	}

	doc.save();
	doc.end();
	grunt.log.ok('Report written to: ' + reportPath);
*/

// Temp
}}


  });

};
