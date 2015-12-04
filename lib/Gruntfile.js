module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      javascripts: {
        files: ['./app/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};