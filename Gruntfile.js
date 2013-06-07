module.exports = function (grunt) {

    grunt.initConfig({
        meta: {
            banner:
                '// Expression.js - Advanced expression evaluation in javascript\n' +
                '// (c) Tim Hall - https://github.com/timhall/Expression.js - License: MIT\n' +
                '\n'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['Expression.js']
        },

        preprocess: {
            build: {
                files: {
                    'Expression.js': 'src/build/Expression.js'
                }
            }
        },
        
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            build: {
                src: ['Expression.js'],
                dest: 'Expression.js'
            }
        },
        
        simplemocha: {
            options: {
                globals: [],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },

            all: { 
                src: ['test/**/*.js']
            }
        },

        watch: {
            all: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['test'],
                interupt: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['preprocess:build', 'concat:build', 'jshint', 'simplemocha']);
    grunt.registerTask('default', ['test', 'watch:all']);

};
