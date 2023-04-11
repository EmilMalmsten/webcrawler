const { JSDOM } = require('jsdom')

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

const crawlPage = async (baseURL, currentURL, pages) => {
    if (!currentURL.includes(baseURL)) {
        console.log(`${currentURL} not on ${baseURL}`)
        return pages;
    }
    
    const normCurrURL = await normalizeURL(currentURL);
    if (pages[normCurrURL]) {
        pages[normCurrURL] += 1;
        console.log(`already visited ${normCurrURL}, returning...`)
        return pages;
    }
    pages[normCurrURL] = 1;

    try {
        console.log(`Requesting ${normCurrURL}`);
        const response = await fetch(`https://${normCurrURL}`);

        if (!response.ok) {
            console.error(`Error: HTTP status code ${response.status}`);
            return pages;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.error('Error: Response is not HTML');
            return pages;
        }
        const html = await response.text();
        const urls = getURLsFromHTML(html, baseURL)
        for (let url of urls) {
            pages = await crawlPage(baseURL, url, pages);
        }
        return pages

    } catch (error) {
        console.error(`Error: ${error}`);
        return pages;
    }
}

module.exports = {
    getURLsFromHTML,
    normalizeURL,
    crawlPage
}
