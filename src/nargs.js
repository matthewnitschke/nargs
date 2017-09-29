module.exports = (() => {
  this.parse = (scheme, argv) => {
    function isValid(arg, argScheme) {
      if (argScheme.validator) {
        return argScheme.validator.test(arg.value ? arg.value : arg);
      } else {
        return true;
      }
    }

    var programArgs;
    if (argv){
      if (typeof argv === 'string'){
        programArgs = argv
      } else {
        programArgs = argv.join(" ");
      }
    } else {
      programArgs = process.argv.splice(2).join(" "); // remove uneeded args
    }

    var returnArgs = {};

    if (scheme.prefix){
      var prefixArgs = programArgs.match(/(-\w+)( |=)([\w.]+)/g) // find all prefix args
        .map((arg) => {
          var parsed = /(-\w+)( |=)([\w.]+)/g.exec(arg); // split each prefix arg into capture group parts
          return { // return desired parts of prefix arg
            prefix: parsed[1],
            value: parsed[3]
          }
        });

        // process prefix args
        prefixArgs.forEach((arg, i) => {
          var schemeArg = scheme.prefix[arg.prefix];

          if (!arg && arg.defaultValue) {
            arg = arg.defaultValue;
          }

          if (isValid(arg, schemeArg)) {
            returnArgs[schemeArg.name] = schemeArg.type ? schemeArg.type(arg.value) : arg.value;
          } else {
            throw Error(schemeArg.invalidMessage ? schemeArg.invalidMessage : `Argument ${schemeArg.name} is invalid`);
          }
        });
    }

    if (scheme.index){
      var indexArgs = programArgs.replace(/(-\w+)( |=)([\w.]+)/g, "") // remove all prefix args
        .trim()
        .split(" ");

      // process index args
      indexArgs.forEach((arg, i) => {
        var schemeArg = scheme.index[i];

        if (isValid(arg, schemeArg)) {
          returnArgs[schemeArg.name] = schemeArg.type ? schemeArg.type(arg) : arg;
        } else {
          throw Error(schemeArg.invalidMessage ? schemeArg.invalidMessage : `Argument ${schemeArg.name} is invalid`);
        }
      })
    }



    return returnArgs;
  }

  this.Boolean = (inp) => {
    inp = inp.trim().toLowerCase();
    if (inp === "true") {
      return true;
    } else if (inp === "false") {
      return false;
    } else {
      throw Error("Boolean type not casted");
    }
  }

  this.String = (inp) => {
    return inp.trim();
  }

  this.Integer = (inp) => {
    if (!isNaN(inp)) {
      return parseInt(inp);
    } else {
      throw Error("Integer type not casted");
    }
  }

  this.Float = (inp) => {
    if (!isNaN(inp)) {
      return parseFloat(inp);
    } else {
      throw Error("Float type not casted");
    }
  }

  return this;

})();
