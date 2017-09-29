function parseArgs(scheme){

  function isValid(arg, argScheme){
    if (argScheme.validator) {
      return argScheme.validator.test(arg.value ? arg.value : arg);
    } else {
      return true;
    }
  }

  var programArgs = process.argv.splice(2).join(" "); // remove uneeded args

  var prefixArgs = programArgs.match(/(-\w+)( |=)([\w.]+)/g) // find all prefix args
    .map((arg) => {
      var parsed = /(-\w+)( |=)([\w.]+)/g.exec(arg); // split each prefix arg into capture group parts
      return { // return desired parts of prefix arg
        prefix: parsed[1],
        value: parsed[3]
      }
    })

  var indexArgs = programArgs.replace(/(-\w+)( |=)([\w.]+)/g, "") // remove all prefix args
    .trim()
    .split(" ");


  var returnArgs = {};

  // process prefix args
  prefixArgs.forEach((arg, i) => {
    var schemeArg = scheme.prefix[arg.prefix];

    if (!arg && arg.defaultValue){
      arg = arg.defaultValue;
    }

    if (isValid(arg, schemeArg)) {
      returnArgs[schemeArg.name] = schemeArg.type ? schemeArg.type(arg.value) : arg.value;
    } else {
      throw Error(schemeArg.invalidMessage ? schemeArg.invalidMessage : `Argument ${schemeArg.name} is invalid`);
    }
  });


  // process index args
  // indexArgs.forEach((arg, i) => {
  //   var schemeArg = scheme.index[i];

  //   if (isValid(arg, schemeArg)) {
  //     returnArgs[schemeArg.name] = schemeArg.type ? schemeArg.type(arg) : arg;
  //   } else {
  //     throw Error(schemeArg.invalidMessage ? schemeArg.invalidMessage : `Argument ${schemeArg.name} is invalid`);
  //   }
  // })

  return returnArgs;
}




var args = parseArgs({
  prefix: {
    "-i": {
      name: "integerType",
      type: Integer,
      default: 12
    },
    "-b": {
      name: "booleanType",
      type: Boolean
    },
    "-f": {
      name: "floatType",
      type: Float
    }
  },
  // index: [{
  //   name: "sourceIp",
  //   type: String,
  //   validator: /([0-9.]+)/g
  // }]
});

console.log(args);
