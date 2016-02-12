Example project with no frameworks and no package.json.

Install crunchicorn:

```bash
$ npm install -g crunchicorn
```

Build project:

```bash
$ crunch-webapp src/app.js public/app.js
```

Open `public/index.html` in your browser.

Tip: Use `--watch` flag to keep crunchicorn rebuilding continuously whenever a file changes.
