import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import config from '../config';

gulp.task('sprite-png', () => {
  const spriteData = gulp.src(`${config.src.icons}/*.png`)
    .pipe(plumber({
      errorHandler: config.errorHandler,
    }))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite-png.sass',
      imgPath: '../img/sprite.png',
      // retinaSrcFilter: config.src.iconsPng + '/*@2x.png',
      // retinaImgName: 'sprite@2x.png',
      // retinaImgPath: '../img/sprite@2x.png',
      padding: 10,
      algorithm: 'binary-tree',
      cssTemplate: `${__dirname}/sprite-png/sprite.template.mustache`,
      // ,
      // cssVarMap: function(sprite) {
      //     sprite.name = 'icon-' + sprite.name;
      // }
    }));
  spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(config.dest.img));
  spriteData.css
    .pipe(gulp.dest(config.src.sassGen));

  return spriteData;
});

const build = gulp => gulp.series('sprite-png');
const watch = gulp => () => gulp.watch(`${config.src.icons}/*.png`, gulp.parallel('sprite-png'));

module.exports.build = build;
module.exports.watch = watch;
