/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return done();
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return done();
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  var createdUsers = await User.createEach([
    { emailAddress: 'justin@example.com', fullName: 'Justin Pruskowski', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
    { emailAddress: 'justin2@example.com', fullName: 'Justin2 Pruskowski', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc123') },
    { emailAddress: 'justin3@example.com', fullName: 'Justin3 Pruskowski', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc123') },
  ]).fetch();


  var createdPosts = await Post.createEach([
    { title: 'Post 1', body: 'A Cool POST', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 2', body: 'A Cool POST2', url: 'http://yahoo.com', creator: createdUsers[1].id},
    { title: 'Post 3', body: 'A Cool POST3', url: 'http://yahoo.com', creator: createdUsers[2].id},
    { title: 'Post 4', body: 'A Cool POST4', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 5', body: 'A Cool POST5', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 6', body: 'A Cool POST6', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 7', body: 'A Cool POST7', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 8', body: 'A Cool POST8', url: 'http://yahoo.com', creator: createdUsers[0].id},
    { title: 'Post 9', body: 'A Cool POST9', url: 'http://yahoo.com', creator: createdUsers[0].id},
  ]).fetch();

  await Comment.createEach([
    { content: 'Comment 1', post: createdPosts[0].id, creator: createdUsers[0].id},
    { content: 'Comment 2', post: createdPosts[0].id, creator: createdUsers[1].id},
    { content: 'Comment 3', post: createdPosts[0].id, creator: createdUsers[2].id},
    { content: 'Comment 4', post: createdPosts[1].id, creator: createdUsers[0].id},
    { content: 'Comment 5', post: createdPosts[1].id, creator: createdUsers[1].id},
    { content: 'Comment 6', post: createdPosts[1].id, creator: createdUsers[2].id},
    { content: 'Comment 7', post: createdPosts[2].id, creator: createdUsers[0].id},
    { content: 'Comment 8', post: createdPosts[2].id, creator: createdUsers[1].id},
    { content: 'Comment 9', post: createdPosts[2].id, creator: createdUsers[2].id},
  ]).fetch();

  await Vote.createEach([
    { rating: 0, post: createdPosts[0].id, creator: createdUsers[2].id},
    { rating: 1, post: createdPosts[0].id, creator: createdUsers[0].id},
    { rating: -1, post: createdPosts[0].id, creator: createdUsers[1].id},
    { rating: 1, post: createdPosts[1].id, creator: createdUsers[1].id},
    { rating: -1, post: createdPosts[1].id, creator: createdUsers[2].id},
    { rating: 0, post: createdPosts[1].id, creator: createdUsers[0].id},
    { rating: 1, post: createdPosts[2].id, creator: createdUsers[0].id},
    { rating: -1, post: createdPosts[2].id, creator: createdUsers[2].id},
    { rating: 0, post: createdPosts[2].id, creator: createdUsers[2].id},
  ]).fetch();

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
