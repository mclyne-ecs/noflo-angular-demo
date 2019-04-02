const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'length check print';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'int'}
  );
  c.outPorts.add(
    'lessthan',
    { datatype: 'string'}
  );
  c.outPorts.add(
    'greaterthan',
    { datatype: 'string'}
  );
  c.outPorts.add(
    'equal',
    { datatype: 'string'}
  );
  c.outPorts.add(
      'error',
      { datatype: 'object'}
  );

  c.process((input, output) => {
    // If there is no data then return
    if(!input.hasData('in')) {
      return
    }

    const inputStringLength = input.getData('in');
    console.log(inputStringLength)
    console.log(typeof inputStringLength)
    // Check if the input string is greater than 5 characters
    if (inputStringLength < 5) {
      output.send({
        lessthan: 'I am less than 5!'
      });
    } else if (inputStringLength > 5) {
      output.send({
        greaterthan: 'I am greater than 5!'
      });
    } else {
      output.send({
        equal: 'I am equal to 5!'
      });
    }
    /*output.send({
      out: result
    });*/
    output.done();
  });
  return c;
};
