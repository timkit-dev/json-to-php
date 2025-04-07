import {jsonToPhp} from '../src';

describe('jsonToPhp', () => {
    test('convert simple JSON object', () => {
        const jsonString = '{"name": "John", "age": 30}';
        const expected = "['name' => 'John', 'age' => 30]";
        const result = jsonToPhp(JSON.parse(jsonString));
        expect(result).toBe(expected);
    });

    test('convert nested JSON object', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = "['name' => 'John', 'address' => ['city' => 'New York', 'zip' => '10001']]";
        expect(jsonToPhp(jsonString)).toBe(expected);
    });

    test('convert JSON with array', () => {
        const jsonString = '{"name": "John", "hobbies": ["reading", "traveling"]}';
        const expected = "['name' => 'John', 'hobbies' => ['reading', 'traveling']]";
        expect(jsonToPhp(JSON.parse(jsonString))).toBe(expected);
    });

    test('convert JSON with different data types', () => {
        const jsonString = '{"string": "hello", "number": 123, "boolean": true, "nullValue": null}';
        const expected = "['string' => 'hello', 'number' => 123, 'boolean' => true, 'nullValue' => null]";
        expect(jsonToPhp(JSON.parse(jsonString))).toBe(expected);
    });

    test('convert deeply nested JSON object', () => {
        const jsonString = '{"level1": {"level2": {"level3": {"key": "value"}}}}';
        const expected = "['level1' => ['level2' => ['level3' => ['key' => 'value']]]]";
        expect(jsonToPhp(JSON.parse(jsonString))).toBe(expected);
    });

    // Beautify Tests
    test('convert simple JSON object with beautify', () => {
        const jsonString = '{"name": "John", "age": 30}';
        const expected = `[
    'name' => 'John',
    'age' => 30
]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });

    test('initial indent level 2 and beatify test', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = `        [
            'name' => 'John',
            'address' => [
                'city' => 'New York',
                'zip' => '10001'
            ]
        ]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true, indentLevel: 2})).toBe(expected);
    });

    test('initial indent level 2 and indent size 2 and beatify test', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = `    [
      'name' => 'John',
      'address' => [
        'city' => 'New York',
        'zip' => '10001'
      ]
    ]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true, indentLevel: 2, indentSize: 2})).toBe(expected);
    });

    test('initial indent size 2 and beatify test', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = `[
  'name' => 'John',
  'address' => [
    'city' => 'New York',
    'zip' => '10001'
  ]
]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true, indentSize: 2})).toBe(expected);
    });

    test('use tabs and beatify test', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = `[\n\t'name' => 'John',\n\t'address' => [\n\t\t\'city' => 'New York',\n\t\t\'zip' => '10001'\n\t]\n]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true, useTabs: true})).toBe(expected);
    });

    test('convert nested JSON object with beautify', () => {
        const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';
        const expected = `[
    'name' => 'John',
    'address' => [
        'city' => 'New York',
        'zip' => '10001'
    ]
]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });

    test('convert JSON with array with beautify', () => {
        const jsonString = '{"name": "John", "hobbies": ["reading", "traveling"]}';
        const expected = `[
    'name' => 'John',
    'hobbies' => [
        'reading',
        'traveling'
    ]
]`;
        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });

    test('convert nested JSON object with beautify, another attempt', () => {
        const jsonString = '{"name": "John", "hobbies": ["reading", "traveling"], "address": {"city": "New York", "zip": "10001", "more": {"nested": "value"}}}';
        const expected = `[
    'name' => 'John',
    'hobbies' => [
        'reading',
        'traveling'
    ],
    'address' => [
        'city' => 'New York',
        'zip' => '10001',
        'more' => [
            'nested' => 'value'
        ]
    ]
]`;

        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });

    test('convert nested JSON object with beautify, extremely large object', () => {
        const jsonString = '{\n' +
            '  "prop1": "value1",\n' +
            '  "prop2": { "level1": "value2" },\n' +
            '  "prop3": { "level1": { "level2": { "level3": "value3" } } },\n' +
            '  "prop4": { "level1": { "level2": { "level3": { "level4": { "level5": "value4" } } } } },\n' +
            '  "prop5": { "level1": { "level2": "value5" } },\n' +
            '  "prop6": { "level1": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": "value6" } } } } } } },\n' +
            '  "prop7": "value7",\n' +
            '  "prop8": { "level1": { "level2": { "level1x1": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } },  "level1x2": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } }  },\n' +
            '  "prop9": { "level1": { "level2": "value9" } },\n' +
            '  "prop10": { "level1": ["val1", "val2", "val3", true, false, null, 1, 2, 3, -2] },\n' +
            '  "prop11": { "level1": { "level2": { "level3": "value10" } } }\n' +
            '}\n';

        const expected = `[
    'prop1' => 'value1',
    'prop2' => [
        'level1' => 'value2'
    ],
    'prop3' => [
        'level1' => [
            'level2' => [
                'level3' => 'value3'
            ]
        ]
    ],
    'prop4' => [
        'level1' => [
            'level2' => [
                'level3' => [
                    'level4' => [
                        'level5' => 'value4'
                    ]
                ]
            ]
        ]
    ],
    'prop5' => [
        'level1' => [
            'level2' => 'value5'
        ]
    ],
    'prop6' => [
        'level1' => [
            'level2' => [
                'level3' => [
                    'level4' => [
                        'level5' => [
                            'level6' => [
                                'level7' => 'value6'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ],
    'prop7' => 'value7',
    'prop8' => [
        'level1' => [
            'level2' => [
                'level1x1' => [
                    'level4' => [
                        'level5' => [
                            'level6' => [
                                'level7' => [
                                    'level8' => [
                                        'level9' => [
                                            'level10' => 'value8'
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'level1x2' => [
            'level2' => [
                'level3' => [
                    'level4' => [
                        'level5' => [
                            'level6' => [
                                'level7' => [
                                    'level8' => [
                                        'level9' => [
                                            'level10' => 'value8'
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ],
    'prop9' => [
        'level1' => [
            'level2' => 'value9'
        ]
    ],
    'prop10' => [
        'level1' => [
            'val1',
            'val2',
            'val3',
            true,
            false,
            null,
            1,
            2,
            3,
            -2
        ]
    ],
    'prop11' => [
        'level1' => [
            'level2' => [
                'level3' => 'value10'
            ]
        ]
    ]
]`;

        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });


    test('convert nested JSON object no beautify, extremely large object', () => {
        const jsonString = '{\n' +
            '  "prop1": "value1",\n' +
            '  "prop2": { "level1": "value2" },\n' +
            '  "prop3": { "level1": { "level2": { "level3": "value3" } } },\n' +
            '  "prop4": { "level1": { "level2": { "level3": { "level4": { "level5": "value4" } } } } },\n' +
            '  "prop5": { "level1": { "level2": "value5" } },\n' +
            '  "prop6": { "level1": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": "value6" } } } } } } },\n' +
            '  "prop7": "value7",\n' +
            '  "prop8": { "level1": { "level2": { "level1x1": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } },  "level1x2": { "level2": { "level3": { "level4": { "level5": { "level6": { "level7": { "level8": { "level9": { "level10": "value8" } } } } } } } } }  },\n' +
            '  "prop9": { "level1": { "level2": "value9" } },\n' +
            '  "prop10": { "level1": ["val1", "val2", "val3", true, false, null, 1, 2, 3, -2] },\n' +
            '  "prop11": { "level1": { "level2": { "level3": "value10" } } }\n' +
            '}\n';

        const expected = `['prop1' => 'value1', 'prop2' => ['level1' => 'value2'], 'prop3' => ['level1' => ['level2' => ['level3' => 'value3']]], 'prop4' => ['level1' => ['level2' => ['level3' => ['level4' => ['level5' => 'value4']]]]], 'prop5' => ['level1' => ['level2' => 'value5']], 'prop6' => ['level1' => ['level2' => ['level3' => ['level4' => ['level5' => ['level6' => ['level7' => 'value6']]]]]]], 'prop7' => 'value7', 'prop8' => ['level1' => ['level2' => ['level1x1' => ['level4' => ['level5' => ['level6' => ['level7' => ['level8' => ['level9' => ['level10' => 'value8']]]]]]]]], 'level1x2' => ['level2' => ['level3' => ['level4' => ['level5' => ['level6' => ['level7' => ['level8' => ['level9' => ['level10' => 'value8']]]]]]]]]], 'prop9' => ['level1' => ['level2' => 'value9']], 'prop10' => ['level1' => ['val1', 'val2', 'val3', true, false, null, 1, 2, 3, -2]], 'prop11' => ['level1' => ['level2' => ['level3' => 'value10']]]]`;

        expect(jsonToPhp(JSON.parse(jsonString), {beautify: false})).toBe(expected);
    });

    test('convert nested JSON object with beautify, random data and random spaces', () => {
        const jsonString = `[1, 2, 3, true, false, "O'Neil", "", "   ", "   yes!   ", -10, 0, null, 




{}, {"a": {}, "b": 


{"c": 

{


} } } ]`;

        const expected = `[
    1,
    2,
    3,
    true,
    false,
    'O\\'Neil',
    '',
    '   ',
    '   yes!   ',
    -10,
    0,
    null,
    [],
    [
        'a' => [],
        'b' => [
            'c' => []
        ]
    ]
]`;

        expect(jsonToPhp(JSON.parse(jsonString), {beautify: true})).toBe(expected);
    });

    test('convert nested JSON object with beautify, random data and random spaces', () => {
        const jsonString = `[1, 2, 3, true, false, "O'Neil", "", "   ", "   yes!   ", -10, 0, null, 




{}, {"a": {}, "b": 


{"c": 

{


} } } ]`;

        const expected = `[1, 2, 3, true, false, 'O\\'Neil', '', '   ', '   yes!   ', -10, 0, null, [], ['a' => [], 'b' => ['c' => []]]]`;

        expect(jsonToPhp(JSON.parse(jsonString), {beautify: false})).toBe(expected);
    });
});
