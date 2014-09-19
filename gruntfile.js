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
        },
        uglify: {
            my_target: {
                files: {
                    'out/scripts/all.js': ['out/scripts/all.js']
                }
            }
        },
        htmlmin: {
            out: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true
                },
                files: [
                    { 'out/index.html': 'out/index.html'},
                    [{
                        expand: true,
                        cwd: 'out/projects',
                        src: ['**/*.html'],
                        dest: 'out/projects'
                    }]
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['browserify','jshint']);
};

