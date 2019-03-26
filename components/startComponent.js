const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.inPorts.add('start', { datatype: 'bang'});
  c.inPorts.add('stop', { datatype: 'bang'});
  c.inPorts.add('out', { datatype: 'all'});

  c.autoOrdering = false;

  const cleanup = () => {
    clearInterval(c.timer.interval);
    c.timer.deactivate();
    c.timer = null;
  }

  c.process((input, output, context) => {
    if (input.hasData('start')) {
      if (c.timer) {
        cleanup();
      }

      input.getData('start');
      c.timer = context;
      c.timer.interval = setInterval(() => {
        output.send({
          out: true
        });
      }, 100);
    }

    if (input.hasData('stop')) {
      input.getData('stop');
      if (!c.timer) {
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
