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

  grunt.registerTask('assertNoUncommittedChanges', function(){
    var done = this.async();

    grunt.util.spawn({
      cmd: "git",
      args: ["diff", "--quiet"]
    }, function (err, result, code) {
      if(code === 1){
        grunt.fail.fatal('There are uncommitted changes. Commit or stash before continuing\n');
      }
      if(code <= 1){ err = null; } //code 0,1 => no error
      done(!err);
    });
  });

  //this block is here to make sure there is something to commit
  //Committing "no changes" will abort due to warnings
  grunt.registerTask('commitIfChanged', function(){
    var done = this.async();

    grunt.util.spawn({
      cmd: "git",
      args: ["diff", "--quiet", //just exists with 1 or 0 (chagne, no change)
        '--', grunt.config.data.gitcommit.bookmarkletUpdate.files.src]
    }, function (err, result, code) {
      //only attempt to commit if git diff picks something up
      if(code === 1){
        grunt.log.ok('committing new index.html...');
        grunt.task.run('gitcommit:bookmarkletUpdate');
      }else{
        grunt.log.warn('no changes to index.html detected...');
      }

      if(code <= 1){ err = null; } //code 0,1 => no error
      done(!err);
    });
  });

  grunt.registerTask('bookmarklet', 'build the bookmarklet on the gh-pages branch',
    [ 'assertNoUncommittedChanges', 'gitcheckout:ghPages', 'gitrebase:master',
      'template:bookmarkletPage', 'commitIfChanged', 'gitcheckout:master']
  );

  //TODO grunt.registerTask('plugin', [/*build plugin stuffs*/]);
  //TODO grunt.registerTask('build', ['bookmarklet', /*'plugin'*/]);
  grunt.registerTask('travis', ['jshint', 'jasmine_node']);
};
