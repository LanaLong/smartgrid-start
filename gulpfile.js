const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');

// from mdb package
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
/* const plugins = require('./js/modules'); */
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const uncss = require('gulp-uncss');


const config = {
    root: './src/',
    html: {
        src: 'index.html'
    },
    css_less: {
        watch: 'precss/**/*.less', // прослушка и источник это разные файлы
        src: 'precss/+(styles|styles-per|styles-ie9).less',
        dest: './dist/css' // было dest: 'css'
    },
    smartgrid: {
        src: 'smartgrid.js',
        dest: 'precss'
    }
};

// CSS Tasks // extends from MDB
gulp.task('css-compile', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('css-minify', function() {
    gulp.src(['./dist/css/*.css', '!dist/css/*.min.css'])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css'))
});

gulp.task('build', function () {
    gulp.src(config.root + config.css_less.src)
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(concat('style-all.css')) // прочитать спецификацию, настроить работу
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({ // минификация файла
                level: 2
            }))
           /* .pipe(uncss({  //не адекватно может работать, когда классы добавляются js, подходит для статичной верстки
                html: ['scr/index.html']
                })) */
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.root + config.css_less.dest))
            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('grid', function(){
    delete require.cache[require.resolve('./' + config.smartgrid.src)];
    let options = require('./' + config.smartgrid.src);
    smartgrid(config.root + config.smartgrid.dest, options);

    options.offset = '3.15%';
    options.breakPoints.xxs.offset = '1%';
    options.filename = 'smart-grid-per';
    smartgrid(config.root + config.smartgrid.dest, options);
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.root + config.css_less.watch, ['build']);
    gulp.watch(config.root + config.html.src, browserSync.reload);
    gulp.watch('./' + config.smartgrid.src, ['grid']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.root
        },
        //tunnel: true
    });
});