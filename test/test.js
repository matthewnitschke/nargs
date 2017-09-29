var nargs = require("../src/nargs.js");
var expect = require("chai").expect;


describe('Narg Argument Validator', () =>{

  it('index args', () => {
    var args = "1234 asdf"

    var parsedArgs = nargs.parse({
      index: [{
        name: "numbers",
        type: nargs.Integer
      },
      {
        name: "letters"
      }]
    }, args);

    expect(parsedArgs).to.deep.equal({
      numbers: 1234,
      letters: "asdf"
    })
  });

  it('prefix args', () => {
    var args = "-f 1.23 -b=false"

    var parsedArgs = nargs.parse({
      prefix: {
        "-f": {
          name: "floatValue",
          type: nargs.Float,
        },
        "-b": {
          name: "booleanValue",
          type: nargs.Boolean
        },
        "-i": {
          name: "integerValue",
          type: nargs.Integer,
          default: 12
        }
      }
    }, args)

    expect(parsedArgs).to.deep.equal({
      floatValue: 1.23,
      booleanValue: false,
      integerValue: 12
    })
  })

})






// var args = parseArgs({
//   prefix: {
//     "-i": {
//       name: "integerType",
//       type: Integer,
//       default: 12
//     },
//     "-b": {
//       name: "booleanType",
//       type: Boolean
//     },
//     "-f": {
//       name: "floatType",
//       type: Float
//     }
//   },
//   // index: [{
//   //   name: "sourceIp",
//   //   type: String,
//   //   validator: /([0-9.]+)/g
//   // }]
// });
