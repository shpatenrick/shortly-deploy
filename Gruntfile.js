module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: ['public/**/*.js'],
        dest: 'concatFile/concat.js'
      },
      css: {
        src: ['public/**/*.css'],
        dest: 'concatFile/concat.css'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/output.min.js': ['concatFile/concat.js']
        }
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'concatFile/',
          src: ['concat.css'],
          dest: 'public/dist/',
          ext: '.min.css'
        }]
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/*.js'
      ]
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      multiple: {
        command: [
          'git add .',
          'git commit',
          'git push live master'
        ].join('&&')
      }
      // commit: {
      //   command: ['git commit']
      // }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['mochaTest', 'concat', 'uglify', 'cssmin', 'eslint'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  // grunt.registerTask('concat', ['concat']);

  grunt.registerTask('deploy', function() {
    if (grunt.option('prod')) {
      //do stuff
      grunt.task.run(['build']);
    } else {
      grunt.task.run(['build']);
    }
    // add your deploy tasks here
    // instead of saying git add/ git commit git push 
    // just call this function
  });

  // grunt.registerTask('default', []);


};
