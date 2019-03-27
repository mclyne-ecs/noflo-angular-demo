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
    'out',
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
    let result = '';
    // Check if the input string is greater than 5 characters
    if (inputStringLength > 5) {
      result = 'Success';
    } else {
      result = 'Failure';
    }
    output.send({
      out: result
    });
    output.done();
  });
  return c;
};
