const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check input length';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'String'}
  );
  c.outPorts.add(
    'out',
    { datatype: 'int'}
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

    const inputLength = input.getData('in');
    output.send({
      out: inputLength.length
    });
    output.done();
  });
  return c;
};
