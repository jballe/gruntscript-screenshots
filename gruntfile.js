module.exports = function(grunt) {

  var dumpsfolder = 'dumps/';
  var site = grunt.option('site') || false;
  
  var folder = grunt.option('folder') || 'demo';
  var sitefolder = site ? site + '/' : '';
  var fullfolder = dumpsfolder + sitefolder + folder + '/';
  var comparefolder = site ? dumpsfolder : sitefolder;

  var filesJsonPath = site ? dumpsfolder + sitefolder + 'urls.json' : 'urls.json';
  var files = grunt.file.readJSON(filesJsonPath);
    
  grunt.initConfig({

    clean: {
      screenshots: [dumpsfolder + '**/*'],
      compare: [dumpsfolder + 'output/**/*']
    },

    screenshots: {
      web: {
        folder: fullfolder,
        prefix: 'web-',
        files: files,
        size: 1024
      },
      mobile: {
        folder: fullfolder,
		prefix: 'mobile-',
        files: files,
        size: 320
      }
    },

  'screenshots-report': {
    default: {
		folder: fullfolder,
		prefixes: ['web-', 'mobile-'],
		files: files
	}
  },

  'compare-screenshots': {
    default: {
      folder: comparefolder,
      output: 'output'
    }
  }

});

  grunt.loadTasks('grunt-tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['screenshots:web', 'screenshots:mobile']);
  grunt.registerTask('compare', ['clean:compare', 'compare-screenshots:default']);

};