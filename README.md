# Simple IMF Parser [![Build Status](https://travis-ci.org/jlmorgan/simple-imf-parser.svg)](https://travis-ci.org/jlmorgan/simple-imf-parser)

A **simple** parser of [Internet Message Format](https://tools.ietf.org/html/rfc5322) (IMF) messages using for [nodejs](http://nodejs.org).

## Usage

### Parse File

    var parseFile = require("simple-imf-parser").parseFile;
    var imfObject = parseFile("./imf-message-file.txt", "utf8");

### Parse Message

    var parseMessage = require("simple-imf-parser").parseMessage;
    var imfObject = parseMessage("..."); // Where "..." are the message contents.
