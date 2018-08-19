const assert = require('assert');

describe('PostController', () => {
  describe('post exists', () => {
    it('should have left the database with the expected number of hard-coded posts, including Post 1', async ()=>{
      var posts = await Post.find();
      assert(posts.length > 0, `posts.length > 0`);
      assert(_.find(posts, { title: 'Post 1' }), `_.find(posts, { title: 'Post 1' })`);
    });
  });
});
