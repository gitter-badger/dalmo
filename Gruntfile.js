module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n',
        mangle: {
          except: ['jQuery', '$', 'define', 'module', 'exports']
        }
      },
      dalmo: {
        files: {
          'jquery.dalmo.min.js': ['src/jquery.dalmo.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'jquery.dalmo.min.css': 'src/jquery.dalmo.styl'
        }
      }
    },
    watch: {
      html: {
        files: ['**/*.html']
      },
      stylus: {
        files: ['**/*.styl'],
        tasks: ['stylus']
      },
      options: {
        livereload: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'connect:server',
    'watch'
  ]);
};

