/// <binding AfterBuild='default' />
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    js_concat = require('gulp-concat'),
    js_minify = require('gulp-terser');

gulp.task('sass', () => {
    return gulp.src('./assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(changed('./assets/scss/', { extension: '.css' }))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/scss'));
});

gulp.task('js', () => {
    return gulp.src(['./assets/js/features/*.js', './assets/js/plugins/notify.js'])
        .pipe(sourcemaps.init())
        .pipe(js_concat('main.min.js'))
        .pipe(js_minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('js', () => {
    return gulp.src([
            './Assets/js/vendors/jquery/jquery-3.4.0.min.js',
            './Assets/js/vendors/jquery/jquery.validate.min.js',
            './Assets/js/vendors/jquery/jquery.validate.unobtrusive.min.js',
            './Assets/js/vendors/jquery/jquery.zoom.js',
            './Assets/js/vendors/jquery/jquery.easy-autocomplete.min.js',
            './Assets/js/vendors/popper/popper.min.js',
            './Assets/js/vendors/bootstrap-4.3.1/bootstrap.min.js',
            './Assets/js/vendors/mvc-grid/mvc-grid.js',
            './Assets/js/vendors/feather-icons/feather.min.js',
            './Assets/js/vendors/axios/axios.min.js',
            './Assets/js/vendors/pdfobject/PdfObject.js',
            './Assets/js/main.min.js',
            './Assets/js/vendors/slick/slick.js',
            './Assets/js/plugins/ls.bgset.min.js',
            './Assets/js/plugins/lazysizes.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(js_concat('footer.min.js'))
        .pipe(js_minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./assets/js/features/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('sass', 'js'));