module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            js: {
                src: 'src/documents/scripts/app.js',
                dest: 'out/scripts/all.js'
            }
        },
        jshint: {
            files: ['src/documents/scripts/*.js'],
            options: {
                devel: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                mootools: true,
                node: true,
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['browserify','jshint']);
};

