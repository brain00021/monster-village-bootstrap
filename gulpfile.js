var gulp = require('gulp'), // 載入 gulp    
    gulpImagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    gulpPlumber = require('gulp-plumber'), // 載入 gulp-plumber
    concat = require('gulp-concat');
    del = require('del');
var sassLint = require('gulp-sass-lint'); //他說檢查錯誤 



// Static Server + watching scss/html files
gulp.task('server', function() {
    browserSync.init({
        server: "build/"
    });
});
gulp.task('copy', function() {
    gulp.src(['./source/lib/script/**/*'])
        .pipe(gulp.dest('./build/js/'))
    gulp.src(['./source/lib/css/**/*'])
        .pipe(gulp.dest('./build/css/'))
    gulp.src('./source/lib/image/**/*')
        .pipe(gulp.dest('./build/img/'))
    gulp.src('./source/lib/font/**/*')
        .pipe(gulp.dest('./build/font/'))
});
//Before build file clean the old one
gulp.task('clean', function(cb) {
    del(['./build/'], cb)
});

// concat串接所有js放在plugin.js
// compile the jshint script
gulp.task('concat', function() {
var gulpUglify = require('gulp-uglify');
  return gulp.src('source/lib/*.js')
    .pipe(concat('plugin.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('script', function() {
    var gulpUglify = require('gulp-uglify'); // 載入 gulp-uglify
    var jshint = require('gulp-jshint'),
        gulpPlumber = require('gulp-plumber'),
        gulpNotify = require("gulp-notify");        
    gulp.src('./source/js/*.js') // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpPlumber()) //判斷除錯不要一直斷watch
        .pipe(jshint())
        .pipe(concat('all.js'))
        .pipe(gulpUglify()) // 將 JavaScript 做最小化
        .pipe(gulp.dest('./build/js')) // 指定最小化後的 JavaScript 檔案目錄
        .pipe(gulpNotify("Minify JavaScript Finish"))
        .pipe(browserSync.stream())
});
// image 圖片問題
gulp.task('images', function() {
    var cache = require('gulp-cache');
  var imagemin = require('gulp-imagemin');
    gulp.src('./source/images/**/*') //指定的路徑
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) // 縮編
        .pipe(gulp.dest('./build/images')); //匯出檔案
});
// 服務


// sass 
gulp.task('styles', function() {
    var gulpSass = require('gulp-sass'), // 載入 gulp-sass
    //  gulpCompass = require('gulp-compass'), //載入 gulp-compass
        mqpacker = require('css-mqpacker'),
        autoprefixer = require('gulp-autoprefixer'), //瀏覽器的前置號
        sourcemaps = require('gulp-sourcemaps'),
        postcss = require('gulp-postcss'),
        syntax = require('postcss-scss'),
        processors = [
        require('autoprefixer')({ browsers: ['last 5 version']}),
        require('css-mqpacker')
        ];
    

    return gulp.src('./source/sass/**/*.+(scss|sass)')
        .pipe(gulpPlumber())
        .pipe(sourcemaps.init())
        .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
        .pipe(postcss(processors))
        // .pipe(autoprefixer({ browsers: ['> 5%', 'ie 6-8', 'Firefox <= 20'] })) //網頁前置好
        .pipe(sourcemaps.write('.'))
        /*.pipe(compass({ //這段內輸入config.rb的內容
            sourcemap: true, //compass 1.0 sourcemap
            style: 'compact', //CSS壓縮格式，預設(nested)
            comments: true, //是否要註解，預設(true)
            require: ['susy'] //額外套件 susy
        }))*/
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(browserSync.stream()) //同步
});
/*
gulp watch 重要性 執行watch裡面的所有客製化  
gulp task主要是執行的認識做法,
gulp.src 目錄
.pipe()比較像是水管接任務記住不要加分號 會斷掉 
gulp.dest是輸出路徑*/
gulp.task('watch', function() {
    gulp.watch('./source/js/*.js', ['script']);
    gulp.watch('./source/sass/**/*.scss', ['styles']);
    gulp.watch("./build/*.html").on('change', browserSync.reload);
    // gulp.watch('source/images/**',['images']);
    gulp.watch('./source/lib/*.js',['concat']);
});
// compass task作法
gulp.task('copy', function () {
    return gulp.src(['./source/lib/**'])
    .pipe(gulp.dest('./build/lib'));
});
// Start compile stylus jade js
gulp.task('compile', function(){
    gulp.start('script', 'styles', 'images','concat')
});

//GO
gulp.task('default',['server'], function() {
    gulp.start('watch', 'compile');
});
// 設定gulp的所有設定
