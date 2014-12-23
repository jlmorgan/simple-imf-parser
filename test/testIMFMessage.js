"use strict";

// Required node modules
var expect = require("chai").expect;

function testIMFMessage(testContext) {
  it("should return an object", function () {
    var expectedType = "object";

    expect(testContext).to.be.an(expectedType);
  });

  it("should contain the message headers", function () {
    var expectedType = "object";

    expect(testContext.headers).to.be.an(expectedType);
  });

  it("should contain normalized header keys", function () {
    var testContextHeaderKeys = Object.keys(testContext.headers);

    function expectedCriteria(testKeys) {
      var testHeaderKeysJoin = " ";
      var testHeaderKeysExpress = /[A-Z]/;

      return testKeys.join(testHeaderKeysJoin).match(testHeaderKeysExpress);
    }

    expect(testContextHeaderKeys).to.not.satisfy(expectedCriteria);
  });

  it("should contain headers that whose values span multiple lines", function () {
    var testHeader = "content-type";

    // The original value contains a new line following the semicolon
    var expectedValue = "text/plain; charset=\"utf-8\"";

    expect(testContext.headers[testHeader]).to.be.equal(expectedValue);
  });

  it("should contain the message body", function () {
    var expectedValue = "Paragraph one.\n\nParagraph two.\n";

    expect(testContext.body).to.be.equal(expectedValue);
  });
}

module.exports = testIMFMessage;
