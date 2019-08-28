import gulp from 'gulp';
import config from './gulp/config';

const getTaskBuild = (task) => require(`./gulp/tasks/${task}`).build(gulp);
const getTaskWatch = (task) => require(`./gulp/tasks/${task}`).watch(gulp);

gulp.task('clean', getTaskBuild('clean'));
gulp.task('svgicons', getTaskBuild('svgicons'));
// gulp.task('sprite-png', getTaskBuild('sprite-png'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('server', () => getTaskBuild('server'));
gulp.task('nunjucks', () => getTaskBuild('nunjucks'));
gulp.task('sass', () => getTaskBuild('sass'));
gulp.task('svgo', () => getTaskBuild('svgo'));
gulp.task('list-pages', getTaskBuild('list-pages'));
gulp.task('webpack', getTaskBuild('webpack'));

gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('svgicons:watch', getTaskWatch('svgicons'));
// gulp.task('sprite-png:watch', getTaskWatch('sprite-png'));
gulp.task('nunjucks:watch', getTaskWatch('nunjucks'));
gulp.task('sass:watch', getTaskWatch('sass'));
gulp.task('svgo:watch', getTaskWatch('svgo'));
gulp.task('list-pages:watch', getTaskWatch('list-pages'));
gulp.task('webpack:watch', getTaskWatch('webpack'));

const setmodeProd = (done) => {
  config.setEnv('production');
  config.logEnv();
  done();
};

const setmodeDev = (done) => {
  config.setEnv('development');
  config.logEnv();
  done();
};

gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    'svgicons',
    // 'sprite-png',
    'svgo',
    'sass',
    'nunjucks',
    'webpack',
    'list-pages',
    'copy',
  ),
);

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    'svgicons',
    // 'sprite-png',
    'svgo',
    'sass',
    'nunjucks',
    'webpack',
    'list-pages',
    'copy',
  ),
);

gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',
    'svgicons:watch',
    // 'sprite-png:watch',
    'nunjucks:watch',
    'svgo:watch',
    'list-pages:watch',
    'webpack:watch',
    'sass:watch',
  ),
);

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));
