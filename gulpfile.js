"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');
const pug = require('gulp-pug');

sass.compiler = require('node-sass');

const fusv = require('find-unused-sass-variables');
// 'scss' is a folder
let unused = fusv.find('source/sass');

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var del = require("del");
var include = require("posthtml-include");
var bem_validate = require("bem-validate");

var rename = require("gulp-rename");

gulp.task("unused", function() {
  console.log(unused.unused);
  console.log(unused.total);
})

gulp.task("clean", function () {
  return del("build");
});

gulp.task("webp", function (){
  return gulp.src("source/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpeg,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task ("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
});

gulp.task('spritesmith', function () {
  var spriteData = gulp.src('source/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'left-right',
    padding: 60,
    imgPath: '../img/sprite/sprite.png'
  }));

  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/sprite/'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('build/css/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('pug', function(){
  return gulp.src("source/pug/index.pug")
    .pipe(
      pug({})
    )
    .pipe(gulp.dest('build/'));
})

gulp.task('js', function () {
  return gulp.src([
    "source/js/*.js",
    "!source/js/include-html.js"
  ])
    .pipe(gulp.dest('build/js/'));
})

gulp.task("html", function(){
  return gulp.src([
    "source/*.html",
    '!source/source.html',
  ])
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.scss",gulp.series("css","refresh"));
  gulp.watch("source/img/sprite/*.png", gulp.series("spritesmith","html","refresh"));
  gulp.watch("source/img/**/*.{png,jpg,svg,webp}",gulp.series("clean", "copy","refresh"))
  gulp.watch("source/js/*.js", gulp.series("clean","js","refresh"))
  gulp.watch("source/pug/*.pug", gulp.series("pug","refresh"))
});


gulp.task("copy", function() {
  return gulp.src([
    "source/img/**/*.{png,jpg,jpeg,svg,webp,ico}",
    '!source/img/sprite/',
    '!source/img/sprite/**',
    '!source/pug',
    "source/fonts/**/*.{woff,woff2}",
    "source/js/*.js",
  ],{
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "spritesmith",
  "pug",
  "js",
  "refresh"
));

gulp.task("start", gulp.series("build", "server"));
