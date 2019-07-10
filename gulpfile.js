"use strict";

const gulp = require("gulp");
// CSS
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
sass.compiler = require("node-sass");

// JS
const uglifyjs = require("gulp-uglify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");

// MISC
const color = require("gulp-color");
const log = require("fancy-log");
const browserSync = require("browser-sync").create();
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const p = require("./package.json");

const css = () => {
  return gulp
    .src("src/stylesheets/**/*.scss", { base: "src" })
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(size({ showFiles: true, showTotal: false }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
};

const js = () => {
  const b = browserify("src/javascripts/main.js", { debug: true }).transform(
    babelify
  );
  return b
    .bundle()
    .on("error", err => {
      log.error(err.message);
      this.emit("end");
    })
    .pipe(source("main.bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
    .pipe(uglifyjs())
    .pipe(sourcemaps.write("map"))
    .pipe(size({ showFiles: true, showTotal: false }))
    .pipe(gulp.dest("dist/javascripts"));
};

const buildSize = () => {
  log("Total file size in dist folder:");
  return gulp.src("dist/**/*").pipe(size({ showTotal: true, pretty: true }));
};

const reload = done => {
  browserSync.reload();
  done();
};

const watch = () => {
  // Info
  log("Watching files.");
  if (!p.themeURL) {
    log.warn(
      color(
        "There no themeURL proxy defined in the package.json! Using the default...",
        "YELLOW"
      )
    );
  }
  // BrowserSync
  browserSync.init({
    proxy: p.themeURL || "localhost:8000",
    open: false
  });
  // CSS
  gulp.watch("src/**/*.scss", gulp.series(css, buildSize));
  // JS
  gulp.watch("src/**/*.js", gulp.series(js, buildSize, reload));
  // PHP
  gulp.watch(
    ["**/*.php", "src/**", "!src/**/*.scss", "!src/**/*.js", "!node_modules"],
    reload
  );
};

exports.css = css;
exports.js = js;
exports.build = gulp.series(css, js, buildSize);
exports.default = gulp.series(css, js, watch);
