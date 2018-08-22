/**
 * Post.js
 *
 * A piece of content that a user creates based on a tweet url
 */
var moment = require('moment');
module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    title: {
      type: 'string',
      required: true,
      description: 'The title of the tweet',
    },

    body: {
      type: 'string',
      required: true,
      description: 'The body of the tweet',
    },

    url: {
      type: 'string',
      required: true,
      description: 'Url for the tweet',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    // Add a reference to User
    creator: {
      model: 'user',
    },

    // Add a reference to Vote
    votes: {
      collection: 'vote',
      via: 'post',
    },

    // Add a reference to Comment
    comments: {
      collection: 'comment',
      via: 'post'
    },
  },
  customToJSON: function() {
    this.fromNow = moment(this.createdAt).fromNow();
    return this;
  }

};
