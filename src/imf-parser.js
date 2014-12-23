"use strict";

// Required node modules
var _ = require("lodash");
var fs = require("fs");

/**
 * Creates an immutable plain object containing the message body and headers.
 * @param {Object} headers - Parsed message headers.
 * @param {String} body - Parsed message body.
 * @returns {Object}
 */
function createMessage(headers, body) {
  return Object.freeze({
    headers: headers,
    body: body
  });
}

/**
 * Normalizes the message header key into all lower case.
 * @param {String} key - Header key.
 * @returns {String}
 */
function normalizeHeaderKey(key) {
  return key.toLowerCase();
}

/**
 * Transforms a header from pairs on a results object.
 * @param {Object} results - Accumulating object.
 * @param {Array} headerPair - Key, value pair.
 * @returns {Object}
 */
function transformHeader(results, headerPair) {
  var keyIndex = 0;
  var valueIndex = 1;

  results[normalizeHeaderKey(headerPair[keyIndex])] = headerPair[valueIndex];

  return results;
}

/**
 * Reduces a raw header into a key:value onto a results object. Provides the means to split appart the raw header into
 * its pairs.
 * @param {Object} results - Accumulating object.
 * @param {String} rawHeader - Single header string.
 * @returns {Object}
 */
function reduceRawHeader(results, rawHeader) {
  var headerSeparator = ": ";

  return transformHeader(results, rawHeader.split(headerSeparator));
}

/**
 * Parses the raw headers into a headers object.
 * @param {String} rawHeaders - Message headers.
 * @returns {Object}
 */
function parseHeaders(rawHeaders) {
  var headerLineWrapExpression = /\n\s+/g;
  var headerLineWrapReplacement = " ";
  var headerSplitExpression = /\n/;
  var headers = {};

  return _.reduce(
    rawHeaders.replace(headerLineWrapExpression, headerLineWrapReplacement)
      .split(headerSplitExpression),
    reduceRawHeader,
    headers
  );
}

/**
 * Maps the parts of a message onto an object. Provides the means to handle the parts (header, body).
 * @param {Array} imfParts - The header, body split into an array.
 * @returns {Object}
 */
function mapIMFToObject(imfParts) {
  var headersIndex = 0;
  var bodyIndex = 1;
  var bodyPartsJoin = "\n\n"; // Hehe… body parts…

  return createMessage(
    parseHeaders(imfParts[headersIndex]),
    imfParts.slice(bodyIndex).join(bodyPartsJoin)
  );
}

/**
 * Unwraps the hard line wrapping of the message.
 * @param {String} message - Wrapped message.
 * @return {String}
 */
function unwrapMessage(message) {
  var imfLineWrapExpression = /=\n/g;
  var imfLineWrapReplacement = "";

  return message.replace(imfLineWrapExpression, imfLineWrapReplacement);
}

/**
 * Splits a message into its header and body parts.
 * @param {String} message - Raw message.
 * @returns {Array}
 */
function splitIMF(message) {
  var imfHeadersBodySplitExpression = /\n\n/;

  return unwrapMessage(message).split(imfHeadersBodySplitExpression);
}

/**
 * Parses a message.
 * @param {String} message - Raw message.
 * @returns {Object}
 */
function parseMessage(message) {
  return mapIMFToObject(splitIMF(message));
}

/**
 * Parses a message from a file path.
 * @param {String} filePath - Path to IMF file.
 * @param {String} characterEncoding - Character encoding of the file.
 * @returns {Object}
 */
function parseFile(filePath, characterEncoding) {
  return parseMessage(fs.readFileSync(filePath, characterEncoding));
}

module.exports = {
  parseFile: parseFile,
  parseMessage: parseMessage
};
