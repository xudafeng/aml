module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        concat: {
            dist: {
                src: [
                    "src/module.js"
                ],
                dest: 'bin/debug.js'
            }
        },
        // 打包后压缩文件
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            base: {
                files: {
                    '<%= pkg.version %>/build/index-min.js': ['<%= pkg.version %>/build/index.js']
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.registerTask("default",
        ["concat", "post-concat", "uglify", "post-uglify"])
};