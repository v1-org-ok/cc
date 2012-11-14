module.exports = (grunt)->

   ###############################################################
   # Constants
   ###############################################################

   ENV = grunt.option('env') || 'dev'

   # Application src
   SRC_ROOT= 'src/main/'
   SRC_APP_ROOT= "#{SRC_ROOT}/app/"

   SRC_INDEX = "#{SRC_ROOT}/index.html"
   SRC_HTML = "#{SRC_APP_ROOT}/**/*.html"
   SRC_CSS = "#{SRC_APP_ROOT}/**/*.css"
   SRC_IMG = "#{SRC_APP_ROOT}/**/*.jpg" # TODO jpgs are not the only images..
   SRC_COFFEE= "#{SRC_APP_ROOT}/**/*.coffee"

   # 3rd party libraries
   SRC_LIB_ROOT = "#{SRC_ROOT}/lib/"
   SRC_LIB_CSS = "#{SRC_LIB_ROOT}/**/*.css"
   SRC_LIB_JS = "#{SRC_LIB_ROOT}/**/*.js"

   # Test files
   TEST_ROOT = "src/test/"
   TEST_LIB = "#{TEST_ROOT}/lib/**/*.*"
   TEST_CONFIG = "#{TEST_ROOT}/config/**/*.*"
   TEST_COFFEE = "#{TEST_ROOT}/**/*.coffee"

   ###############################################################
   # Config
   ###############################################################

   grunt.initConfig

      clean:
         main: 'target'

      copy:
         # HTML and Image directories are preserved
         app_static:
            options:
               basePath: SRC_APP_ROOT
            files:
               "target/main/index.html": SRC_INDEX
               "target/main/": [SRC_HTML, SRC_IMG]
         test:
            options:
               basePath: TEST_ROOT
            files:
               "target/test/": [TEST_LIB, TEST_CONFIG, ENV]

      testacularServer:
         watched:
            configFile: 'target/test/config/watchedUnitTests.js'

      testacularRun:
         watched:
            configFile: 'target/test/config/watchedUnitTests.js'

      concat:
         lib_css: 
            src: SRC_LIB_CSS
            dest: "target/main/style/lib.css"
         lib_js: 
            src: SRC_LIB_JS
            dest: "target/main/js/lib.js"
         app_css:
            src: SRC_CSS
            dest: "target/main/style/app.css"

      min:
         lib_js:
            src: "target/main/js/lib.js"
            dest: "target/main/js/lib.js"
         app_js:
            src: "target/main/js/app.js"
            dest: "target/main/js/app.js"

      cssmin:
         lib_cssk:
            src: "target/main/style/lib.css"
            dest: "target/main/style/lib.css"
         app_css:
            src: "target/main/style/app.css"
            dest: "target/main/style/app.css"

      coffee:
         app:
            files:
               'target/main/js/app.js': SRC_COFFEE
         test:
            files:
               'target/test/js/specs.js': TEST_COFFEE

      server:
         base: 'target/main'

      # Note that we only watch: HTML, CSS, Images, App and Test CoffeeScript
      # For all else (libs, test configs, etc), restart the build
      watch:
         coffee_app:
            files: SRC_COFFEE
            tasks: 'coffee:app'

         coffee_tests:
            files: TEST_COFFEE
            tasks: 'coffee:test'

         copy_static:
            files: [SRC_HTML, SRC_INDEX, SRC_IMG]
            tasks: 'copy:app_static'

         concat_css:
            files: [SRC_CSS]
            tasks: ['concat:app_css']

         test:
            files: [SRC_COFFEE, TEST_COFFEE]
            tasks: ['testacularRun:watched']

   ##############################################################
   # Dependencies
   ###############################################################
   grunt.loadNpmTasks('grunt-contrib-coffee')
   grunt.loadNpmTasks('grunt-contrib-copy')
   grunt.loadNpmTasks('grunt-contrib-clean')
   grunt.loadNpmTasks('grunt-css')
   grunt.loadNpmTasks('grunt-testacular')

   ###############################################################
   # Alias tasks
   ###############################################################

   grunt.registerTask('build', 'copy concat coffee')
   grunt.registerTask('watcher', 'server testacularServer:watched watch')
   grunt.registerTask('dist', 'build min cssmin')

   grunt.registerTask('default', 'clean build watcher')