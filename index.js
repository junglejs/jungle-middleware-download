const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const util = require('util');
const stream = require('stream');

const WORKDIR = process.cwd() + '/jungle/build';

async function download({destination, url, filename, cache = true, headers = {}}) {
    if (!destination) throw new Error('Please provide a destination');
    if (!url) throw new Error('Please provide a url');
    if (!filename) throw new Error('Please provide a filename');

    const folder = path.join(WORKDIR, destination);
    const fullPath = path.join(folder, filename);
    const newPath = '/' + path.join(destination, filename);
    
    if (!fs.existsSync(folder))
        fs.mkdirSync(folder);

    if (!fs.existsSync(fullPath) || !cache) {
        await fetch(url, {headers})
            .then(async result => {
                const write = fs.createWriteStream(fullPath);
                const pipeline = util.promisify(stream.pipeline);
                await pipeline(result.body, write);
            });
    }
    return {url: newPath, filename};
}

module.exports = download;
