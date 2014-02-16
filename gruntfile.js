module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "dist/js/main.js": ["app/js/main.js"]
        }
      }
    },
    sass: {
      dev: {
        files: {
          "dist/css/style.css": "app/sass/style.scss"
        }
      }
    },
    watch: {
      scripts: {
        files: ["app/js/*.js"],
        tasks: ["uglify"]
      },
      sass: {
        files: ["app/sass/*.scss"],
        tasks: ['sass:dev']
      },
      html: {
        files: ['dist/*.html']
      }
    }
  });
  grunt.registerTask("default", "watch");
}