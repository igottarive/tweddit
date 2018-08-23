var supertest = require('supertest');

describe('AppControllers', () => {
  describe('add-comment', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .post('/api/v1/add-comment')
      .send({ content: 'some content', user: 10000, post: 10000 })
      .expect(200, done);
    });
  });

  describe('list-comment', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .get('/api/v1/list-comment?post=10000')
      .expect(200, done);
    });
  });

  describe('get-friends', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .get('/api/v1/get-friends?user=10000')
      .expect(200, done);
    });
  });

  //Change this once getting tweets are working
  describe('add-post', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .post('/api/v1/add-post')
      .send({ title: 'post title', body: 'some cool stuff', url: 'sdfsdf', user: 100000 })
      .expect(200, done);
    });
  });

  describe('add-vote', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .post('/api/v1/add-vote')
      .send({ user: 1, post: 1, rating: -1 })
      .expect(200, done);
    });
  });

  describe('login', () => {
    it('should return 200', (done) => {
      supertest(sails.hooks.http.app)
      .put('/api/v1/entrance/login')
      .send({ emailAddress: 'justin@example.com', password: 'abc123' })
      .expect(200, done);
    });
  });
});
