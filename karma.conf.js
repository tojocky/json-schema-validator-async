module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" }, // *.tsx for React Jsx 
            { pattern: "test/**/*.ts" }
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"], // *.tsx for React Jsx
            "test/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};