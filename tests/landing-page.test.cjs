/* eslint-disable @typescript-eslint/no-require-imports -- This Node test harness loads transpiled server modules as CommonJS. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const groq = require('groq-js');
const defaults = require('../sanity/defaults/landing-page.json');
const root = path.resolve(__dirname, '..');

function load(file, overrides) {
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020},
  }).outputText;
  const compiledModule = {exports: {}};
  const customRequire = name => Object.hasOwn(overrides, name) ? overrides[name] : require(name);
  vm.runInThisContext(`(function(require, module, exports){${source}\n})`)(customRequire, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

function loader(fetch) {
  return load('sanity/lib/landing-page.ts', {
    react: {...React, cache: fn => fn},
    'next-sanity': {defineQuery: query => query},
    '../defaults/landing-page.json': defaults,
    './client': {client: {withConfig(config) {
      assert.equal(config.useCdn, false);
      assert.equal(config.perspective, 'published');
      return {fetch};
    }}},
  });
}

test('published query resolves every seeded section and uploaded image overrides', async () => {
  const data = fs.readFileSync(path.join(root, 'sanity/seed/wac39.ndjson'), 'utf8').trim().split('\n').map(JSON.parse);
  const hero = data.find(doc => doc._id === 'landing-hero');
  hero.slides[0].image = {asset: {_type: 'reference', _ref: 'image-upload'}};
  data.push({_id: 'image-upload', _type: 'sanity.imageAsset', url: 'https://cdn.sanity.io/images/new.jpg'});
  const api = loader(async (query, params, options) => {
    assert.equal(options.next.revalidate, 60);
    return (await groq.evaluate(groq.parse(query), {dataset: data, params})).get();
  });
  const result = await api.fetchLandingPage();
  assert.equal(result.hero.slides[0].imagePath, 'https://cdn.sanity.io/images/new.jpg');
  assert.equal(result.hero.slides[1].imagePath, defaults.hero.slides[1].imagePath);
  for (const section of Object.keys(defaults)) assert.ok(result[section]);
  assert.equal(result.programs.photos.length, 4);
  assert.equal(result.about.paragraphs.length, 4);
  assert.equal(result.sponsors.sponsors.length, 7);
  assert.equal(result.newsletter.embedUrl, defaults.newsletter.embedUrl);
});

test('partial content keeps defaults, while explicit removals and disabled shortcut survive', async () => {
  const result = await loader(async () => ({hero: null, programs: {title: 'Edited programs', links: []}, about: {paragraphs: [], links: []}, sponsors: {sponsors: []}, memberShortcut: {enabled: false}})).fetchLandingPage();
  assert.equal(result.hero.slides.length, 5);
  assert.equal(result.programs.title, 'Edited programs');
  assert.equal(result.programs.allLink.href, '/programs');
  assert.deepEqual(result.programs.links, []);
  assert.deepEqual(result.about.paragraphs, []);
  assert.deepEqual(result.sponsors.sponsors, []);
  assert.equal(result.memberShortcut.enabled, false);
});

test('missing documents and unavailable Sanity retain the current landing content', async () => {
  assert.deepEqual(await loader(async () => null).fetchLandingPage(), defaults);
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.deepEqual(await loader(async () => {throw Error('offline');}).fetchLandingPage(), defaults);
  } finally {console.error = originalError;}
});

test('landing page renders edited copy, images, links, event limit, and removed lists', async () => {
  const content = structuredClone(defaults);
  content.hero.slides = [{...content.hero.slides[0], title: 'Edited hero heading', imagePath: '/changed-hero.jpg', link: {label: 'Edited action', href: '/changed-action'}}];
  content.programs.title = 'Edited programs';
  content.programs.links = [];
  content.programs.photos = [{...content.programs.photos[0], imagePath: '/changed-gallery.jpg'}];
  content.events.title = 'Edited calendar';
  content.events.limit = 1;
  content.about.title = 'Edited Council';
  content.about.mission = 'Edited mission';
  content.about.paragraphs = ['Edited paragraph'];
  content.about.links = [{_key: 'new', label: 'Edited about link', href: '/new-about', source: 'custom', newTab: false}];
  content.sponsors.title = 'Edited supporters';
  content.sponsors.sponsors = [];
  content.newsletter.title = 'Edited newsletter';
  content.memberShortcut.enabled = false;
  const Image = ({alt, src}) => React.createElement('img', {alt, src});
  const Link = ({children, ...props}) => React.createElement('a', props, children);
  const Carousel = ({slides}) => React.createElement('section', {}, slides.map((slide, index) => React.createElement('div', {key: index}, slide.content, React.createElement(Image, {src: slide.image, alt: slide.alt}))));
  const {default: Home} = load('app/page.tsx', {
    'next/image': Image, 'next/link': Link, '@/components/home-carousel': Carousel,
    '@/components/newsletter-signup': ({content}) => React.createElement('h2', {}, content.title),
    '@/lib/site': {isSpeakerSeries: () => true, parseDate: date => new Date(`${date}T12:00:00`)},
    '@/sanity/lib/about': {fetchAbout: async () => ({reports: [], wacaHref: '/network'})},
    '@/sanity/lib/events': {fetchUpcomingEvents: async () => [1, 2].map(n => ({slug: `event-${n}`, title: `Event ${n}`, date: '2027-01-01', start: '10 AM', venue: 'Council'}))},
    '@/sanity/lib/landing-page': {fetchLandingPage: async () => content}, './home.css': {},
  });
  const html = renderToStaticMarkup(await Home());
  for (const value of ['Edited hero heading', '/changed-hero.jpg', '/changed-action', 'Edited programs', '/changed-gallery.jpg', 'Edited calendar', 'Edited Council', 'Edited mission', 'Edited paragraph', '/new-about', 'Edited supporters', 'Edited newsletter', 'Event 1']) assert.ok(html.includes(value), value);
  for (const value of ['Event 2', 'Members only', 'Speaker programs', 'Sea Pines Real Estate', defaults.about.paragraphs[0]]) assert.ok(!html.includes(value), value);
});

test('preserved images and seed IDs match the defaults', () => {
  for (const image of [...defaults.hero.slides, ...defaults.programs.photos, defaults.about, ...defaults.sponsors.sponsors]) {
    assert.ok(fs.existsSync(path.join(root, 'public', image.imagePath)), image.imagePath);
  }
  const seed = fs.readFileSync(path.join(root, 'sanity/seed/wac39.ndjson'), 'utf8').trim().split('\n').map(JSON.parse);
  assert.equal(seed.length, Object.keys(defaults).length);
  for (const [key, value] of Object.entries(defaults)) {
    const {_id, _type, ...body} = seed.find(doc => doc._id === `landing-${key}`);
    assert.equal(_id, `landing-${key}`);
    assert.equal(_type, `landing${key[0].toUpperCase()}${key.slice(1)}`);
    assert.deepEqual(body, value);
  }
});
