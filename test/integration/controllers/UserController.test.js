var supertest = require('supertest');

describe('UserController', () => {
  describe('login', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .put('/api/v1/entrance/login')
      .send({ emailAddress: 'justin@example.com', password: 'abc123' })
      .expect(200, done);
    });
  });
});
