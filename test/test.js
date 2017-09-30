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
    var args = "-f 1.23 -b=false -s foo"

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
        },
        "-s": {
          name: "stringValue"
        }
      }
    }, args);

    expect(parsedArgs).to.deep.equal({
      floatValue: 1.23,
      booleanValue: false,
      integerValue: 12,
      stringValue: "foo"
    })
  })

  it('validator', () => {

    var args = "192.168.a.1";

    expect(() => {
      var parseArgs = nargs.parse({
        index: [{
          name: "ip",
          validator: /^([0-9.]+)$/g,
          invalidMessage: "IP address not correct format (expted format: xxx.xxx.xxx.xxx)"
        }]
      }, args);
    }).to.throw(Error);
  })
})
