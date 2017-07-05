'use strict';

const _ = require('lodash');

module.exports = function( options ) {

    let outputPath      = options.outputPath || null,           // Specify a path (string) to put the json files eg. /api
        createIndexes   = options.createIndexes || false,       // Specify whether or not to create indexes of the accumulated files
        indexPaths      = options.indexPaths || false,          // Specify paths to source folders with content to index
        onlyOutputIndex = options.onlyOutputIndex || false;     // Specify if whether or not to only output the index file for each indexPath

    return function( files, metalsmith, done ) {

        _(files).forEach( function( file, key ) {

            let data            = _.omit(file, ['mode', 'stat', '_vinyl', 'stats']);
            data.contents       = file.contents.toString();
            data.contents       = new Buffer( JSON.stringify( data ), 'utf8' );

            let filepath        = key.replace('.html', '.json');
            files[filepath]     = data;

            delete files[key];

        });

        if( createIndexes ) {

            if( ! indexPaths ) {

                throw new Error('createIndexes is true, but no indexPaths are specified.');

            }

            _(indexPaths).forEach( function( value ) {

                let output      = {},
                    regex       = new RegExp( value ),
                    filepath    = value + '.json';

                output.contents = [];

                _(files).forEach(function( file, key ) {

                    if( regex.test( key ) ) {

                        output.contents.push( file.contents );

                      if( onlyOutputIndex ) {

                        delete files[key];

                      }

                    };

                });

                output.contents = new Buffer('[' + output.contents.toString() + ']', 'utf8');

                files[filepath] = output;

            });

        }

        done();

    }

}
