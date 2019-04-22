const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Secondary login';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'object'}
  );
  c.outPorts.add(
    'service_out',
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

    setTimeout(() => {
      console.log('Calling some service');
      if (input.username === 'good') {
        output.send({
          service_out: {
            loginComplete: true,
            message: 'Primay Login Success',
            hasSecondFac: false
          }
        });
      } else if (input.username === 'best') {
        output.send({
          service_out: {
            loginComplete: true,
            message: 'Awaiting Second Factor',
            hasSecondFac: true
          }
        });
      } else {
        output.send({
          service_out: {
            loginComplete: false,
            message: 'Primary Login Failure',
            hasSecondFac: false
          }
        });
      }
      output.done();
    }, 2000);
    output.done();
  });
  return c;
};
