/**
 * list-comment
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {

  friendlyName: 'List comment',

  description: 'List comments for a post.',

  inputs: {
    post: {
      description: 'A post to comment on.',
      type: 'number',
      required: true,
    },
  },

  exits: {

  },

  fn: async function (inputs, exits) {

    var comments = await Comment.find({
      where: { post: inputs.post },
      sort: 'createdAt DESC'
    }).populate('creator');

    return exits.success(comments);
  }

};
