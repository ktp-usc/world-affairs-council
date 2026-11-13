/* eslint-disable @typescript-eslint/no-require-imports -- This Node harness renders the actual client component in a DOM. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');
const ts = require('typescript');
const React = require('react');
const {JSDOM} = require('jsdom');
const defaults = require('../sanity/defaults/landing-page.json');

test('newsletter uses edited form content, loads lazily, toggles, and reopens through its anchor', async () => {
  const dom = new JSDOM('<div id="root"></div><a id="signup-link" href="#newsletter-signup-panel">Updates</a>', {url: 'http://localhost/', pretendToBeVisual: true});
  const previous = Object.fromEntries(['window', 'document', 'Element', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, global[key]]));
  global.window = dom.window;
  global.document = dom.window.document;
  global.Element = dom.window.Element;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = () => ({matches: true});
  window.requestAnimationFrame = callback => {callback(); return 1;};
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  const {createRoot} = require('react-dom/client');
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../components/newsletter-signup.tsx'), 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true},
  }).outputText;
  const compiledModule = {exports: {}};
  const customRequire = name => {
    if (name === '@/components/wild-apricot-embed') return ({src, title}) => React.createElement('iframe', {src, title});
    if (name === '@/sanity/defaults/landing-page.json') return defaults;
    return require(name);
  };
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`)(customRequire, compiledModule, compiledModule.exports);
  const content = {...defaults.newsletter, title: 'Edited heading', body: 'Edited description', openLabel: 'Join', closeLabel: 'Hide', formLabel: 'Edited region', formTitle: 'Edited iframe', embedUrl: 'https://example.com/edited-form'};
  const root = createRoot(document.getElementById('root'));
  const button = () => document.querySelector('button');
  try {
    await React.act(async () => root.render(React.createElement(compiledModule.exports.default, {content})));
    assert.equal(document.querySelector('h2').textContent, content.title);
    assert.equal(document.querySelector('p').textContent, content.body);
    assert.equal(button().textContent, 'Join');
    assert.equal(document.querySelector('iframe'), null);
    await React.act(async () => button().click());
    assert.equal(button().getAttribute('aria-expanded'), 'true');
    assert.equal(button().textContent, 'Hide');
    assert.equal(document.querySelector('iframe').getAttribute('src'), content.embedUrl);
    assert.equal(document.querySelector('iframe').title, content.formTitle);
    assert.equal(document.querySelector('[role="region"]').getAttribute('aria-label'), content.formLabel);
    await React.act(async () => button().click());
    assert.equal(button().getAttribute('aria-expanded'), 'false');
    assert.equal(document.querySelector('[role="region"]').getAttribute('aria-hidden'), 'true');
    await React.act(async () => document.getElementById('signup-link').click());
    assert.equal(button().getAttribute('aria-expanded'), 'true');
    assert.equal(window.location.hash, '#newsletter-signup-panel');
    await React.act(async () => button().click());
    await React.act(async () => document.getElementById('signup-link').click());
    assert.equal(button().getAttribute('aria-expanded'), 'true', 'The same anchor must reopen the form without a hashchange');
  } finally {
    await React.act(async () => root.unmount());
    dom.window.close();
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete global[key];
      else global[key] = value;
    }
  }
});
