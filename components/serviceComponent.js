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
    'out',
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

    const loginData = input.getData('in');
    console.log('loginData from service: ', loginData);

    setTimeout(() => {
      console.log('Calling some service');
      if (loginData === 'good') {
        output.send({
          out: {
            loginComplete: true,
            message: 'Primay Login Success',
            hasSecondFac: false
          }
        });
      } else if (loginData === 'best') {
        output.send({
          out: {
            loginComplete: true,
            message: 'Awaiting Second Factor',
            hasSecondFac: true
          }
        });
      } else {
        output.send({
          out: {
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
