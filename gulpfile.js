const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const open = require('gulp-open');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');

/*
    -- TOP LEVEL FUNCTIONS

    gulp.task - Define tasks
    gulp.src - Point tofiles to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Logs Message

gulp.task('message',async() => {
    return console.log('gulp is working');
    done();
});


// optimize images

gulp.task('imageMin', async() => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
});

// copy videos

gulp.task('videos', async() => {
    gulp.src('src/videos/*')
        .pipe(gulp.dest('dist/videos'))
        .pipe(connect.reload());
});


// compile sass

gulp.task('sass', async() => {
    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// Concatinate scripts and minify

gulp.task('scripts', async() => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// create local server

gulp.task('connect', async() => {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});

// copy html files

gulp.task('copyHtml', async() => {
    gulp.src('src/*.html')
     .pipe(gulp.dest('dist'))
     .pipe(connect.reload());
 });


// open this file on that url

 gulp.task('open',  async() => {
    gulp.src('dist/index.html')
        .pipe(open({uri: 'http://localhost:8001/'}));
});


// Stuff for template builder nunjacks

gulp.task('nunjucks', async() => {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/pages/**/*.+(html|njk|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['src/templates']
      }))
    // output files in app folder
    .pipe(gulp.dest('src'))
    .pipe(connect.reload());
  });

  
// watch for file changes and trigger function

gulp.task('watch',  async() =>{
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./src/images/*', gulp.series('imageMin'));
    gulp.watch('./src/videos/*', gulp.series('videos'));
    gulp.watch('./src/sass/*.sass', gulp.series('sass'));
    gulp.watch('./src/pages/*.njk', gulp.series('nunjucks'));
    gulp.watch('./src/templates/macros/*.njk', gulp.series('nunjucks'));
    gulp.watch('./src/templates/partials/*.njk', gulp.series('nunjucks'));
    gulp.watch('./src/templates/*.njk', gulp.series('nunjucks'));
    gulp.watch('./src/*.html', gulp.series('copyHtml'));
});

// concatenate the commands to run

gulp.task('build', gulp.series('message','nunjucks','copyHtml', 'imageMin','sass', 'scripts', 'videos'));
gulp.task('default', gulp.series('message','nunjucks', 'imageMin','sass', 'scripts','copyHtml','connect', 'videos', 'open','watch'));
