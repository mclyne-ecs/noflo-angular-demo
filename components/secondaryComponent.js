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

  c.autoOrdering = false;

  // Variables to hold values from previous components
  let primaryResult;
  let secondaryLogin;
  c.process((input, output, context) => {
    if (input.hasData('testcomp_in')) {
      primaryResult = input.getData('testcomp_in');
      console.log('Primary Result: ' + primaryResult);
      context.activate();
      // console.log(context);
    }

    if (input.hasData('secondary_in')) {
      secondaryLogin = input.getData('secondary_in');
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
    }


    /*if (input.hasData('testcomp_in') && input.hasData('secondary_in')) {
      secondaryLogin = input.getData('secondary_in');
      console.log('Secondary Login: ' + secondaryLogin);
      // Activate the context
      context.activate();

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
    }*/

    // const secondaryLogin = input.getData('in');
    // console.log('Primary Result: ' + primaryResult);
    // console.log('Secondary Login: ' + secondaryLogin);

    /*if (secondaryLogin === 'yes') {
      output.send({
        success: primaryResult
      });
    } else {
      output.send({
        failure: 'Failure'
      });
    }*/
    // output.done();
  });

  c.tearDown = (callback) => {
    c.emit('end');
    c.started = false;
    callback();
  }

  return c;
};
