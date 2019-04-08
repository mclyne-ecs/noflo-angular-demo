const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check output is greater than 2';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'all'}
  );
  c.outPorts.add(
    'out',
    { datatype: 'int'}
  );
  c.outPorts.add(
      'error',
      { datatype: 'string'}
  );

  c.process((input, output) => {
    // If there is no data then return
    if(!input.hasData('in')) {
      return
    }

    const inputString = input.getData('in');
    if (inputString.length > 2) {
      output.send({
        out: inputString.length
      });
    } else {
      output.send({
        error: 'String length is less than 2. Please enter a string with length greater than 2'
      });
    }
    output.done();
  });
  return c;
};
