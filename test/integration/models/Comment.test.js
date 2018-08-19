const assert = require('assert');

describe('CommentController', () => {
  describe('comment exists', () => {
    it('should have left the database with the expected number of hard-coded comments, including Comment 1', async ()=>{
      var comments = await Comment.find();
      assert(comments.length > 0, `comments.length > 0`);
      assert(_.find(comments, { content: 'Comment 1' }), `_.find(comments, { title: 'Comment 1' })`);
    });
  });
});
