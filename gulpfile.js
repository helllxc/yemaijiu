// 请求模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// 创建任务（执行任务）
// 目的：编译sass文件
gulp.task('buildSass',function(){
	// 查找需要编译的文件
	gulp.src('src/sass/*.scss')

		// 编译scss文件
		.pipe(sass({outputStyle:'compact'}).on("error",sass.logError))

		// 输出文件
		.pipe(gulp.dest('src/css'))
		
		//编译成功后刷新利用browser-sync刷新页面
		.pipe(browserSync.reload({stream:true}))

});


// 监听sass文件
gulp.task('jtSass',function(){
	// 监听文件，当文件有修改时，执行buildSass任务
	gulp.watch('src/sass/*.scss',['buildSass']);
})

//创建任务（执行任务）
gulp.task('server',function(){
	browserSync({
		server:{
			baseDir:"./src"
		},
		post:4000,
		// proxy:'http://localhost/',
		//添加html文件
		files:['./src/*.html'],
	});
	gulp.watch('src/sass/*.scss',['buildSass']);
})