module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true
      },
      files: ['assets/styles/**/*.less', 'assets/scripts/**/*.js', '*.html'],
      tasks: ['default']
    },

    connect: {
      server: {
        options: {
          hostname: '',
          port: 9001
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['assets/styles']
        },
        files: {
          'css/main.css': 'assets/styles/main.less'
        }
      },
      production: {
        options: {
          paths: ['assets/styles'] 
        },
        files: {
          'css/main.css': 'assets/styles/main.less'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.description %>\n @author: <%= pkg.author %>\n @email: <%= pkg.email %>\n @url: <%= pkg.homepage %>\n @version: <%= pkg.version %>\n*/\n',
        keepSpecialComments: 0
      },
      minify: {
        expand: true,
        cwd: 'css',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },

    jshint: {
      beforeconcat: ['Gruntfile.js', 'assets/scripts/*.js'],
      afterconcat: ['js/main.js']
    },

    concat: {
      development: {
        src: ['assets/scripts/*.js'],
        dest: 'js/main.js'
      },
      production: {
        src: ['assets/scripts/*.js'],
        dest: 'js/main.js'
      }
    },

    uglify: {
      options: {
        banner: '/*!\n <%= pkg.description %>\n @author: <%= pkg.author %>\n @email: <%= pkg.email %>\n @url: <%= pkg.homepage %>\n @version: <%= pkg.version %>\n*/\n'
      },
      production: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },

    imagemin: {
      production: {
        options: {
          optimizationLevel: 7,
          pngquant: true,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'images',
            src: ['**/*.png', '**/*.jpg'],
            dest: 'images'
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('styles', ['less:development']);
  grunt.registerTask('scripts', ['jshint:beforeconcat', 'concat:development', 'jshint:afterconcat']);
  grunt.registerTask('images', ['imagemin']);
  grunt.registerTask('default', ['styles', 'scripts']);
  grunt.registerTask('dist', ['less:production', 'cssmin', 'jshint:beforeconcat', 'concat:production', 'jshint:afterconcat', 'uglify:production', 'imagemin']);

  grunt.registerTask('server', ['connect', 'watch']);
  
};