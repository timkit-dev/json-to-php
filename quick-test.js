"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const jsonString = '{\n' +
//     '  "prop1": "value1",\n' +
//     '  "prop2": { "level1": "value2" },\n' +
//     '  "prop3": { "level1": { "level2": { "level3": "value3" } } },\n' +
//     '  "prop4": { "level1": { "level2": { "level3": { "level4": { "level5": "value4" } } } } },\n' +
//     '  "prop5": { "level1": { "level2": "value5" } },\n' +
//     '  "prop6": { "level1": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": "value6" } } } } } } },\n' +
//     '  "prop7": "value7",\n' +
//     '  "prop8": { "level1": { "level2": { "level1x1": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } },  "level1x2": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } }  },\n' +
//     '  "prop9": { "level1": { "level2": "value9" } },\n' +
//     '  "prop19": { "level1": ["val1", "val2", "val3", true, false, null, 1, 2, 3, -2] },\n' +
//     '  "prop11": { "level1": { "level2": { "level3": "value10" } } }\n' +
//     '}\n';
//
// console.log(jsonToPhp(JSON.parse(jsonString), {beautify: true}));
// console.log(jsonToPhp(JSON.parse(`[1, 2, 3, true, false, "O'Neil", "", "   ", "   yes!   ", -10, 0, null,
//
//
//
//
// {}, {"a": {}, "b":
//
//
// {"c":
//
// {
//
//
// } } } ]`), {beautify: false}));
// const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
// console.log(jsonToPhp(JSON.parse(jsonString), {beautify: true, indentLevel: 2, indentSize: 2, useTabs: true}));
//
// console.log(jsonToPhp(JSON.parse(jsonString), {beautify: true, indentSize: 2, useTabs: true}));
