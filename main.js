const { crawlPage } = require('./crawl.js')

const main = async () => {
    if (process.argv.length === 3) {
        console.log(`Starting crawler at URL ${process.argv[2]}`)
        const result = await crawlPage(process.argv[2], process.argv[2], {})
        console.log(result)
    } else {
        console.error("Error: no arguments were passed or more than one argument was passed.");
        process.exit(1);
    }
}

main()
