module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
    //Get last 5 posts
    let posts = await Post.find({where: {creator: this.req.me.id}, limit: 5}).populateAll();

    return exits.success({posts: posts});
  }


};
