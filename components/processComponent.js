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
    'out',
    { datatype: 'int'}
  );
  c.outPorts.add(
    'service_out',
    { datatype: 'boolean'}
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
        output.send({
          out: testComponentOutput,
          service_out: true
        });
      } else {
        output.send({
          out: testComponentOutput,
          service_out: false
        });
      }
      output.done();
    }, 3000);
  });
  return c;
};
