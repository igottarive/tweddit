/**
 * add-comment
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Add comment',

  description: 'Add one comment to a post for a user.',

  inputs: {
    content: {
      description: 'The content of the comment',
      type: 'string',
      required: true,
    },
    user: {
      description: 'An id for a user.',
      type: 'number',
      required: true,
    },
    post: {
      description: 'A post to comment on.',
      type: 'number',
      required: true,
    },
  },

  exits: {

  },

  fn: async function (inputs, exits) {

    var newComment = await Comment.create({
      creator: inputs.user,
      content: inputs.content,
      post: inputs.post,
    }).fetch();

    return exits.success(newComment);
  }

};
