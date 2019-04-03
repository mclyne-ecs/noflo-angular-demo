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
      'error',
      { datatype: 'object'}
  );

  c.process((input, output) => {
    // If there is no data then return
    if(!input.hasData('in')) {
      return
    }

    const testComponentOutput = input.getData('in');
    console.log('From the process component, the testComponent output: ' + testComponentOutput);
    setTimeout(() => {
      console.log('Calling some service');
      output.send({
        out: testComponentOutput
      });
      output.done();
    }, 3000);
  });
  return c;
};
