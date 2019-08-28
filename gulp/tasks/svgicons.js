import gulp from 'gulp';
import cheerio from 'gulp-cheerio';
import clean from 'gulp-cheerio-clean-svg';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import path from 'path';
import del from 'del';
import util from 'gulp-util';
import config from '../config.js';

gulp.task('svgicons:clean', () => del([
  `${config.src.iconsHTML}/*.html`,
]).then((paths) => {
  util.log('Deleted:', util.colors.magenta(paths.join('\n')));
}));

gulp.task('svgicons:create', () => gulp
  .src(`${config.src.icons}/*.svg`)
  .pipe(svgmin({
    js2svg: {
      pretty: true,
    },
    plugins: [{
      removeXMLProcInst: true,
    }, {
      removeComments: true,
    }, {
      removeDoctype: true,
    }, {
      removeXMLNS: true,
    }, {
      convertStyleToAttrs: false,
    }],
  }))
  .pipe(cheerio(clean({
    attributes: [
      'id',
      'fill*',
      'clip*',
      'stroke*',
    ],
  })))
  .pipe(cheerio({
    run: ($, file) => {
      const iconName = path.basename(file.relative, path.extname(file.relative));
      const svg = $('svg');
      const svgStyle = svg.attr('style');

      if (svgStyle && svgStyle.indexOf('enable-background') !== -1) {
        svg.removeAttr('style');
      }

      const h = +svg.attr('height') || +svg.attr('viewBox').split(' ')[3];
      const w = +svg.attr('width') || +svg.attr('viewBox').split(' ')[2];
      if (!svg.attr('viewBox')) {
        svg.attr('viewBox', `0 0 ${w} ${h}`);
      };
      const height = '1em';
      const width = `${(w / h).toFixed(3)}em`;

      svg.attr('class', `icon icon-${iconName}`);
      svg.attr('width', width);
      svg.attr('height', height);
    },
    parserOptions: { xmlMode: false },
  }))
  .pipe(rename({
    prefix: '_',
    extname: '.html',
  }))
  .pipe(gulp.dest(config.src.iconsHTML)));


const build = (gulp) => gulp.series(
  'svgicons:clean',
  'svgicons:create',
);
const watch = (gulp) => () => gulp.watch(`${config.src.icons}/*`, gulp.parallel('svgicons:clean', 'svgicons:create'));


module.exports.build = build;
module.exports.watch = watch;
