import gulp from 'gulp';
import config from '../config.js';

gulp.task('copy:img', () => gulp
  .src([
    `${config.src.img}/**/*.{jpg,png,jpeg,svg,gif,webp}`,
    `!${config.src.img}/svgo/**/*.*`,
  ])
  .pipe(gulp.dest(config.dest.img)));

gulp.task('copy:fonts', () => gulp
  .src(`${config.src.fonts}/*.{woff,woff2}`)
  .pipe(gulp.dest(config.dest.fonts)));

gulp.task('copy:video', () => gulp
  .src(`${config.src.video}/**/*.*`)
  .pipe(gulp.dest(config.dest.video)));

gulp.task('copy:data', () => gulp
  .src(`${config.src.data}/**/*.*`)
  .pipe(gulp.dest(config.dest.data)));

gulp.task('copy:rootfiles', () => gulp
  .src(`${config.src.root}/*.*`)
  .pipe(gulp.dest(config.dest.root)));

const build = gulp => gulp.series(
  'copy:img',
  // 'copy:rootfiles',
  // 'copy:data',
  // 'copy:video',
  'copy:fonts',
);
const watch = gulp => () => gulp.watch(`${config.src.img}/*`, gulp.parallel('copy:img'));

module.exports.build = build;
module.exports.watch = watch;
