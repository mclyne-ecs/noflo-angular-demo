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

    const serviceResult = input.getData('in');
    if (serviceResult.loginComplete) {
      if (serviceResult.hasSecondFac) {
        output.send({
          second_fac: serviceResult.message
        });
      } else {
        output.send({
          out: serviceResult.message
        });
      }
    }
    output.done();
  });
  return c;
};
