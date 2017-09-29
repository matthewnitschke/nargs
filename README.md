# nargs
a lightweight argument parser and validator for node js cli applications


# Usage
```javascript


var args = parseArgs({
  prefix: { // prefix based arguments
    "-f": {
      name: "foo",
      type: Integer,
      default: 12
    }
  },
  index: [{ // index based arguments
     name: "faa",
     type: String,
     validator: /([0-9.]+)/g,
     invalidMessage: "Invalid string format"
  }]
});

```
