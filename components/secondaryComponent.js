const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check input length';
  c.icon = 'cog';

  c.inPorts.add(
    'in',
    { datatype: 'boolean'}
  );
  c.inPorts.add(
    'testcomp_in',
    { datatype: 'int'}
  );
  c.outPorts.add(
    'success',
    { datatype: 'int'}
  );
  c.outPorts.add(
    'failure',
    { datatype: 'string'}
  );
  c.outPorts.add(
      'error',
      { datatype: 'object'}
  );

  c.process((input, output) => {
    // If there is no data from the primary login, then return
    if(!input.hasData('testcomp_in') && !input.hasData('in')) {
      return;
    }

    const secondaryLogin = input.getData('in');
    const testComponentValue = input.getData('testcomp_in');
    console.log('Secondary Login: ' + secondaryLogin);
    console.log('Test component Value: ' + testComponentValue);

    if (secondaryLogin === 'yes') {
      output.send({
        success: testComponentValue
      });
    } else {
      output.send({
        failure: 'Failure'
      });
    }
    output.done();
  });
  return c;
};
