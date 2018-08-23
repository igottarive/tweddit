var url = require('url');
var moment = require('moment');
module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect:'/welcome'};
    }
    //Get last 5 posts
    let posts = await Post.find({limit:5}).populateAll();
    _.each(posts, (post)=> {
      //Use from Now text from moment
      post.fromNow = moment(post.createdAt).fromNow();

      //Get the twitter statusId from the url
      var postUrl = new url.parse(post.url);
      var parts = postUrl.pathname.split('/').pop();
      post.tweetId = parts;
    });

    return exits.success({posts: posts});

  }


};
