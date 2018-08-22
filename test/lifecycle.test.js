var sails = require('sails');
var vue = require('vue');
var parasails = require('parasails');

before((done) => {
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, (err) => {
    if (err) { return done(err); }
    vue = vue || {};
    parasails = parasails || {};
    return done();
  });
});

after((done) => {
  sails.lower(done);
});
