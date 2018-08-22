/**
 * add-vote
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Add vote',

  description: 'Add one vote.',

  inputs: {

    user: {
      description: 'A users id.',
      type: 'number',
      required: false,
    },
    post: {
      description: 'A post to rate.',
      type: 'number',
      required: true,
    },
    rating: {
      description: 'A rating for the post.',
      type: 'number',
      required: true,
    },

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    var newVote = await Vote.create({
      user: inputs.user,
      post: inputs.post,
      rating: inputs.rating,
    }).fetch();

    return exits.success(newVote);
  }


};
