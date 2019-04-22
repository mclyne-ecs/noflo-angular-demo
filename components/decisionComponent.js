const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Primary login';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'object'}
  );
  c.outPorts.add(
    'out',
    { datatype: 'object'}
  );
  c.outPorts.add(
    'second_fac',
    { datatype: 'object'}
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

    const input = input.getData('in');
    if (input.loginComplete) {
      if (input.hasSecondFac) {
        output.send({
          second_fac: input.message
        });
      } else {
        output.send({
          out: input.message
        });
      }
    }
    output.done();
  });
  return c;
};
