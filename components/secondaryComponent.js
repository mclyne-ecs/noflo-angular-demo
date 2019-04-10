const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'check input length';
  c.icon = 'cog';

  c.inPorts.add(
    'secondary_in',
    { datatype: 'string'}
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

  // Variables to hold values from previous components
  let primaryResult;
  c.process((input, output) => {
    if(input.hasData('testcomp_in')) {
      primaryResult = input.getData('testcomp_in');
    }

    const secondaryLogin = input.getData('in');
    console.log('Primary Result: ' + primaryResult);
    console.log('Secondary Login: ' + secondaryLogin);

    if (secondaryLogin === 'yes') {
      output.send({
        success: primaryResult
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
