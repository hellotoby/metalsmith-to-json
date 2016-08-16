# Metalsmith to JSON

## Introduction

Metalsmith to json converts your markdown files to json so you can use them as a static api.
Additionally if required it can create a collection of all the files to consume.

## Requirements

Metalsmith to json requires the [metalsmith markdown plugin](https://www.npmjs.com/package/metalsmith-markdown).

## Installation

`npm install metalsmith-to-json`

## Usage

```
var Metalsmith  = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    tojson = require('metalsmith-to-json');

Metalsmith(__dirname)
    .use( markdown() )
    .use( tojson({
        outputPath : '',
        createIndexes : true,
        indexPaths : ['/articles/', '/pages/']
    })
    .build(function( err, files ) {
        if( err ) throw err;
    });
```

## Output

Metalsmith to json will output files with a .json extension and the same filename as the source file.
All frontmatter will be represented in the json object.

When using the indexes option an index file will be created with the same name as the folder of files it's indexing and saved in the top level output directory.

## Options

Metalsmith to json takes three options.

1. outputPath (string) : A string representing the path you'd like the json files to be output to.
2. createIndexes (boolean) : A boolean to tell metalsmith to json whether or not you'd like to generate indexes.
3. indexPaths (array) : An array of paths for metalsmith to json to generate indexes from.
