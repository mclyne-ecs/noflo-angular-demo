const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check output is greater than 2';
  c.icon = 'cog';

  c.inPorts.add(
    'service_in',
    { datatype: 'object'}
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
    console.log(input.hasData('in'));
    console.log(input.hasData('service_in'));

    if (input.hasData('in')) {
      context.activate();
    }

    if (input.hasData('service_in')) {
      const serviceOutResult = input.getData('service_in');
      console.log('serviceOutResult: ', serviceOutResult);
      const testComponentValue = input.getData('in');
      console.log('testComponentValue: ', testComponentValue);
    }

    // This is a boolean to decide if we need second factor or not, or some other process
    /*const serviceOutResult = input.getData('service_in');
    console.log('serviceOutResult: ', serviceOutResult);
    const testComponentValue = input.getData('in');
    console.log('testComponentValue: ', testComponentValue);
    if (serviceOutResult) {
      output.send({
        sec_fac_true_out: testComponentValue
      });
    } else {
      output.send({
        out: testComponentValue
      });
    }
    output.done();*/
  });
  return c;
};
