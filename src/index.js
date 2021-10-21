import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import { Transform } from 'stream';

import bookSchema from './schemas/bookSchema';

const INPUT_PATH = './csv/file.csv';
const OUTPUT_PATH = './txt/file.txt';

const readStream = fs.createReadStream(path.resolve(__dirname, INPUT_PATH));
const writeStream = fs.createWriteStream(path.resolve(__dirname, OUTPUT_PATH));
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const bookData = JSON.parse(chunk);
        const book = {};

        for (let key in bookData) {
            if (bookSchema.hasOwnProperty(key.toLowerCase())) {
                book[key.toLowerCase()] = isNaN(parseFloat(bookData[key])) ? bookData[key] : parseFloat(bookData[key]);
            }
        }

        callback(null, JSON.stringify(book) + '\n')
    }
});

readStream.pipe(csv()).pipe(transformStream).pipe(writeStream);
