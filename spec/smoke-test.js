var fs = require('fs');
var path = require('path');

describe('Library smoke tests', function() {

  it('package.json is valid', function() {
    var packageJson = require('../package.json');
    expect(packageJson.name).toBe('octopus-library');
    expect(packageJson.version).toBeDefined();
    expect(packageJson.scripts.test).toBeDefined();
  });

  it('step-templates directory exists and contains JSON files', function(done) {
    var dirname = './step-templates/';

    fs.readdir(dirname, function(err, files) {
      if (err) {
        fail('step-templates directory should exist: ' + err);
        done();
        return;
      }

      var jsonFiles = files.filter(function(file) {
        return file.endsWith('.json');
      });

      expect(jsonFiles.length).toBeGreaterThan(0);
      done();
    });
  });

  it('logos directory exists and contains PNG files', function(done) {
    var dirname = './step-templates/logos/';

    fs.readdir(dirname, function(err, files) {
      if (err) {
        fail('logos directory should exist: ' + err);
        done();
        return;
      }

      var pngFiles = files.filter(function(file) {
        return file.endsWith('.png');
      });

      expect(pngFiles.length).toBeGreaterThan(0);
      done();
    });
  });

  it('can load and parse a sample step template', function(done) {
    var dirname = './step-templates/';

    fs.readdir(dirname, function(err, files) {
      if (err) {
        fail('Error reading step-templates: ' + err);
        done();
        return;
      }

      var jsonFiles = files.filter(function(file) {
        return file.endsWith('.json');
      });

      if (jsonFiles.length === 0) {
        fail('No JSON files found in step-templates');
        done();
        return;
      }

      // Test the first JSON file
      var testFile = path.join(dirname, jsonFiles[0]);
      fs.readFile(testFile, 'utf-8', function(err, content) {
        if (err) {
          fail('Error reading file: ' + err);
          done();
          return;
        }

        try {
          var template = JSON.parse(content);
          expect(template).toBeDefined();
          expect(typeof template).toBe('object');
          done();
        } catch(e) {
          fail('Error parsing JSON: ' + e);
          done();
        }
      });
    });
  });
});
