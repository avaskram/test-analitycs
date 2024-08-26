var gulp = require('gulp');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var fs = require('fs');
var del = require('del');
var browserSync = require('browser-sync').create();

var pug = require('gulp-pug');
var pugIncludeGlob = require('pug-include-glob');
var gulpData = require('gulp-data');

var stylus = require('gulp-stylus');
var sass = require('gulp-sass')(require('sass'));
var cleanCss = require('gulp-clean-css');
var groupMq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');

var svgSprite = require('gulp-svg-sprite');
var cheerio = require('gulp-cheerio');
var svgmin = require('gulp-svgmin');

var include = require('gulp-include');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');



///// paths variables
var themeName = 'test';

var localPort = 3100,
    srcDir = 'src/',
    tmpDir = 'tmp/',
    buildDir = 'build/',
    rootDir = '/',
    assetsDir = srcDir + 'assets/',
    vendorsDir = rootDir + 'vendors',
    uiDir = rootDir + 'vendors/parts-ui-beta/',
    themeData = 'theme.json',
    contentData = 'content.json',
    pagesData = 'pages-list.json',
    browsersSupport = '> 0.6%';

console.log(uiDir);


///// paths
var paths = {
  layout: srcDir + 'layout',
  components: srcDir + 'components',
  pages: {
    src: srcDir + 'pages',
    dist: buildDir
  },
  data: {
    src: {
      json: themeData,
      html: srcDir + 'pages/data'
    },
    dist: {
      json: buildDir + 'data/json',
      html: buildDir + 'data/data'
    }
  },
  styles: {
    src: srcDir + 'styles',
    dist: buildDir + 'css',
    temp: tmpDir + 'css',
    critical: {
      src: srcDir + 'styles/critical',
      dist: srcDir + 'styles/critical/css'
    },
    export: {
      src: srcDir+'styles/export',
      dist: buildDir+'css/components'
    }
  },
  scripts: {
    src: srcDir + 'scripts',
    dist: buildDir + 'js',
    temp: tmpDir + 'js'
  },
  images: {
    src: assetsDir + 'images',
    dist: buildDir + 'images'
  },
  svg: {
    src: assetsDir + 'svg',
    dist: buildDir + 'svg'
  },
  fonts: {
    src: assetsDir + 'fonts',
    dist: buildDir + 'fonts',
  },
  icons: {
    sprite: {
      src: assetsDir + 'icons/sprite',
      dist: assetsDir + 'icons'
    }
  },
  files: {
    src: assetsDir + 'files',
    dist: buildDir + 'files'
  },
  audio: {
    src: assetsDir + 'audio',
    dist: buildDir + 'audio'
  }
}

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: buildDir
    },
    port: localPort,
    ui: false,
    open: false
  });
});

//////// pug
var injectData = function(file){
	var dataJson = JSON.parse(fs.readFileSync(file,{encoding:'utf8'}))
	return gulpData(function(file) {
		return dataJson
	})
}

gulp.task('pug', function(done){
  gulp.src([
      paths.pages.src+'/*.pug',
      paths.pages.src+'/**/*.pug',
      '!'+paths.pages.src+'/__*.pug',
      '!'+paths.pages.src+'/**/__*.pug'
    ])
    .pipe(plumber())
    .pipe(injectData(themeData))
    .pipe(injectData(contentData))
    .pipe(injectData(pagesData))
    .pipe(pug({
      pretty: true,
      plugins: [pugIncludeGlob()],
      basedir: __dirname +'/src'
    }))
    .pipe(gulp.dest(paths.pages.dist))
    .pipe(browserSync.stream())
    done()
});

//////// stylus
// gulp.task('stylus', function(done) {
//   gulp.src([
//       paths.styles.src+'/all.styl'
//     ])
//     .pipe(plumber())
//     .pipe(stylus({
//       compress: false,
//       'include css': true
//     }))
//     .pipe(autoprefixer())
//     .pipe(groupMq())
//     .pipe(rename(function(name) {
//       name.basename = name.basename.replace('all', themeName);
//       return name
//     }))
//     .pipe(gulp.dest(paths.styles.dist))
//     .pipe(cleanCss())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest(paths.styles.dist))
//     .pipe(browserSync.stream())
//     done()
// });

