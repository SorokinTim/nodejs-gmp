import process from 'process';
import { reverseUserData } from './utils';

const readable = process.stdin;
const writable = process.stdout;

readable.on('data', (data) => writable.write(reverseUserData(data)));
