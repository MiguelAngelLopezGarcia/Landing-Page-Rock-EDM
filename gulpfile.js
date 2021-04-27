const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


const paths = {
    imagenes: "src/img/**/*",
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*"
};


function css () {
    return src(paths.scss)
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( postcss( [autoprefixer(), cssnano()] ) )
    .pipe( sourcemaps.write('.') )
    .pipe( dest("./build/css") );
};

function javaScript () {
    return src(paths.js)
    .pipe( sourcemaps.init() )
    .pipe( concat('bundle.js') )
    .pipe( terser() )
    .pipe( sourcemaps.write('.') )
    .pipe( rename({suffix: '.min'}) )
    .pipe( dest("./build/js") );
};

function imagenes () {
    return src(paths.imagenes)
    .pipe( imagemin() )
    .pipe( dest("./build/img") )
    .pipe( notify({message: 'Imagen minificada'}) );
};

function versionWebp () {
    return src(paths.imagenes)
    .pipe( webp() )
    .pipe( dest("./build/img") );
}

function watchArchivos () {
    watch(paths.scss, css);
    watch(paths.js, javaScript);
};

exports.default = series( css, javaScript, watchArchivos );
