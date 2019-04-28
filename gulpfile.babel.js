const { src, dest, series, watch } = require('gulp');
const cp = require("child_process");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");
const purgecss = require("postcss-purgecss");
const presetEnv = require("postcss-preset-env");
const BrowserSync = require("browser-sync");
const webpack = require("webpack");
const webpackConfig = require("./webpack.conf");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const inject = require("gulp-inject");
const cssnano = require("cssnano");
const browserSync = BrowserSync.create();
const hugoBin = `${process.platform === "win32" ? "hugo" : "hugo"}`;
const defaultArgs = ["-d", "../dist", "-s", "site"];

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug");
}

function hugo(cb) {
  buildSite(cb, ["--quiet"])
}

function hugoPreview(cb) { 
  buildSite(cb, ["--buildDrafts", "--buildFuture"])
}

function build(cb) {
  return series(css, js, hugo)(cb);
}

function buildPreview(cb) {
  return series(css, js, hugoPreview)(cb);
}

function css() {
  return src("./src/css/*.css")
    .pipe(postcss([
      cssImport({from: "./src/css/main.css"}),
      presetEnv({stage: 0}),
      purgecss({content: ['./site/layouts/**/*.html'], whitelistPatternsChildren: [/nav-icon/, /off-canvas/]}),
      cssnano({autoprefixer: true}),
    ]))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

function js(cb) {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, () => {
    browserSync.reload();
    cb();
  });
}

function svg() {
  const svgs = src("site/static/img/icons-*.svg")
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(file) {
    return file.contents.toString();
  }

  return src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(dest("site/layouts/partials/"));
}

function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch("./src/js/**/*.js", js);
  watch("./src/css/**/*.css", css);
  watch("./site/static/img/icons-*.svg", svg);
  watch("./site/**/*", hugo);
}

function server(cb) {
  return series(build, initBrowserSync)(cb);
}

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}

exports.hugo = hugo;
exports.start = server;
exports.build = build;
exports.webpack = js;
exports.postcss = css;
exports.svg = svg;
exports.preview = buildPreview;