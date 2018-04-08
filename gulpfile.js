const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');

const config = {
    root: './src/',
    html: {
        src: 'index.html'
    },
    css: {
        watch: 'precss/**/*.less',
        src: 'precss/+(styles|styles-per|styles-ie9).less',
        dest: 'css'
    },
    smartgrid: {
        src: 'smartgrid.js',
        dest: 'precss'
    }
};

gulp.task('build', function () {
    gulp.src(config.root + config.css.src)
            /*.pipe(sourcemaps.init())*/
            .pipe(less())
            .pipe(gcmq())
            /*.pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))*/
            .pipe(cleanCSS({
                level: 2
            }))
            /*.pipe(sourcemaps.write('.'))*/
            .pipe(gulp.dest(config.root + config.css.dest))
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
    gulp.watch(config.root + config.css.watch, ['build']);
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