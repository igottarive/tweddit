/**
 * add-post
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Add post',

  description: 'Add one post.',

  inputs: {

    title: {
      description: 'The title of the post',
      type: 'string',
      required: true,
    },
    url: {
      description: 'A url to a tweet.',
      type: 'string',
      required: true,
    },
    user: {
      description: 'An id for a user.',
      type: 'number',
      required: false,
    },

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    var newPost = await Post.create({
      creator: inputs.user,
      title: inputs.title,
      url: inputs.url,
      body: inputs.body,
    }).fetch();

    return exits.success(newPost);

  }


};
