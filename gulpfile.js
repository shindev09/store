const { src, dest, parallel, watch, series } = require("gulp"),
    concat = require("gulp-concat"),
    scss = require("gulp-sass")(require("node-sass")),
    pug = require("gulp-pug"),
    browserSync = require("browser-sync").create();

const FilesPath = {
    scssFiles: "src/scss/*.scss",
    htmlFiles: "src/pug/pages/*.pug",
    jsFiles: "src/js/*.js",
};

const { scssFiles, htmlFiles, jsFiles } = FilesPath;

function scssTask() {
    return src(scssFiles)
        .pipe(scss())
        .pipe(concat("style.css"))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

function htmlTask() {
    return src(htmlFiles)
        .pipe(pug({ pretty: true }))
        .pipe(dest("./dist"))
        .pipe(browserSync.stream());
}

function jsTask() {
    return src(jsFiles).pipe(dest("dist/js")).pipe(browserSync.stream());
}

function assetsTask() {
    return src("assets/**/*").pipe(dest("dist/assets"));
}

function serve() {
    browserSync.init({ server: { baseDir: "./dist" } });
    watch("src/scss/**/*.scss", scssTask);
    watch("src/pug/**/*.pug", htmlTask);
    watch("src/js/*.js", jsTask);
}

exports.scss = scssTask;
exports.html = htmlTask;
exports.js = jsTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, scssTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, scssTask, jsTask, assetsTask));
