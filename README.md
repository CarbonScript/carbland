## Carbland - Mini IDE for Carbon Script

It is developed based on three frameworks: Electron.js, React, MonacoEditor. Use it to write an independent development environment similar to VSCode, with grammar analysis, intelligent completion, grammar coloring, project management, and command line tools to make a cross-platform Lightweight workbench.

## Usage

Please install dependencies first

```bash
npm install
```

Package build for current platform:

```bash
npm run package
````

Can also be packaged and built for other platforms

````
npm run package -- --mac
npm run package -- --linux
````

Note: Cross-platform packaging builds need to be submitted to https://service.electron.build , but this website has been crashed down, so there may be some problems with cross-platform packaging. Therefore, it is recommended to switch to the corresponding platform to package. You can use WSL packaging in Windows platform.

## License

MIT © [Carbland](./LICENSE)
