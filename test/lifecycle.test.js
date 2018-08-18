var sails = require('sails');

before((done) => {
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, (err) => {
    if (err) { return done(err); }
    return done();
  });
});

after((done) => {
  sails.lower(done);
});
