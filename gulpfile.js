'use strict'
/*
*1. less编译 压缩  合并
*2. JS合并 压缩 混淆
*3. img 复制
*4. html 压缩
 */

//载入gulp包 因为gulp包中提供了一些API
var gulp = require('gulp');
//载入gulp-less包
var less = require('gulp-less');
//载入gulp-cssnano包
var cssnano = require('gulp-cssnano');
//载入gulp-concat包
var concat = require('gulp-concat');
//载入gulp-uglify包 执行js文件的压缩混淆
var uglify = require('gulp-uglify');
//载入模块 gulp-htmlmin模块
var htmlmin = require('gulp-htmlmin');
//载入 browser-sync包
var browserSync=require('browser-sync');
var reload = browserSync.reload;

//*1. less编译 压缩  合并没有必要 一般预处理css都可以导包
gulp.task('style',function(){
	//这个函数是在执行style这个任务时自动执行的函数
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream:true
	}));
})


//*2. JS合并 压缩 混淆
gulp.task('script',function(){
	//这个函数是在执行script这个任务时自动执行的函数
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify()) //压缩混淆一起执行
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream:true
	}));
})


//*3. img 复制

gulp.task('img',function(){
	//这个函数是在执行img这个任务时自动执行的函数
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));
})


//*4. html 压缩
gulp.task('html',function(){
	//这个函数是在执行html这个任务时自动执行的函数
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({
		stream:true
	}));
})


gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist']
		}
	}, function(err, bs) {
   	 	console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/images/*.*',['img']);
})


