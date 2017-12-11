# vxo@hand mashup with Angular2
## Installation notes
In order ro run this project you need have [Node.js](https://nodejs.org) installed.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.
Therefore, in order to run this project you need to install this version. Most probably it isn necessary to downgrade the angular-cli version if you have already installed it.
Please perform the following commands in order to downgrade and install the correct angular-cli version:
```
npm uninstall -g @angular/cli
npm uninstall -g angular-cli 
npm cache clean 
npm install -g angular-cli@1.0.0-beta.19-3
```
Afterwards run `npm install` to install all dependencies

## Fixing the awesome-typescript-loader package
The package "awesome-typescript-loader" might throw an error while trying to run this project. In order to fix it please change the file located in `/node_modules/awesome-typescript-loader/dist/instance.js` and replace the body of the "applyDefaults" method with the following:
```javascript
function applyDefaults(configFilePath, compilerConfig, loaderConfig) {

    _.defaults(compilerConfig.options, {
        sourceMap: true,
        verbose: false,
        skipDefaultLibCheck: true,
        suppressOutputPathCheck: true
    });

    if (loaderConfig.transpileOnly) {
        compilerConfig.options.isolatedModules = true;
    }

    _.defaults(compilerConfig.options, {
        sourceRoot: compilerConfig.options.sourceMap ? process.cwd() : undefined
    });

    _.defaults(loaderConfig, {
        sourceMap: true,
        verbose: false
    });

    delete compilerConfig.options.outDir;
    delete compilerConfig.options.inlineSourceMap;
    delete compilerConfig.options.outFile;
    delete compilerConfig.options.out;
    delete compilerConfig.options.noEmit;
}
```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. If you plan to host your project not in the root directory of your domain, you need to use the `--base-href <FOLDER>` flag. For example, you host this project under www.mydomain.com/mashup/ you need to run the following command: `ng build --base-href /mashup/` 

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## PHP files
For two components (career and compare), PHP files are necessary. Those PHP files need to be accessible, that means you need to host them seperatly. You find the PHP files in the folder `/src/php`. Currently they are hosted under `http://celtest1.lnu.se/mashup/php/` and this url is included in the code. If you want to host your own php files (e.g. for local development or to make changes at the php files), you need to change the url in the following files:
```
/src/app/compare/compare.service.ts
/src/app/career/career.service.ts
```


