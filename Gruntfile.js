module.exports = (grunt) => {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-class-properties'],
      },
      dist: {
        files: {
          'dist/gmusic-theme.js': 'src/gmusic-theme.js',
        },
      },
    },
    browserify: {
      dist: {
        files: {
          'dist/gmusic-theme.js': ['dist/gmusic-theme.js'],
        },
        options: {
          transform: ['brfs'],
          browserifyOptions: {
            standalone: 'GMusicTheme',
          },
        },
      },
    },
    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      src: ['src/*.js'],
    },
    execute: {
      genCSS: {
        src: ['lib/generate-stylesheet.js'],
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/gmusic-theme.min.js': ['dist/gmusic-theme.js'],
        },
      },
    },
    watch: {
      main: {
        files: ['src/**/*.js', 'lib/**/*'],
        tasks: ['build'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('gruntify-eslint');


  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('build', ['eslint', 'execute:genCSS', 'babel', 'browserify', 'uglify']);
};
