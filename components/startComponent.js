const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.inPorts.add('start', { datatype: 'bang'});
  c.inPorts.add('stop', { datatype: 'bang'});
  c.outPorts.add('out', { datatype: 'string'});

  c.autoOrdering = false;

  const cleanup = () => {
    clearInterval(c.timer.interval);
    c.timer.deactivate();
    c.timer = null;
  }

  let finalOutput = '';
  c.process((input, output, context) => {
    if (input.hasData('start')) {
      if (c.timer) {
        cleanup();
      }

      const primaryInput = input.getData('start');
      c.timer = context;
      c.timer.interval = setInterval(() => {
        output.send({
          out: input
        });
      }, 100);
    }

    if (input.hasData('stop')) {
      const secondaryInput = input.getData('stop');
      if (!c.timer) {
        output.send({
          out: finalOutput + primaryInput + secondaryInput
        });
        output.done();
        return;
      }
      cleanup();
      output.done();
    }
  });

  c.tearDown = (callback) => {
    if (c.timer) {
      cleanup();
    }
    c.emit('end');
    c.started = false;
    callback();
  }

  return c;
}
