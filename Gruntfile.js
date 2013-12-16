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
      //note that (non-"string") object keys cannot contain hyphens in javascript
      ghPages : { options : { branch : 'gh-pages' } },
      master : { options : { branch : 'master' } }
    },
    gitcommit: {
      bookmarkletUpdate : {
        //add <config:pkg.version> or something else here
        //for a more meaningful commit message
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
              //the only "data" are the contents of the javascript file
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

  //git rebase will not work if there are uncommitted changes,
  //so we check for this before getting started
  grunt.registerTask('assertNoUncommittedChanges', function(){
    var done = this.async();

    grunt.util.spawn({
      cmd: "git",
      args: ["diff", "--quiet"]
    }, function (err, result, code) {
      if(code === 1){
        grunt.fail.fatal('There are uncommitted changes. Commit or stash before continuing\n');
      }
      done(!err);
    });
  });


  //this task is a wrapper around the gitcommit task which
  //checks for updates before attempting to commit.
  //Without this check, an attempt to commit with no changes will fail
  //and exit the whole task.  I didn't feel this state (no changes) should
  //break the build process, so this wrapper task just warns & continues.
  grunt.registerTask('commitIfChanged', function(){
    var done = this.async();
    grunt.util.spawn({
      cmd: "git",
      args: ["diff", "--quiet", //just exists with 1 or 0 (change, no change)
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
