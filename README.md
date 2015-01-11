# metalsmith-partial

> A metalsmith plugin for a partial

This plugin provide 'partial' helper to include other templates. You can use any templating engine supported by [consolidate.js](https://github.com/tj/consolidate.js).

## Installation

```bash
$ npm install metalsmith-partial
```

## Example

Source file `src/index.html`:

```html
---
title: The title
---
<p>The contents</p>

{%- @partial('foobar.html') %}
```

Partial `partials/foobar.html`:

```html
<p>This is a partial.</p>
```

Build file `build.js`:

```javascript
var metalsmith = require('metalsmith');
var partial = require('metalsmith-partial');
var templates = require('metalsmith-templates');

metalsmith(__dirname)
  .source('./src')
  .destination('./dest')
  .use(partial({
    directory: './partials', 
    engine: 'eco'
  }))
  .use(templates({
    engine: 'eco',
    inPlace: true
  }))
  .build();
```

Results in `dist/index.html`:

```html
<p>The contents</p>

<p>This is a partial</p>
```

## License

MIT
