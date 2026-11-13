/* eslint-disable @typescript-eslint/no-require-imports -- Tests exercise the real Sanity runtime with locally transpiled schemas. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test, after} = require('node:test');
const ts = require('typescript');
const sanity = require('sanity');
const {createStructureBuilder} = require('sanity/structure');
// Sanity's initial-value resolver checks for the optional browser scheduler.
global.window = {};
after(() => {delete global.window;});
const defaults = require('../sanity/defaults/landing-page.json');
const root = path.resolve(__dirname, '..');

function load(file, overrides = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020},
  }).outputText;
  const compiledModule = {exports: {}};
  const customRequire = name => Object.hasOwn(overrides, name) ? overrides[name] : require(name);
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`)(customRequire, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

const {landingPageTypes} = load('sanity/schemaTypes/landingPage.ts', {'../defaults/landing-page.json': defaults});
const {eventType} = load('sanity/schemaTypes/eventType.ts');
const {headerNavigation} = load('sanity/schemaTypes/headerNavigation.ts');
const folder = load('sanity/landingPageStructure.ts', {
  './defaults/landing-page.json': defaults, './schemaTypes/landingPage': {landingPageTypes},
});
const workspace = {
  projectId: 'gbfmisf9', dataset: 'production', currentUser: null,
  i18n: {t: key => key, loadNamespaces: async () => {}},
  schema: sanity.createSchema({name: 'landing-tests', types: [...landingPageTypes, eventType, headerNavigation]}),
  templates: [...landingPageTypes, eventType, headerNavigation].map(type => ({id: type.name, schemaType: type.name, title: type.title, value: {_type: type.name}})),
  getClient: () => require('@sanity/client').createClient({projectId: 'gbfmisf9', dataset: 'production', apiVersion: '2026-10-30', useCdn: false}),
  document: {resolveNewDocumentOptions: () => []},
};

test('the real Structure Builder can open the complete Landing Page folder', () => {
  const S = createStructureBuilder({source: workspace, perspectiveStack: ['published']});
  const item = folder.landingPageFolder(S).serialize();
  const pane = item.child;
  assert.equal(pane.items.length, 9);
  assert.equal(new Set(pane.items.map(item => item.id)).size, pane.items.length);
  for (const entry of pane.items) assert.ok(entry.child, entry.title);
  for (const [index, key] of Object.keys(defaults).entries()) {
    assert.equal(pane.items[index].child.options.id, `landing-${key}`);
    assert.equal(pane.items[index].child.options.type, landingPageTypes[index].name);
  }
  assert.equal(pane.items[7].child.options.params.type, 'event');
});

for (const [key, value] of Object.entries(defaults)) {
  const typeName = `landing${key[0].toUpperCase()}${key.slice(1)}`;
  test(`${typeName}: initial content resolves and passes real document validation`, async () => {
    const template = workspace.templates.find(template => template.schemaType === typeName);
    assert.ok(template, `Initial-value template for ${typeName}`);
    const initial = await sanity.resolveInitialValue(workspace.schema, template, {}, {
      projectId: workspace.projectId, dataset: workspace.dataset, schema: workspace.schema,
      currentUser: null, getClient: workspace.getClient,
    });
    for (const field of Object.keys(value)) assert.deepEqual(initial[field], value[field], field);
    const document = {_id: `landing-${key}`, _type: typeName, ...initial};
    const markers = await sanity.validateDocument({document, workspace, getDocumentExists: async () => true});
    assert.deepEqual(markers.filter(marker => marker.level === 'error'), [], JSON.stringify(markers));
  });
}

const invalidEdits = [
  ['hero', 'interval', 2], ['hero', 'interval', 61], ['hero', 'interval', 3.5],
  ['hero', 'slides', []], ['programs', 'photos', []],
  ['events', 'limit', 0], ['events', 'limit', 13], ['events', 'limit', 1.5],
  ['newsletter', 'embedUrl', 'javascript:alert(1)'], ['newsletter', 'embedUrl', 'http://example.com/form'],
  ['programs', 'allLink', {label: 'Invalid', href: 'javascript:alert(1)'}],
  ['programs', 'allLink', {label: 'Invalid', href: '//example.com'}],
  ['sponsors', 'sponsors', [{_type: 'sponsorsItem', _key: 'new', name: 'Missing image', alt: 'Sponsor'}]],
  ['hero', 'slides', [{...defaults.hero.slides[0], imagePath: undefined, image: undefined}]],
  ['programs', 'photos', [{...defaults.programs.photos[0], alt: undefined}]],
];
for (const [key, field, value] of invalidEdits) {
  test(`${key}.${field}: blocks invalid ${JSON.stringify(value)}`, async () => {
    const document = {_id: `landing-${key}`, _type: `landing${key[0].toUpperCase()}${key.slice(1)}`, ...structuredClone(defaults[key]), [field]: value};
    const markers = await sanity.validateDocument({document, workspace, getDocumentExists: async () => true});
    assert.ok(markers.some(marker => marker.level === 'error'), 'Invalid content must prevent publishing');
  });
}

for (const key of ['programs', 'about', 'sponsors']) {
  test(`${key}: permits intentionally empty lists`, async () => {
    const body = structuredClone(defaults[key]);
    for (const field of ['links', 'paragraphs', 'sponsors']) if (Array.isArray(body[field])) body[field] = [];
    const markers = await sanity.validateDocument({document: {_id: `landing-${key}`, _type: `landing${key[0].toUpperCase()}${key.slice(1)}`, ...body}, workspace, getDocumentExists: async () => true});
    assert.deepEqual(markers.filter(marker => marker.level === 'error'), []);
  });
}

for (const destination of ['/about', '#calendar', 'https://example.com', 'mailto:office@example.com', 'tel:8433846758']) {
  test(`program link accepts supported destination ${destination}`, async () => {
    const document = {_id: 'landing-programs', _type: 'landingPrograms', ...structuredClone(defaults.programs), allLink: {label: 'Valid link', href: destination}};
    const markers = await sanity.validateDocument({document, workspace, getDocumentExists: async () => true});
    assert.deepEqual(markers.filter(marker => marker.level === 'error'), []);
  });
}
