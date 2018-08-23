var url = require('url');
var moment = require('moment');
module.exports = {

  sync: true,

  friendlyName: 'Post data',

  description: 'Add fromNow and tweetId',

  inputs: {
    post: {
      description: 'A post to modify.',
      type: 'ref',
      required: true,
    },
  },

  exits: {

  },

  fn: function (inputs, exits) {
    let modifiedPost = inputs.post;

    //Use from Now text from moment
    modifiedPost.fromNow = moment(modifiedPost.createdAt).fromNow();

    //Get the twitter statusId from the url
    var postUrl = new url.parse(modifiedPost.url);
    var parts = postUrl.pathname.split('/').pop();
    modifiedPost.tweetId = parts;

    return exits.success(modifiedPost);
  }

};
