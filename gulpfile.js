const {src, dest, series, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass')); //init tool for work with sass; sass here is compiler
const postcss = require('gulp-postcss');    //tool for transforming styles
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); //css minifier
const sourcemaps = require('gulp-sourcemaps');  //plugin for sourcemaps
const browserSync = require('browser-sync').create();   //server
const del = require('del');

const SRC_PATH = 'src';
const DIST_PATH = 'dist';

const PATHS = {
    scss: `${SRC_PATH}/styles/**/*.scss`,
    html: `${SRC_PATH}/**/*.html`,
    images: `${SRC_PATH}/img/**/*.*`
};

function buildSass() {
    return src(PATHS.scss)  //choose files for processing
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['./node_modules']})
            .on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({  //css prefixes :-webkit-..., :-ms-...
                    grid: true, //prefixes for display: grid;
                    overrideBrowserslist: ['last 2 versions']   //for 2 latest versions for all browsers
                }),
                cssnano()   //file minification
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest(`${SRC_PATH}/css`))  // for dev mode
        .pipe(dest(`${DIST_PATH}/css`)) // compiled scss goes here
        .pipe(browserSync.stream());    //notify server about changes
}

function buildHtml() {
    return src(PATHS.html)
        .pipe(dest(DIST_PATH))
        .pipe(browserSync.stream());    //notify server about changes
}

//for static files
function copy() {
    return src([PATHS.images],  // in [] could be listed all static files to be moved to dist, e.g images, fonts, etc.
        {base: SRC_PATH})    // base for
        .pipe(dest(DIST_PATH));
}

function cleanDist() {
    return del('dist');
}

// file watcher
function serve() {
    watch(PATHS.scss, buildSass);
    watch(PATHS.html, buildHtml);
}

function createDevServer() {
    browserSync.init({
        server: SRC_PATH, // local server uses src
        notify: false
    })
}

exports.build = series(cleanDist, buildSass, buildHtml, copy);
exports.default = series(buildSass, parallel(createDevServer, serve));