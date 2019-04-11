const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check output is greater than 2';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'all'}
  );
  c.inPorts.add(
    'service_in',
    { datatype: 'all'}
  );
  c.outPorts.add(
    'out',
    { datatype: 'int'}
  );
  c.outPorts.add(
    'sec_fac_true_out',
    { datatype: 'int'}
  );
  c.outPorts.add(
      'error',
      { datatype: 'string'}
  );

  c.process((input, output) => {
    // If there is no data then return
    if(!input.hasData('in') && !input.hasData('service_in')) {
      return
    }

    // This is a boolean to decide if we need second factor or not, or some other process
    const serviceOutResult = input.getData('service_in');
    const testComponentValue = input.getData('in');
    if (serviceOutResult) {
      output.send({
        sec_fac_true_out: testComponentValue
      });
    } else {
      output.send({
        out: testComponentValue
      });
    }
    output.done();
  });
  return c;
};
