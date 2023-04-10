const { JSDOM } = require('jsdom')

const getURLsFromHTML = (htmlBody, baseURL) => {
    return
}

const normalizeURL = (url) => {
    url = url.endsWith('/') ? url.substr(0, url.length - 1) : url; 
    url = url.toLowerCase()
    url = url.replace(/^https?:\/\/(www\.)?/, "https://");
    try {
        const urlObj = new URL(url);
        return urlObj.hostname + urlObj.pathname
    } catch(err) {
        return url
    }
}

normalizeURL('https://wagslane.dev/path/')

module.exports = {
    getURLsFromHTML,
    normalizeURL,
}
