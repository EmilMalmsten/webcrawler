const sortPages = (pages) => {
    return Object.fromEntries(
        Object.entries(pages).sort(([, a], [, b]) => b - a)
    );
}

const printReport = (pages) => {
    console.log('Creating report...');
    const sortedPages = sortPages(pages);
    for (const [url, count] of Object.entries(sortedPages)) {
        console.log(`Found ${count} internal links to ${url}`);
    }
}

module.exports = {
    sortPages,
    printReport
}
