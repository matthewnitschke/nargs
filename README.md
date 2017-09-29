# nargs
a lightweight argument parser and validator for node js cli applications


# Usage
```javascript
var nargs = require('../src/nargs.js');

var args = nargs.parse({
  prefix: { // prefix based arguments
    "-f": {
      name: "foo",
      type: nargs.Integer,
      default: 12
    }
  },
  index: [{ // index based arguments
     name: "faa",
     type: nargs.String,
     validator: /([0-9.]+)/g,
     invalidMessage: "Invalid string format"
  }]
});


// { foo: 12, faa: '192.168.0.1'}

```
