module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        basePath: './',
        files: [
            './node_modules/promise-polyfill/promise.js',
            { pattern: "src/**/*.ts" },
            { pattern: "spec/**/*.ts" },
            { pattern: 'spec/schemas/*.json', server: true, included: false, watched: true }
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"], // *.tsx for React Jsx
            "spec/**/*.ts": ["karma-typescript"]
        },
        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    //require("karma-typescript-es6-transform")
                ]
            },
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};