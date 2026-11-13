/* eslint-disable @typescript-eslint/no-require-imports -- This Node harness loads the actual client carousel into a DOM. */
const { createRequire } = require('node:module');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');

const repo = path.resolve(__dirname, '..');
const req = createRequire(path.join(repo, 'package.json'));
const React = req('react');
const { JSDOM } = req('jsdom');
const ts = req('typescript');

test('carousel plays every ten seconds, resets after selection, and preserves time on pause', async () => {
    const dom = new JSDOM('<!doctype html><div id="root"></div>', { pretendToBeVisual: true });
    const originalPerformance = global.performance;
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.IS_REACT_ACT_ENVIRONMENT = true;
    let now = 0;
    let frameId = 0;
    const frames = new Map();
    global.performance = { now: () => now };
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
    window.requestAnimationFrame = (callback) => { frames.set(++frameId, callback); return frameId; };
    window.cancelAnimationFrame = (id) => frames.delete(id);
    global.IntersectionObserver = class {
        constructor(callback) { this.callback = callback; }
        observe() { this.callback([{ isIntersecting: true }]); }
        disconnect() {}
    };
    const source = readFileSync(path.join(repo, 'components/home-carousel.tsx'), 'utf8');
    const compiled = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const exports = {};
    const customRequire = (name) => name === 'next/image'
        ? { default: ({ alt }) => React.createElement('img', { alt }) }
        : req(name);
    vm.runInThisContext('(function(require,exports){' + compiled + '\n})')(customRequire, exports);
    const { act } = React;
    const { createRoot } = req('react-dom/client');
    const root = createRoot(document.getElementById('root'));
    const click = async (label) => {
        const button = document.querySelector(`button[aria-label="${label}"]`);
        assert.ok(button, label);
        await act(async () => button.click());
    };
    const tick = async (time) => {
        now = time;
        const callbacks = [...frames.values()];
        frames.clear();
        await act(async () => callbacks.forEach(callback => callback(now)));
    };
    const active = () => document.querySelector('.is-active').getAttribute('aria-label');
    try {
        await act(async () => root.render(React.createElement(exports.default, {
            id: 'test-carousel', label: 'Test photos', slides: [
                { image: '/one.jpg', alt: 'First photo', label: 'First' },
                { image: '/two.jpg', alt: 'Second photo', label: 'Second' },
            ],
        })));
        assert.equal(document.querySelector('section').dataset.playback, 'playing');
        await tick(5000);
        assert.equal(active(), '1 of 2: First');
        assert.equal(document.querySelector('.home-carousel-progress span').style.transform, 'scaleX(0.5)');
        await click('Pause slideshow');
        assert.equal(frames.size, 0);
        now = 15000;
        await click('Play slideshow');
        await tick(19999);
        assert.equal(active(), '1 of 2: First');
        await tick(20000);
        assert.equal(active(), '2 of 2: Second');
        await click('Show slide 1: First');
        assert.equal(document.querySelector('section').dataset.playback, 'playing');
        await tick(29999);
        assert.equal(active(), '1 of 2: First');
        await tick(30000);
        assert.equal(active(), '2 of 2: Second');
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
        global.performance = originalPerformance;
    }
});
