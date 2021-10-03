import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';

const INPUT_PATH = './csv/file.csv';
const OUTPUT_PATH = './txt/file.txt';

const readStream = fs.createReadStream(path.resolve(__dirname, INPUT_PATH));
const writeStream = fs.createWriteStream(path.resolve(__dirname, OUTPUT_PATH));

readStream.pipe(csv()).pipe(writeStream);

