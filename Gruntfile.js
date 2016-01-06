module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			dist: 'dist/'
		},
		// js压缩
		uglify: {
			'dist/js/main.min.js': 'src/js/*.js'
		},
		// less编译
		less: {
			build: {
				files: [{
					'src/css/style.css': 'src/css/style.less'
				}]
			}
		},
		// css压缩
		cssmin: {
			compress: {
				files: {
					'dist/css/style.min.css': 'dist/css/style.css'
				}
			}
		},
		// 监听
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['src/css/**/*.less', 'src/js/*.js', '*.html'],
				tasks: ['default'],
				options: {
					spawn: false
				}
			}
		},
		// 雪碧图
		sprite: {
			options: {
				imagepath: 'src/images/icon/',
				imagepath_map: null,
				spritedest: 'dist/images/',
				padding: 2,
				useimageset: false,
				newsprite: false,
				spritestamp: true,
				cssstamp: true,
				algorithm: 'binary-tree',
				engine: 'pixelsmith'
			},
			autoSprite: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: '*.css',
					dest: 'dist/css/',
					ext: '.css'
				}]
			}
		},
		// 将不能用雪碧图的图片拷贝到dist/images文件夹下
		copy: {
			main: {
				files: [{
					flatten: true,
					expand: true,
					filter: 'isFile',
					src: ['src/images/*'],
                    dest: 'dist/images/'
				}]
			}
		}
	});
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['clean', 'less', 'sprite', 'cssmin', 'uglify', 'copy']);
	grunt.registerTask('live', ['watch']);
}