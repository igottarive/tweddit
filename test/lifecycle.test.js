var sails = require('sails');

//Silly hack for deprecated _.contains => renamed to _.includes
var _ = require('lodash');
_.contains = _.includes;

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
