module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      'assets/angular/angular.js',
      'assets/angular-route/angular-route.js',
      'assets/angular-mocks/angular-mocks.js',
      'ng/**/module.js',
      'ng/**/*.js',
      'test/ng/**/*.spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