//////// sass
gulp.task('sass', function(done) {
  gulp.src([
      paths.styles.src+'/all.scss'
    ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(groupMq())
    .pipe(rename(function(name) {
      name.basename = name.basename.replace('all', themeName);
      return name
    }))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.stream())
    done()
});

//////// critical css
// gulp.task('critical-css',function(){
//   gulp.src([
//       paths.styles.critical.src+'/*.styl',
//       '!'+paths.styles.critical.src+'/base.styl'
//     ])
//     .pipe(plumber())
//     .pipe(stylus({
//       compress: false,
//       'include css': true
//     }))
//     .pipe(autoprefixer())
//     .pipe(groupMq())
//     .pipe(cleanCss())
//     .pipe(gulp.dest(paths.styles.critical.dist))
// })

//////// js
gulp.task('js-include', function(done) {
  return gulp.src([
    paths.scripts.src + '/app.js',
    paths.scripts.src + '/vendors.js'
  ])
  .pipe(include({
    includePaths: [
      uiDir + 'js',
      uiDir + 'ui-core',
      uiDir + 'components',
      uiDir + 'layout',
      vendorsDir,
      __dirname
    ]
  }))
  .pipe(gulp.dest(paths.scripts.temp))
  done()
})


gulp.task('js-merge', gulp.series('js-include', function(cb) {
  pump([
      gulp.src([
        paths.scripts.temp + '/vendors.js',
        paths.scripts.temp + '/app.js'
      ]),
      concat(themeName+'.js'),
      gulp.dest(paths.scripts.dist)
    ],
    cb
  )
}))

gulp.task('js-minify', gulp.series('js-merge', function(cb){
  pump([
      gulp.src([
        paths.scripts.dist+'/'+themeName+'.js'
      ]),
      uglify(),
      rename(function(name) {
        name.dirname = name.dirname.replace('build', '');
        return name
      }),
      rename({
        suffix: '.min'
      }),
      gulp.dest(paths.scripts.dist)
    ],
    cb
  )
}))


//////// copy assets content

gulp.task('copy', function(cb) {

  /////////// copy pages directorie files
  // gulp.src([
  //     paths.pages.src + '/*.php',
  //     paths.pages.src + '/.htaccess',
  //     paths.pages.src + '/*.json'
  //   ])
  //   .pipe(gulp.dest(paths.pages.dist))


  gulp.src([
      paths.files.src + '/*.*'
    ])
    .pipe(gulp.dest(paths.files.dist))


  /////////// copy fonts files
  gulp.src(paths.fonts.src + '/**/*')
    .pipe(gulp.dest(paths.fonts.dist))

  /////////// copy images
  gulp.src([
      paths.images.src + '/*.*',
      paths.images.src + '/**/*'
    ])
    .pipe(gulp.dest(paths.images.dist))

  /////////// copy audio
  gulp.src([
      paths.audio.src + '/*.*'
    ])
    .pipe(gulp.dest(paths.audio.dist))

  cb()

})

//////// svg icons sprite
gulp.task('svg-sprite', function(done){
  gulp.src([
      paths.icons.sprite.src+'/*.svg'
    ])
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[transform]').removeAttr('transform');
        $('[opacity]').removeAttr('opacity');
        $('[fill-opacity]').removeAttr('fill-opacity');
        $('[mask]').removeAttr('mask');
        $('defs,mask').remove();
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgSprite({
      shape: {
        spacing: {
          padding: 1,
          box: 'content'
        },
        id: {
          generator: 'ic-'
        }
      },
      svg: {
        rootAttributes: {
          width: 0,
          height: 0,
          style: 'position: absolute; background: none !important;'
        }
      },
      mode: {
        inline: true,
        symbol: {
          dest: '.',
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(paths.icons.sprite.dist))
    done()
})


//////// watch
gulp.task('watch',function(cb) {
  gulp.watch([
    srcDir + '**/*.pug',
    uiDir + '**/*.pug',
    themeData,
    contentData
  ], gulp.series('pug'));

  gulp.watch([
    srcDir + '**/*.scss',
    uiDir + '**/*.scss'
  ], gulp.series('sass'));

  // gulp.watch([
  //   paths.styles.critical.src+'/*.styl'
  // ],gulp.series('critical-css','pug'));

  gulp.watch([
    vendorsDir + '**/init.js',
    srcDir + '**/*.js',
    uiDir + '**/*.js',
    '!'+paths.scripts.src + '/export.js'
  ], gulp.series('js-merge','js-minify'));

  gulp.watch([
    paths.pages.src + '/*.php',
    paths.pages.src + '/php/*',
    paths.pages.src + '/.htaccess',
    paths.pages.src + '/*.json',
    paths.fonts.src + '/*',
    paths.fonts.src + '/**/*',
    paths.images.src + '/*.*',
    paths.images.src + '/**/*.*',
    paths.audio.src + '/*.*'
  ], gulp.series('copy'));
  cb()
})

gulp.task('clean', function(cb) {
  return del(buildDir, cb);
});

var defaultTasks = [
  'pug',
  'sass',
  'svg-sprite',
  'js-merge',
  'js-minify',
  'watch',
  'copy',
  'browser-sync'
]

gulp.task('default',
	gulp.series('clean',gulp.parallel(defaultTasks))
);
