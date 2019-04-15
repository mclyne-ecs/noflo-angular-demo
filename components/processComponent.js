const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check input length';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'all'}
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

    const testComponentOutput = input.getData('in');
    setTimeout(() => {
      console.log('Calling some service');
      if (testComponentOutput > 2) {
        console.log('string is greater than two');
        output.send({
          service_out: {
            inputLength: testComponentOutput,
            hasSecondFac: true
          }
        });
      } else {
        console.log('string is less than two');
        output.send({
          service_out: {
            inputLength: testComponentOutput,
            hasSecondFac: false
          }
        });
      }
      output.done();
    }, 2000);
  });
  return c;
};
