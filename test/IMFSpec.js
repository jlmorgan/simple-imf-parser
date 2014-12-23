"use strict";

// Required node modules
var fs = require("fs");

// Required files
var imfParser = require("../src/imf-parser.js");
var testIMFMessage = require("./testIMFMessage.js");

describe("Internet Message Format (IMF) Parser", function () {
  var testFileEncoding = "utf8";
  var testFilePath = __dirname + "/fixtures/testIMF.txt";

  describe("Parse file", function () {
    var testContext = imfParser.parseFile(testFilePath, testFileEncoding);

    testIMFMessage(testContext);
  });

  describe("Parse message", function () {
    var testMessage = fs.readFileSync(testFilePath, testFileEncoding);
    var testContext = imfParser.parseMessage(testMessage);

    testIMFMessage(testContext);
  });
});
