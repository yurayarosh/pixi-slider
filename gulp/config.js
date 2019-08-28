import util from 'gulp-util';

const production = util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;
const destPath = 'build';

const config = {
  env: 'development',
  production,

  src: {
    root: 'src',
    templates: 'src/templates',
    templatesData: 'src/templates/data',
    pagelist: 'src/index.yaml',
    sass: 'src/sass',
    // path for sass files that will be generated automatically via some of tasks
    sassGen: 'src/sass/generated',
    js: 'src/js',
    img: 'src/img',
    video: 'src/video',
    svg: 'src/img/svg',
    icons: 'src/icons',
    iconsHTML: 'src/templates/icons',
    fonts: 'src/fonts',
    data: 'src/data',
  },
  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    img: `${destPath}/img`,
    video: `${destPath}/video`,
    fonts: `${destPath}/fonts`,
    data: `${destPath}/data`,
  },

  setEnv(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv() {
    util.log(
      'Environment:',
      util.colors.white.bgRed(` ${process.env.NODE_ENV} `),
    );
  },

  errorHandler: require('./util/handle-errors'),
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
