const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Page B';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'string'}
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
    console.log(input.getData('in'));
    output.send({
      out: 'I am page B!'
    });
    output.done();
  });
  return c;
};
