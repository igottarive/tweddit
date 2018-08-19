const assert = require('assert');

describe('VoteController', () => {
  describe('vote exists', () => {
    it('should have left the database with the expected number of hard-coded votes', async ()=>{
      var votes = await Vote.find();
      assert(votes.length > 0, `votes.length > 0`);
      assert(_.find(votes, { rating: -1 }), `_.find(votes, { title: 'Vote 1' })`);
    });
  });
});
