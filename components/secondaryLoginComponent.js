const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Secondary login';
  c.icon = 'cog';

  c.inPorts.add(
    'secondary_in',
    { datatype: 'string'}
  );
  c.inPorts.add(
    'decision_in',
    { datatype: 'string'}
  );
  c.outPorts.add(
    'success',
    { datatype: 'string'}
  );
  c.outPorts.add(
    'failure',
    { datatype: 'string'}
  );
  c.outPorts.add(
      'error',
      { datatype: 'object'}
  );

  c.autoOrdering = false;

  // Variables to hold values from previous components
  let decisionResult;
  let secondaryLogin;
  c.process((input, output, context) => {
    if (input.hasData('decision_in')) {
      decisionResult = input.getData('decision_in');
      console.log('Decision Result: ' + decisionResult);
      context.activate();
    }

    if (input.hasData('secondary_in')) {
      secondaryLogin = input.getData('secondary_in');
      console.log('Secondary Login: ' + secondaryLogin);

      if (secondaryLogin === 'yes') {
        output.send({
          success: decisionResult + '. Second Factor Login Complete!'
        });
      } else {
        output.send({
          failure: 'Failure'
        });
      }
      output.done();
    }
  });

  c.tearDown = (callback) => {
    c.emit('end');
    c.started = false;
    callback();
  }

  return c;
};
