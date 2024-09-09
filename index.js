"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToPhp = jsonToPhp;
function jsonToPhp(jsonObj, options = { beautify: false, indentLevel: 0, indentSize: 4, useTabs: false }) {
    var _a;
    const indentLevelNumber = (_a = options.indentLevel) !== null && _a !== void 0 ? _a : 0;
    const indentSizeNumber = (options.indentSize && options.indentSize > 0 && options.indentSize < 10) ? options.indentSize : 4;
    const indentString = options.useTabs ? '\t' : ' '.repeat(indentSizeNumber);
    const indent = options.beautify ? indentString.repeat(indentLevelNumber) : '';
    const newline = options.beautify ? '\n' : '';
    const commaNewline = options.beautify ? ',\n' : ', ';
    function convert(obj, options) {
        if (Array.isArray(obj)) {
            return arrayToPhp(obj, options);
        }
        else if (typeof obj === "object" && obj !== null) {
            return objectToPhp(obj, options);
        }
        else if (typeof obj === "string") {
            return `'${obj.replace(/'/g, "\\'")}'`; // Escape single quotes
        }
        else if (typeof obj === "number") {
            return `${obj}`;
        }
        else if (typeof obj === "boolean") {
            return obj ? "true" : "false";
        }
        else if (obj === null) {
            return "null";
        }
        return "null"; // Fallback for undefined or other types
    }
    function arrayToPhp(arr, options) {
        var _a, _b;
        const innerIndent = options.beautify ? indentString.repeat(((_a = options.indentLevel) !== null && _a !== void 0 ? _a : 0) + 1) : '';
        const closingIndent = options.beautify ? indentString.repeat((_b = options.indentLevel) !== null && _b !== void 0 ? _b : 0) : '';
        const mapped = arr.map(item => { var _a; return convert(item, Object.assign(Object.assign({}, options), { indentLevel: ((_a = options.indentLevel) !== null && _a !== void 0 ? _a : 0) + 1 })); });
        return `[${newline}${innerIndent}${mapped.join(`${commaNewline}${innerIndent}`)}${newline}${closingIndent}]`;
    }
    function objectToPhp(obj, options) {
        var _a, _b;
        const innerIndent = options.beautify ? indentString.repeat(((_a = options.indentLevel) !== null && _a !== void 0 ? _a : 0) + 1) : '';
        const closingIndent = options.beautify ? indentString.repeat((_b = options.indentLevel) !== null && _b !== void 0 ? _b : 0) : '';
        const mapped = Object.keys(obj).map(key => {
            var _a;
            return `'${key.replace(/'/g, "\\'")}' => ${convert(obj[key], Object.assign(Object.assign({}, options), { indentLevel: ((_a = options.indentLevel) !== null && _a !== void 0 ? _a : 0) + 1 }))}`;
        });
        return `[${newline}${innerIndent}${mapped.join(`${commaNewline}${innerIndent}`)}${newline}${closingIndent}]`;
    }
    // if jsonObj is string, use JSON.parse to convert it to object
    if (typeof jsonObj === "string") {
        jsonObj = JSON.parse(jsonObj);
    }
    const finalString = convert(jsonObj, options);
    // replace empty arrays with with empty space or lines with just []
    return `${indent}${finalString}`.replace(/\[\s*\]/g, '[]');
}
