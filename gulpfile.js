const gulp = require("gulp");
const path = require("path");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const del = require("del");
const rename = require("gulp-rename");
const twig = require("gulp-twig");
const data = require("gulp-data");
const fs = require("fs");

function copy() {
  return gulp.src([
    "source/assets/fonts/*.{woff,woff2}",
    "source/assets/images/*.{jpg,png,svg,ico,webp}",
    "source/*.js"
  ], {base: "source"})
    .pipe(gulp.dest("public"))
}

function html() {
  return gulp.src("source/pages/**/*.twig")
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync("./source/pages/" + path.basename(file.path) + '.json'));
    }))
    .pipe(twig())
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("public"))
    .pipe(sync.stream());
}

function styles() {
  return gulp.src("source/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("public/css"))
    .pipe(sync.stream());
}

function server(done) {
  sync.init({
    server: {
      baseDir: 'public'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function watcher() {
  gulp.watch("source/**/*.scss", gulp.series(styles));
  gulp.watch("source/**/*.twig", gulp.series(html));
  gulp.watch("source/**/*.js", gulp.series(copy, html));
  gulp.watch("source/**/*.{jpg,png,svg,ico,webp}", gulp.series(copy, html, styles));
}

function clean() {
  return del("public");
}

exports.build = gulp.series(
    clean, copy, html, styles
);

exports.default = gulp.series(
  clean, copy, html, styles, server, watcher
);
