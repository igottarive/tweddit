/**
 * get-friends
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Get friends',

  description: 'Get friends and frenemies',

  inputs: {
    user: {
      description: 'An id for a user.',
      type: 'number',
      required: true,
    },
  },

  exits: {

  },

  fn: async function (inputs, exits) {

    let frenemies = {};
    let friends = {};
    await Post.stream({creator: inputs.user}).populate('votes')
      .eachRecord(async (post, next)=>{
        //Check all of the votes to see which users have liked or disliked the posts
        //and put them in an object for reference
        post.votes.map((vote) => {
          //Deal with frenemies
          if(vote.creator && vote.rating === -1) {
            frenemies[vote.creator] = frenemies[vote.creator] || 0;
            frenemies[vote.creator] += vote.rating;
          }

          //Deal with friends
          if(vote.creator && vote.rating === 1) {
            friends[vote.creator] = friends[vote.creator] || 0;
            friends[vote.creator] += vote.rating;
          }
        });
        return next();
      });

    //Get one set of ids to pull from the db
    let ids = [...new Set([...Object.keys(frenemies) ,...Object.keys(friends)])];
    var flist = await User.find({where: {id : ids}, select: ['fullName']});

    //create a list with the user's name and thier ratings
    let frenemiesList = Object.keys(frenemies).map(f => {
      let user = flist.find(fr => { return fr.id === Number(f); });
      return {fullName: user.fullName, id: f, ratings: frenemies[f]};
    });
    let friendsList = Object.keys(friends).map(f => {
      let user = flist.find(fr => { return fr.id === Number(f); });
      return {fullName: user.fullName, id: f, ratings: friends[f]};
    });

    return exits.success({friends: friendsList, frenemies: frenemiesList});

  }

};
