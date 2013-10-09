/*global module:false*/
fs = require('fs');
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'afonigizer.js', 'spec/**/*.js'],
      options: {
        browser: true,
        devel: true,
				globals: {}
      }
    },
    uglify: {
			options: {
				preserveComments : false
			},
      dist: {
        src: ['afonigizer.js'],
        dest: 'dist/afonigizer.min.js'
      }
    },
		jasmine_node: {
			specNameMatcher: "spec/*", // load only specs containing specNameMatcher
			projectRoot: "."
		},
		watch: {
			files: '<config:jshint.files>',
			tasks: 'jshint'
		},
		gitcheckout: {
			ghPages : { options : { branch : 'gh-pages' } },
			master : { options : { branch : 'master' } }
		},
		gitcommit: {
			bookmarkletUpdate : {
				options : { message : 'updating marklet' },
				files :  { src: ['index.html'] }
			}
		},
		gitrebase: {
			master : { options : { branch : 'master' } }
		},
		template : {
			'bookmarkletPage' : {
				options : {
					data : function(){
						return {
							marklet : fs.readFileSync('dist/afonigizer.min.js','ascii').trim()
						};
					}
				},
				files : {
					'index.html' : ['index.html.tpl']
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-template');
	
  grunt.registerTask('default', ['jshint', 'uglify', 'jasmine_node']);

	//build the bookmarklet on the gh-pages branch
  grunt.registerTask('bookmarklet', [
		'gitcheckout:ghPages',
		'gitrebase:master',
		'template:bookmarkletPage',
		'gitcommit:bookmarkletUpdate',
		'gitcheckout:master'
	]);

  //TODO grunt.registerTask('plugin', [/*build plugin stuffs*/]);
  //TODO grunt.registerTask('build', ['bookmarklet', /*'plugin'*/]);
	grunt.registerTask('travis', ['jshint', 'jasmine_node']);
};
