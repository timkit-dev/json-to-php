interface Options {
    beautify?: boolean;
    indentLevel?: number;
    indentSize?: number;
    useTabs?: boolean;
}

function jsonToPhp(jsonObj: any, options: Options = {beautify: false, indentLevel: 0, indentSize: 4, useTabs: false}): string {
    const indentLevelNumber = options.indentLevel ?? 0;
    const indentSizeNumber = (options.indentSize && options.indentSize > 0 && options.indentSize < 10) ? options.indentSize : 4;
    const indentString = options.useTabs ? '\t' : ' '.repeat(indentSizeNumber);
    const indent = options.beautify ? indentString.repeat(indentLevelNumber) : '';
    const newline = options.beautify ? '\n' : '';
    const commaNewline = options.beautify ? ',\n' : ', ';

    function convert(obj: any, options: Options): string {
        if (Array.isArray(obj)) {
            return arrayToPhp(obj, options);
        } else if (typeof obj === "object" && obj !== null) {
            return objectToPhp(obj, options);
        } else if (typeof obj === "string") {
            return `'${obj.replace(/'/g, "\\'")}'`; // Escape single quotes
        } else if (typeof obj === "number") {
            return `${obj}`;
        } else if (typeof obj === "boolean") {
            return obj ? "true" : "false";
        } else if (obj === null) {
            return "null";
        }
        return "null"; // Fallback for undefined or other types
    }

    function arrayToPhp(arr: any[], options: Options): string {
        const innerIndent = options.beautify ? indentString.repeat((options.indentLevel ?? 0) + 1) : '';
        const closingIndent = options.beautify ? indentString.repeat(options.indentLevel ?? 0) : '';
        const mapped = arr.map(item => convert(item, {...options, indentLevel: (options.indentLevel ?? 0) + 1}));
        return `[${newline}${innerIndent}${mapped.join(`${commaNewline}${innerIndent}`)}${newline}${closingIndent}]`;
    }

    function objectToPhp(obj: { [key: string]: any }, options: Options): string {
        const innerIndent = options.beautify ? indentString.repeat((options.indentLevel ?? 0) + 1) : '';
        const closingIndent = options.beautify ? indentString.repeat(options.indentLevel ?? 0) : '';
        const mapped = Object.keys(obj).map(key =>
            `'${key.replace(/'/g, "\\'")}' => ${convert(obj[key], {
                ...options,
                indentLevel: (options.indentLevel ?? 0) + 1
            })}`
        );
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

export {jsonToPhp};
