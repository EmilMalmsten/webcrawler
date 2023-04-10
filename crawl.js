const { JSDOM } = require('jsdom')

const htmlBody = '<html><body><a href="/about"><span>Go to Boot.dev</span></a></body></html>'

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a[href]');
    const urls = [...links].map(link => link.href);
    const absoluteUrls = urls.map(url => {
        const urlObj = new URL(url, baseURL)
        if (urlObj.protocol === 'about:') {
            return url
        } else {
            return  urlObj.href;
        }
    })

    return absoluteUrls
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

getURLsFromHTML(htmlBody, 'https://wagslane.dev')

module.exports = {
    getURLsFromHTML,
    normalizeURL,
}
