"use strict";

var loadTasks = require("load-grunt-tasks");
var stylish = require("jshint-stylish");

var specFiles = "test/**/*Spec.js";
var srcFiles = "src/**/*.js";
var testFiles = "test/**/*.js";

module.exports = function (grunt) {
  // Load grunt plugins
  loadTasks(grunt);

  grunt.initConfig({
    "jscs": {
      options: {
        config: ".jscsrc"
      },
      src: [
        srcFiles,
        specFiles
      ]
    },

    "jshint": {
      options: {
        jshintrc: true,
        reporter: stylish
      },
      all: ["Gruntfile.js", srcFiles, testFiles],
      src: [srcFiles],
      tests: [specFiles]
    },

    "mochaTest": {
      test: {
        options: {
          reporter: "Spec"
        },
        src: [testFiles]
      }
    },

    "pkg": grunt.file.readJSON("package.json"),

    "watch": {
      lint: {
        files: [srcFiles, testFiles],
        tasks: "lint"
      },
      tests: {
        files: [srcFiles, testFiles],
        tasks: "mochaTest:test"
      }
    }
  });

  grunt.registerTask("lint", "Run JSHint and JSCS", [
    "jshint",
    "jscs"
  ]);
};
