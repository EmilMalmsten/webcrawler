const { test, expect } = require('@jest/globals')
const { getURLsFromHTML, normalizeURL } = require('./crawl.js')

test('normalize url to domain/path', () => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path')
});

test('normalize url to domain/path', () => {
    expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path')
});

test('normalize url to domain/path', () => {
    expect(normalizeURL('http://wagslane.Dev/Path')).toBe('wagslane.dev/path')
});

test('normalize url to domain/path', () => {
    expect(normalizeURL('https://www.wagslane.dev/path')).toBe('wagslane.dev/path')
});

test('normalize url to domain/path', () => {
    expect(normalizeURL('wagslane.dev/path')).toBe('wagslane.dev/path')
});


test('All a tags are found within the HTML body', () => {
    const links = getURLsFromHTML(
        '<a href="/path"> Text </a><a href="/path"> Text </a><a href="/path"> Text </a>',
        'https://wagslane.dev'
    )
    expect(links.length).toBe(3)
});

test('relative URLs are converted into absolute URLs', () => {
    const links = getURLsFromHTML(
        '<a href="/path"> Text </a><a href="/path"> Text </a><a href="/path"> Text </a>',
        'https://wagslane.dev'
    )
    expect(links[0]).toBe('https://wagslane.dev/path')
});





