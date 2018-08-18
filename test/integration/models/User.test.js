//var supertest = require('supertest');
const assert = require('assert');

describe('UserController', () => {
  describe('user exists', () => {
    it('should have left the database with the expected number of hard-coded users, including Justin Pruskowski', async ()=>{
      var users = await User.find();
      assert(users.length > 0, `users.length > 0`);
      assert(users.length === 1, `users.length === 1`);
      assert(_.find(users, { fullName: 'Justin Pruskowski' }), `_.find(users, { fullName: 'Justin Pruskowski' })`);
    });
  });
});
