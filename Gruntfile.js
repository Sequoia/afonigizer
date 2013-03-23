/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                 '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                 '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                 ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    jshint: {
      files: ['grunt.js', 'lib/**/*.js', 'spec/**/*.js'],
      options: {
        browser: true,
        devel: true,
				globals: {}
      }
    },
    concat: {
      dist: {
				src: ['<banner:meta.banner>','lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
			options: {
				preserveComments : false
			},
      dist: {
        src: ['<banner:meta.banner>', '<%= concat.dist.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
		watch: {
			files: '<config:jshint.files>',
			tasks: 'jshint'
		}
  });

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//
  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
