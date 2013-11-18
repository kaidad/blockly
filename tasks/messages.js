module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var vm = require('vm');
  var MessageFormat = require('messageformat');

  grunt.registerMultiTask('messages', 'Compile messages', function() {

    var locales = this.data.locales;
    var srcBases = this.data.srcBases;
    var destBase = this.data.destBase;

    locales.forEach(function(locale) {

      grunt.log.write('Generating ' + locale + ' messages\n');

      // Resolve mapping from locale strings to generated code files.
      var patterns = srcBases.map(function(srcBase) {
        return srcBase + '/**/' + locale + '.json';
      });
      var files = grunt.file.expandMapping(patterns, destBase, {
        expand: true,
        rename: function(destBase, matchedPath) {
          var destPath;
          srcBases.forEach(function(srcBase) {
            if (matchedPath.substring(0, srcBase.length) === srcBase) {
              destPath = matchedPath.substring(srcBase.length);
            }
          });
          var filename = destPath.replace('/' + locale + '.json', '.js');
          return path.join(destBase, locale, filename);
        }
      });

      // Initialize MessageFormat.
      var language = locale.split('_')[0];
      var backend = fs.readFileSync(
          './node_modules/messageformat/locale/' + language + '.js', 'utf8');
      vm.runInNewContext(backend, {MessageFormat: MessageFormat});
      var mf = new MessageFormat(language);

      // Generate javascript message functions.
      files.forEach(function(file) {
        var translated = grunt.file.readJSON(file.src[0]);
        //XXX Shouldn't have to re-read source strings for each locale, nor
        // should this code be doing weird path replace munging.
        var source = grunt.file.readJSON(
          file.src[0].replace('build/', '').replace(locale, 'en_us'));
        var code = 'var MessageFormat = require("messageformat");';
        code += backend;
        Object.keys(source).forEach(function(key) {
          code += 'exports.' + key + ' = ';
          try {
            code += mf.precompile(mf.parse(translated[key]));
          } catch (e) {
            // Fallback to English on failure.
            grunt.log.warn("Failed to compile " + key + "\n" + e);
            code += mf.precompile(mf.parse(source[key]));
          }
          code += ';\n\n';
        });
        grunt.file.write(file.dest, code);
      });
    });

  });

};
