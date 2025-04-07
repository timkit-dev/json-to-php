# JSON To PHP

`JSON To PHP` is an npm package that converts JSON strings into PHP-style associative arrays. It is useful when working
with JavaScript applications that need to generate PHP code for dynamic content or server-side processing.

## Installation

You can install the package via npm:

```bash
npm install @timkit/json-to-php
```

## Options:

```typescript
interface Options {
    beautify?: boolean;
    indentLevel?: number;
    indentSize?: number;
    useTabs?: boolean;
}
```

The Options interface allows you to customize the behavior of the jsonToPhp function. Below are the available
properties:

* `beautify` (optional, boolean): When set to true, the PHP array is formatted with line breaks and indentation for
  readability. Default is false.
* `indentLevel` (optional, number): Specifies the initial indentation level for the PHP array. Default is 0.
* `indentSize` (optional, number): Specifies the number of spaces for indentation when beautify is set to true. Ignored
  when `useTabs` is `true` Default is 4.
* `useTabs` (optional, boolean): When set to true, tabs are used for indentation instead of spaces. Default is false.

## Usage

After installation, you can import and use `jsonToPhp` to convert JSON strings into PHP array format.

### Basic Conversion

The `jsonToPhp` function takes a JSON string and converts it to a PHP-style associative array.

```javascript
import {jsonToPhp} from '@timkit/json-to-php';

const jsonString = '{"name": "John", "age": 30}';

const phpArray = jsonToPhp(jsonString);
console.log(phpArray);
// ['name' => 'John', 'age' => 30]
```

### Nested JSON Conversion

The package supports nested JSON objects, converting them into nested PHP arrays.

```javascript
const nestedJson = '{"user": {"name": "Alice", "email": "alice@example.com"}, "active": true}';

console.log(jsonToPhp(nestedJson));
// ['user' => ['name' => 'Alice', 'email' => 'alice@example.com'], 'active' => true]
```

### Arrays in JSON

You can also convert JSON arrays into PHP arrays.

```javascript
const jsonArray = '{"fruits": ["apple", "banana", "cherry"]}';

console.log(jsonToPhp(jsonArray));
// ['fruits' => ['apple', 'banana', 'cherry']]
```

### Beautifying Output

You can beautify the output using the `beautify` option, which adds line breaks and indentation to make the PHP array
more readable.

```javascript
const jsonString = '{"name": "John", "address": {"city": "New York", "zip": "10001"}}';

console.log(jsonToPhp(jsonString, {beautify: true}));
// [
//     'name' => 'John',
//     'address' => [
//         'city' => 'New York',
//         'zip' => '10001'
//     ]
// ]
```

### Indentation Level

The `indentLevel` option allows you to specify the inital indentation level for the PHP array.

```javascript
console.log(jsonToPhp(jsonString, {beautify: true, indentLevel: 2}));
//        [
//            'name' => 'John',
//            'address' => [
//                'city' => 'New York',
//                'zip' => '10001'
//            ]
//        ]
```

You can adjust the indentation size:

```javascript
console.log(jsonToPhp(jsonString, {beautify: true, indentSize: 2}));
// [
//   'name' => 'John',
//   'address' => [
//     'city' => 'New York',
//     'zip' => '10001'
//   ]
// ]
```

### Using Tabs for Indentation

You can use tabs for indentation by setting the `useTabs` option to `true`.

```javascript
console.log(jsonToPhp(jsonString, {beautify: true, useTabs: true}));
// [
// 	'name' => 'John',
// 	'address' => [
// 		'city' => 'New York',
// 		'zip' => '10001'
// 	]
// ]
```

### Handling Different Data Types

The package supports different JSON data types including strings, numbers, booleans, and null values.

```javascript
const jsonWithTypes = '{"isAdmin": true, "balance": 100.5, "preferences": null}';

console.log(jsonToPhp(jsonWithTypes));
// ['isAdmin' => true, 'balance' => 100.5, 'preferences' => null]
```


## Edge Cases

### Empty JSON

If you provide an empty JSON string, the package will return an empty PHP array.

```javascript
console.log(jsonToPhp('{}'));
// []
```

### Invalid JSON

If the provided string is not valid JSON, it will throw an error.

```javascript
try {
    jsonToPhp('{invalid}');
} catch (error) {
    console.error('Invalid JSON format');
}
```

## License

Apache-2.0 